import { coerceBooleanProperty, coerceCssPixelValue } from '@angular/cdk/coercion';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

function propDecoratorFactory<T, D>(name: string, fb: (v: T) => D): PropertyDecorator {
  return (target, propName) => {
    const privatePropName = `$$__${propName as string}`;

    if (Object.prototype.hasOwnProperty.call(target, privatePropName)) {
      console.warn(`The prop "${privatePropName}" is already exist, it will be overrided by ${name} decorator.`);
    }

    Object.defineProperty(target, privatePropName, {
      configurable: true,
      writable: true
    });

    Object.defineProperty(target, propName, {
      get(): string {
        return this[privatePropName];
      },
      set(value: T): void {
        const v = fb(value);
        if (typeof v === 'undefined') {
          return;
        }
        this[privatePropName] = fb(value);
      }
    });
  };
}

export function InputBoolean(): PropertyDecorator {
  return propDecoratorFactory<any, boolean>('InputBoolean', coerceBooleanProperty);
}

export function InputPx(): PropertyDecorator {
  return propDecoratorFactory<string | number, string>('InputPx', coerceCssPixelValue);
}

export function MethodLog(printFunc?: typeof console.log): MethodDecorator {
  return (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
    if (descriptor) {
      return {
        configurable: true,
        enumerable: false,
        get() {
          Object.defineProperty(this, propertyKey, {
            enumerable: false,
            writable: true,
            configurable: true,
            value: (...args: any[]) => {
              const printer = () => {
                console.log(`%c function: ${propertyKey as string}`, `color:#fff;background:#f44336`);
              };

              const r = descriptor.value.apply(this, args);
              if (r instanceof Promise) {
                return r.then(() => {
                  printer();
                });
              } else if (r instanceof Observable) {
                return r.pipe(
                  tap(() => {
                    printer();
                  })
                );
              }
              printer();
              return r;
            }
          });
          return this[propertyKey];
        },
        set: value => {
          console.error("method for [MethodLog] decorator can't set");
        }
      };
    }

    throw new Error('[MethodLog] decorator only decorate method');
  };
}
