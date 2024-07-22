/**
 * Cache results of a function to optimize repeated calls with the same arguments.
 *
 * @param func - The function to be cached.
 */
export function cache<F extends (...args: Parameters<F>) => R, R>(func: F): F {
    const cache = new Map<string, R>();

    return function (...args: Parameters<F>): R {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key)!;
        }

        const result = func(...args);
        cache.set(key, result);

        return result;
    } as F;
}
