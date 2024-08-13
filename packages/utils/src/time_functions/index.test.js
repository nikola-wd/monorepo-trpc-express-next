import {
    timeStringToDecimal,
    decimalToTimeString,
} from '../time_functions/index';

describe('timeStringToDecimal', () => {
    it('should convert "08:30" to 8.30', () => {
        expect(timeStringToDecimal('08:30')).toBe(8.3); // Adjusted to 8.3 to match the expected float representation
    });

    it('should convert "14:45" to 14.45', () => {
        expect(timeStringToDecimal('14:45')).toBe(14.45);
    });

    it('should handle single-digit minutes correctly', () => {
        expect(timeStringToDecimal('10:05')).toBe(10.05);
    });

    it('should handle zero minutes correctly', () => {
        expect(timeStringToDecimal('08:00')).toBe(8.0);
    });
});

describe('decimalToTimeString', () => {
    it('should convert 8.30 to "08:30"', () => {
        expect(decimalToTimeString(8.3)).toBe('08:30'); // Adjusted to 8.3 to match the expected float representation
    });

    it('should convert 14.45 to "14:45"', () => {
        expect(decimalToTimeString(14.45)).toBe('14:45');
    });

    it('should handle single-digit minutes correctly', () => {
        expect(decimalToTimeString(10.05)).toBe('10:05');
    });

    it('should handle zero minutes correctly', () => {
        expect(decimalToTimeString(8.0)).toBe('08:00');
    });
});
