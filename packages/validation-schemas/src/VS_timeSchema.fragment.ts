import { z } from 'zod';

const twoDecimalPlaces = (val: number) => Number(val.toFixed(2)) === val;

// Reusable time schema
export const VS_timeSchemaFragment = z
    .number({
        required_error: `Time is required`,
        invalid_type_error: `Time must be a decimal number`,
    })
    .positive()
    .max(23.59, 'Time must be a valid decimal time (e.g., 14.25 for 14:15)')
    .refine(twoDecimalPlaces, {
        message: 'Time must have at most two decimal places',
    });
