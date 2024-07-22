import { memoize } from '../../src/decorators/memoize';

describe('@Memoize()', () => {
    class MemoizeTest {
        @memoize()
        static method(value: number) {
            return value;
        }
    }
    it('should cache the result of a static method', () => {
        const spy = jest.spyOn(MemoizeTest, 'method');
        expect(MemoizeTest.method(2)).toBe(6);
        expect(MemoizeTest.method(2)).toBe(6);
        expect(MemoizeTest.method(3)).toBe(12);
        expect(spy).toHaveBeenCalledTimes(2); // Called once for each unique set of arguments
    });
});
