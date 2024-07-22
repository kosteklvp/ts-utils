import { memoize } from '../../src/decorators/memoize';

describe('@Memoize()', () => {
    class MemoizeTest {
        @memoize()
        static method() {
            return new MemoizeTest();
        }
    }
    it('should cache the result of a static method', () => {
        const spy = jest.spyOn(MemoizeTest, 'method');
        MemoizeTest.method();
        MemoizeTest.method();
        MemoizeTest.method();
        expect(spy).toHaveBeenCalledTimes(1); // Called once for each unique set of arguments
    });
});
