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

export function MethodLog(print?: (message?: any, ...optionalParams: any[]) => void): MethodDecorator {
  return (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
    const v = descriptor.value;

    descriptor.value = (...args: any[]) => {
      const k = typeof propertyKey === 'string' ? propertyKey : propertyKey.toString();

      const handle = () => {
        if (print) {
          print(k);
        } else {
          console.log(`%c function: ${k}`, `color:#fff;background:#f44336`);
        }
      };

      console.log(target);
      const r = v.apply(target, args);
      if (r instanceof Promise) {
        return r.then(() => {
          handle();
        });
      } else if (r instanceof Observable) {
        return r.pipe(
          tap(() => {
            handle();
          })
        );
      } else {
        handle();
      }
    };
  };
}
export const InputSelf = makePropDecorator('Input', (bindingPropertyName?: string) => ({
  bindingPropertyName
}));

export const PROP_METADATA = '__prop__metadata__';

export function makePropDecorator(
  name: string,
  props?: (...args: any[]) => any,
  parentClass?: any,
  additionalProcessing?: (target: any, name: string, ...args: any[]) => void
): any {
  const metaCtor = makeMetadataCtor(props);

  function PropDecoratorFactory(this: unknown | typeof PropDecoratorFactory, ...args: any[]): any {
    if (this instanceof PropDecoratorFactory) {
      metaCtor.apply(this, args);
      return this;
    }

    const decoratorInstance = new (<any>PropDecoratorFactory)(...args);

    function PropDecorator(target: any, name: string) {
      const constructor = target.constructor;
      // Use of Object.defineProperty is important since it creates non-enumerable property which
      // prevents the property is copied during subclassing.
      const meta = constructor.hasOwnProperty(PROP_METADATA)
        ? (constructor as any)[PROP_METADATA]
        : Object.defineProperty(constructor, PROP_METADATA, { value: {} })[PROP_METADATA];
      meta[name] = (meta.hasOwnProperty(name) && meta[name]) || [];
      meta[name].unshift(decoratorInstance);

      if (additionalProcessing) additionalProcessing(target, name, ...args);
    }

    return PropDecorator;
  }

  if (parentClass) {
    PropDecoratorFactory.prototype = Object.create(parentClass.prototype);
  }

  PropDecoratorFactory.prototype.ngMetadataName = name;
  (<any>PropDecoratorFactory).annotationCls = PropDecoratorFactory;
  return PropDecoratorFactory;
}

function makeMetadataCtor(props?: (...args: any[]) => any): any {
  return function ctor(this: any, ...args: any[]) {
    if (props) {
      const values = props(...args);
      for (const propName in values) {
        this[propName] = values[propName];
      }
    }
  };
}
