
public class Solution {

    private static final int HALF_32BIT_INTEGER_MIN_VALUE = Integer.MIN_VALUE >> 1;
    private int numberOfNegativeInputs;
    private int powersOfTwo;
    private int divisorToPowersOfTwo;
    private int dividend;
    private int divisor;

    public int divide(int dividend, int divisor) {
        if (dividend == Integer.MIN_VALUE && divisor == -1) {
            return Integer.MAX_VALUE;
        }
        this.dividend = dividend;
        this.divisor = divisor;
        checkAndMapInputIntoTheirCorrespondingNegativeNumbers();
        leftShiftOfDivisorToGetItClosestPossibleToDividendFromBelow();
        return findQuotientAfterDividingDividendByDivisor();
    }

    //  To get a higher range to work upon, since the negative 32-bit integer range is greater than the positive.
    private void checkAndMapInputIntoTheirCorrespondingNegativeNumbers() {
        if (dividend > 0) {
            dividend = -dividend;
            ++numberOfNegativeInputs;
        }
        if (divisor > 0) {
            divisor = -divisor;
            ++numberOfNegativeInputs;
        }
    }

    private void leftShiftOfDivisorToGetItClosestPossibleToDividendFromBelow() {
        powersOfTwo = -1;
        divisorToPowersOfTwo = divisor;
        while (divisorToPowersOfTwo >= HALF_32BIT_INTEGER_MIN_VALUE && dividend <= divisorToPowersOfTwo + divisorToPowersOfTwo) {
            divisorToPowersOfTwo += divisorToPowersOfTwo;
            powersOfTwo += powersOfTwo;
        }
    }

    private int findQuotientAfterDividingDividendByDivisor() {
        int result = 0;
        while (dividend <= divisor) {
            if (dividend <= divisorToPowersOfTwo) {
                dividend -= divisorToPowersOfTwo;
                result += powersOfTwo;
            }
            powersOfTwo >>= 1;
            divisorToPowersOfTwo >>= 1;
        }
        return numberOfNegativeInputs % 2 == 0 ? -result : result;
    }
}
