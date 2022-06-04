
using namespace std;

class Solution {
    
    inline static const int HALF_32BIT_INTEGER_MIN_VALUE = INT_MIN >> 1;
    int numberOfNegativeInputs;
    int powersOfTwo;
    int divisorToPowersOfTwo;
    int dividend;
    int divisor;

public:
    int divide(int dividend, int divisor) {
        if (dividend == INT_MIN && divisor == -1) {
            return INT_MAX;
        }
        this->dividend = dividend;
        this->divisor = divisor;
        checkAndMapInputIntoTheirCorrespondingNegativeNumbers();
        leftShiftOfDivisorToGetItClosestPossibleToDividendFromBelow();
        return findQuotientAfterDividingDividendByDivisor();
    }

private:
    void leftShiftOfDivisorToGetItClosestPossibleToDividendFromBelow() {
        powersOfTwo = -1;
        divisorToPowersOfTwo = divisor;
        while (divisorToPowersOfTwo >= HALF_32BIT_INTEGER_MIN_VALUE && dividend <= divisorToPowersOfTwo + divisorToPowersOfTwo) {
            divisorToPowersOfTwo += divisorToPowersOfTwo;
            powersOfTwo += powersOfTwo;
        }
    }

    //  To get a higher range to work upon, since the negative 32-bit integer range is greater than the positive.
    void checkAndMapInputIntoTheirCorrespondingNegativeNumbers() {
        if (dividend > 0) {
            dividend = -dividend;
            ++numberOfNegativeInputs;
        }
        if (divisor > 0) {
            divisor = -divisor;
            ++numberOfNegativeInputs;
        }
    }

    int findQuotientAfterDividingDividendByDivisor() {
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
};
