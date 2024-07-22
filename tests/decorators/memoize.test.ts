import { memoize } from '../../src/decorators/memoize';

describe('@Memoize()', () => {
    class MemoizeTest {
        @memoize()
        static method(value: number) {
            return value * 3;
        }
    }
    it('should cache the result of a static method', () => {
        const spy = jest.spyOn(MemoizeTest, 'method');
        MemoizeTest.method(2);
        MemoizeTest.method(2);
        MemoizeTest.method(3);
        expect(spy).toHaveBeenCalledTimes(2); // Called once for each unique set of arguments
    });
});
