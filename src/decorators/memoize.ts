import { cache } from '../functions/utils';

export function memoize() {
    return function <T, A extends [], R>(
        target: (this: T, ...args: A) => R,
        _context: ClassMethodDecoratorContext<T, (this: T, ...args: A) => R>
    ) {
        return cache(target);
    };
}
