import { coerceBooleanProperty, coerceCssPixelValue } from '@angular/cdk/coercion';

function propDecoratorFactory<T, D>(name: string, fb: (v: T) => D): PropertyDecorator {
  return (target, propertyKey) => {
    const _propertyKey = `$$__${typeof propertyKey === 'string' ? propertyKey : propertyKey.toString()}`;

    if (Object.prototype.hasOwnProperty.call(target, _propertyKey)) {
      console.warn(`The prop "${_propertyKey}" is already exist, it will be overrided by ${name} decorator.`);
    }

    Object.defineProperty(target, _propertyKey, {
      configurable: true,
      writable: true
    });

    Object.defineProperty(target, propertyKey, {
      get(): string {
        return this[_propertyKey];
      },
      set(value: T): void {
        const v = fb(value);
        if (typeof v === 'undefined') {
          return;
        }
        this[_propertyKey] = fb(value);
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
