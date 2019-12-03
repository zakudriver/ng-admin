import { coerceBooleanProperty, coerceCssPixelValue } from '@angular/cdk/coercion';

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
