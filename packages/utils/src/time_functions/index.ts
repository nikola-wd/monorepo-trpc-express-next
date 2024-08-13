/**
 * Converts a time string in the format "HH:MM" to a decimal number representing the time in hours.
 *
 * @param timeString - The time string to convert.
 * @returns The time in decimal format.
 */
export const timeStringToDecimal = (timeString: string): number => {
    const [hours, minutes] = timeString.split(':').map(Number);
    const decimalMinutes = (
        minutes < 10 ? `0${minutes.toString()}` : minutes
    ).toString();
    return parseFloat(`${hours.toString()}.${decimalMinutes}`);
};

/**
 * Converts a decimal number to a time string in the format "HH:mm".
 * @param decimal - The decimal number representing the time.
 * @returns The time string in the format "HH:mm".
 */
export const decimalToTimeString = (decimal: number): string => {
    const hours = Math.floor(decimal);
    const minutes = Math.round((decimal - hours) * 100);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};
