import { cache } from '../functions/utils';

type MethodDecorator = <T, A extends [], R>(
    target: (this: T, ...args: A) => R,
    _context: ClassMethodDecoratorContext<T, (this: T, ...args: A) => R>
) => (this: T, ...args: A) => R;

export function memoize<T, A extends [], R>(
    target: (this: T, ...args: A) => R,
    _context: ClassMethodDecoratorContext<T, (this: T, ...args: A) => R>
): (this: T, ...args: A) => R;

export function memoize(): MethodDecorator;

export function memoize<T, A extends [], R>(
    target?: (this: T, ...args: A) => R,
    _context?: ClassMethodDecoratorContext<T, (this: T, ...args: A) => R>
): MethodDecorator | ((this: T, ...args: A) => R) {
    if (target) {
        return cache(target);
    } else {
        return function <T, A extends [], R>(
            target: (this: T, ...args: A) => R,
            _context: ClassMethodDecoratorContext<T, (this: T, ...args: A) => R>
        ) {
            return cache(target);
        };
    }
}
