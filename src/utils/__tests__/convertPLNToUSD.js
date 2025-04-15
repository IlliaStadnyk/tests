import { convertPLNToUSD } from './../convertPLNToUSD';

describe('ConvertPLNtoUSD', () => {
    it('should return proper value when good input', () => {
        expect(convertPLNToUSD(1)).toBe('$0.29');
        expect(convertPLNToUSD(2)).toBe('$0.57');
        expect(convertPLNToUSD(20)).toBe('$5.71');
        expect(convertPLNToUSD(12)).toBe('$3.43');
    });
    it('should return NaN when input is text', () => {
        expect(convertPLNToUSD('6')).toBeNaN();
        expect(convertPLNToUSD('abc')).toBeNaN();
        expect(convertPLNToUSD('-543')).toBeNaN();
    });
    it('should return NaN when input is empty', () => {
        expect(convertPLNToUSD()).toBeNaN();
    });
    it('should return NaN when input is not value nor text', () => {
        expect(convertPLNToUSD({})).toBeNaN();
        expect(convertPLNToUSD([])).toBeNaN();
        expect(convertPLNToUSD(null)).toBeNaN();
        expect(convertPLNToUSD(function (){})).toBeNaN();
    });
    it('should return zero when input is lower than zero', () => {
        expect(convertPLNToUSD(-1)).toBe('$0.00');
        expect(convertPLNToUSD(-2)).toBe('$0.00');
        expect(convertPLNToUSD(-56)).toBe('$0.00');
    });
});