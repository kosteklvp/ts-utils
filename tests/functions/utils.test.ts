import { cache } from '../../src/functions/utils';

describe('cache()', () => {
    test('Passed function is called only once', () => {
        const func = jest.fn();
        const cachedFunc = cache(func);

        cachedFunc();
        cachedFunc();
        cachedFunc();

        expect(func).toHaveBeenCalledTimes(1);
    });

    test('Passed function is called only once', () => {
        const func = jest.fn();
        const cachedFunc = cache(func);

        expect(func).toHaveBeenCalledTimes(0);

        cachedFunc();
        expect(func).toHaveBeenCalledTimes(1);

        cachedFunc();
        expect(func).toHaveBeenCalledTimes(1);

        cachedFunc();
        expect(func).toHaveBeenCalledTimes(1);
    });

    test('Passed function is called only once for different arguments', () => {
        const func = jest.fn();
        const cachedFunc = cache(func);

        cachedFunc(2);
        cachedFunc(3);
        cachedFunc(4);

        expect(func).toHaveBeenCalledTimes(3);

        cachedFunc(2);
        cachedFunc(3);
        cachedFunc(4);

        expect(func).toHaveBeenCalledTimes(3);

        cachedFunc(1);

        expect(func).toHaveBeenCalledTimes(4);

        cachedFunc(1);
        cachedFunc(2);
        cachedFunc(3);
        cachedFunc(4);

        expect(func).toHaveBeenCalledTimes(4);
    });

    test('Works for functions with multiple arguments', () => {
        const func = jest.fn((x: number, y: number) => x + y);
        const cachedFunc = cache(func);

        cachedFunc(1, 2);
        expect(cachedFunc(1, 2)).toBe(3);
        expect(cachedFunc(2, 3)).toBe(5);

        expect(func).toHaveBeenCalledTimes(2);
    });

    test("Works with 'async' functions", async () => {
        const func = jest.fn(async (x: number) => {
            return new Promise<number>(resolve => setTimeout(() => resolve(x * 2), 100));
        });
        const cachedFunc = cache(func);

        // Call the cached function with the same argument multiple times
        const result1 = await cachedFunc(2);
        const result2 = await cachedFunc(2);
        const result3 = await cachedFunc(3);

        // Ensure the results are as expected
        expect(result1).toBe(4);
        expect(result2).toBe(4);
        expect(result3).toBe(6);

        // Ensure the original function is called once for each unique argument
        expect(func).toHaveBeenCalledTimes(2);
    });

    test('does not caches results of functions with different arguments', () => {
        const func = jest.fn((x: number, y: number) => x * y);
        const cachedFunc = cache(func);

        // Call the cached function with different arguments
        expect(cachedFunc(2, 3)).toBe(6);
        expect(cachedFunc(3, 4)).toBe(12);
        expect(cachedFunc(2, 3)).toBe(6);
        expect(cachedFunc(3, 4)).toBe(12);

        // Ensure the original function is called once for each unique set of arguments
        expect(func).toHaveBeenCalledTimes(2);
    });

    test('works with functions returning objects', () => {
        const func = jest.fn((x: number) => ({ value: x }));
        const cachedFunc = cache(func);

        const result1 = cachedFunc(2);
        const result2 = cachedFunc(2);
        const result3 = cachedFunc(3);

        // Ensure the results are as expected
        expect(result1).toEqual({ value: 2 });
        expect(result2).toEqual({ value: 2 });
        expect(result3).toEqual({ value: 3 });

        // Ensure the original function is called once for each unique argument
        expect(func).toHaveBeenCalledTimes(2);
    });

    test('should work with async functions', async () => {
        const func = jest.fn(async (x: number) => {
            return new Promise<number>(resolve => setTimeout(() => resolve(x * 2), 100));
        });
        const cachedFunc = cache(func);

        // Call the cached function with the same argument multiple times
        const result1 = await cachedFunc(2);
        const result2 = await cachedFunc(2);
        const result3 = await cachedFunc(3);

        // Ensure the results are as expected
        expect(result1).toBe(4);
        expect(result2).toBe(4);
        expect(result3).toBe(6);

        // Ensure the original function is called once for each unique argument
        expect(func).toHaveBeenCalledTimes(2);
    });
});
