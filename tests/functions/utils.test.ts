/* eslint-disable @typescript-eslint/no-empty-function */
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

    test('Passed "async" function is called only once', async () => {
        const asyncFunc = jest.fn(async () => {});
        const cachedAsyncFunc = cache(asyncFunc);

        expect(asyncFunc).toHaveBeenCalledTimes(0);

        await cachedAsyncFunc();

        expect(asyncFunc).toHaveBeenCalledTimes(1);

        await cachedAsyncFunc();
        await cachedAsyncFunc();

        expect(asyncFunc).toHaveBeenCalledTimes(1);

        await cachedAsyncFunc();

        expect(asyncFunc).toHaveBeenCalledTimes(1);
    });

    test('Passed function is called only once for different arguments', () => {
        const func = jest.fn((x, y) => x + y);
        const cachedFunc = cache(func);

        expect(func).toHaveBeenCalledTimes(0);

        expect(cachedFunc(1, 1)).toBe(2);
        expect(func).toHaveBeenCalledTimes(1);

        expect(cachedFunc(2, 1)).toBe(3);
        expect(func).toHaveBeenCalledTimes(2);

        expect(cachedFunc(2, 1)).toBe(3);
        expect(func).toHaveBeenCalledTimes(2);

        expect(cachedFunc(2, '1')).toBe('21');
        expect(func).toHaveBeenCalledTimes(3);

        expect(cachedFunc('1', '1')).toBe('11');
        expect(func).toHaveBeenCalledTimes(4);

        expect(cachedFunc(1, 1)).toBe(2);
        expect(func).toHaveBeenCalledTimes(4);
    });

    test('Passed function is called only once for different optional arguments', () => {
        const func = jest.fn((x, y?) => x + y || 1);
        const cachedFunc = cache(func);

        expect(func).toHaveBeenCalledTimes(0);

        expect(cachedFunc(1)).toBe(1);
        expect(func).toHaveBeenCalledTimes(1);

        expect(cachedFunc(1)).toBe(1);
        expect(func).toHaveBeenCalledTimes(1);

        expect(cachedFunc(1)).toBe(1);
        expect(func).toHaveBeenCalledTimes(1);

        expect(cachedFunc(1, 3)).toBe(4);
        expect(func).toHaveBeenCalledTimes(2);

        expect(cachedFunc('Text', 'Optional')).toBe('TextOptional');
        expect(func).toHaveBeenCalledTimes(3);
    });

    test('Works with functions returning objects', () => {
        const func = jest.fn(x => ({ value: x }));
        const cachedFunc = cache(func);

        expect(func).toHaveBeenCalledTimes(0);

        expect(cachedFunc(1)).toEqual({ value: 1 });
        expect(func).toHaveBeenCalledTimes(1);

        expect(cachedFunc(2)).toEqual({ value: 2 });
        expect(func).toHaveBeenCalledTimes(2);

        expect(cachedFunc(2)).toEqual({ value: 2 });
        expect(func).toHaveBeenCalledTimes(2);
    });

    test('Works with methods', () => {
        class Class {
            method(value: number) {
                return value;
            }
        }

        const func = jest.fn(new Class().method);
        const cachedFunc = cache(func);

        expect(func).toHaveBeenCalledTimes(0);

        expect(cachedFunc(1)).toEqual(1);
        expect(func).toHaveBeenCalledTimes(1);

        expect(cachedFunc(2)).toEqual(2);
        expect(func).toHaveBeenCalledTimes(2);

        expect(cachedFunc(2)).toEqual(2);
        expect(func).toHaveBeenCalledTimes(2);
    });

    test('Works with static methods', () => {
        class Class {
            static method(value: number) {
                return value;
            }
        }

        const func = jest.fn(Class.method);
        const cachedFunc = cache(func);

        expect(func).toHaveBeenCalledTimes(0);

        expect(cachedFunc(1)).toEqual(1);
        expect(func).toHaveBeenCalledTimes(1);

        expect(cachedFunc(2)).toEqual(2);
        expect(func).toHaveBeenCalledTimes(2);

        expect(cachedFunc(2)).toEqual(2);
        expect(func).toHaveBeenCalledTimes(2);
    });
});
