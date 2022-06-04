
/**
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
 */
var divide = function (dividend, divisor) {
    const  _32BIT_INTEGER_MIN_VALUE = Math.pow(-2, 31);
    const  _32BIT_INTEGER_MAX_VALUE = Math.pow(2, 31) - 1;

    if (dividend === _32BIT_INTEGER_MIN_VALUE && divisor === -1) {
        return _32BIT_INTEGER_MAX_VALUE;
    }

    this.HALF_32BIT_INTEGER_MIN_VALUE = (_32BIT_INTEGER_MIN_VALUE) >> 1;
    this.dividend = dividend;
    this.divisor = divisor;
    this.numberOfNegativeInputs = 0;
    this.powersOfTwo = 0;
    this.divisorToPowersOfTwo = 0;

    checkAndMapInputIntoTheirCorrespondingNegativeNumbers();
    leftShiftOfDivisorToGetItClosestPossibleToDividendFromBelow();
    return findQuotientAfterDividingDividendByDivisor();
};

//  To get a higher range to work upon, since the negative 32-bit integer range is greater than the positive.
function checkAndMapInputIntoTheirCorrespondingNegativeNumbers() {
    if (this.dividend > 0) {
        this.dividend = -this.dividend;
        ++this.numberOfNegativeInputs;
    }
    if (this.divisor > 0) {
        this.divisor = -this.divisor;
        ++this.numberOfNegativeInputs;
    }
}

function leftShiftOfDivisorToGetItClosestPossibleToDividendFromBelow() {
    this.powersOfTwo = -1;
    this.divisorToPowersOfTwo = this.divisor;
    while (this.divisorToPowersOfTwo >= this.HALF_32BIT_INTEGER_MIN_VALUE && this.dividend <= this.divisorToPowersOfTwo + divisorToPowersOfTwo) {
        this.divisorToPowersOfTwo += this.divisorToPowersOfTwo;
        this.powersOfTwo += this.powersOfTwo;
    }
}

function findQuotientAfterDividingDividendByDivisor() {
    let result = 0;
    while (this.dividend <= this.divisor) {
        if (this.dividend <= this.divisorToPowersOfTwo) {
            this.dividend -= this.divisorToPowersOfTwo;
            result += this.powersOfTwo;
        }
        this.powersOfTwo >>= 1;
        this.divisorToPowersOfTwo >>= 1;
    }
    return this.numberOfNegativeInputs % 2 === 0 ? -result : result;
}
