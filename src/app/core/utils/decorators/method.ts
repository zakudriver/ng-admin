import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export type MethodDecoratorFunc = (
  target: Object,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<any>
) => void;

function methodDecoratorFactory(funcBefore?: MethodDecoratorFunc, funcAfter?: MethodDecoratorFunc): MethodDecorator {
  return (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
    if (descriptor) {
      return {
        configurable: true,
        enumerable: false,
        get() {
          Object.defineProperty(this, propertyKey, {
            enumerable: false,
            writable: false,
            configurable: false,
            value: (...args: any[]) => {
              if (funcBefore) {
                funcBefore(target, propertyKey, descriptor);
              }
              const r = descriptor.value.apply(this, args);
              if (funcAfter) {
                if (r instanceof Promise) {
                  return r.then(() => {
                    funcAfter(target, propertyKey, descriptor);
                  });
                } else if (r instanceof Observable) {
                  return r.pipe(
                    tap(() => {
                      funcAfter(target, propertyKey, descriptor);
                    })
                  );
                }

                funcAfter(target, propertyKey, descriptor);
              }

              return r;
            }
          });
          return this[propertyKey];
        },
        set: value => {
          console.error(`method for [MethodLog] decorator can't set`);
        }
      };
    }

    throw new Error('[MethodLog] decorator only decorate method');
  };
}

export function MethodBefore(func: MethodDecoratorFunc): MethodDecorator {
  return methodDecoratorFactory(func, undefined);
}

export function MethodAfter(func: MethodDecoratorFunc): MethodDecorator {
  return methodDecoratorFactory(undefined, func);
}
