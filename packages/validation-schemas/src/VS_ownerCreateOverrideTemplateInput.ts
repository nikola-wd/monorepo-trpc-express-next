import { z } from 'zod';
import { VS_ownerCreateTimeBlockInput } from './VS_ownerCreateTimeBlockInput';

const dateSchema = z.object({
    day: z.number().int().min(1).max(31),
    month: z.number().int().min(1).max(12),
    year: z.number().int().optional(),
});

export const VS_ownerCreateOverrideTemplateInput = z
    .object({
        name: z
            .string({
                required_error: 'Name is required',
                invalid_type_error: 'Name must be a string',
            })
            .min(3, 'Name is required and must be at least 3 characters long'),
        // TODO: See if we can import enum from prisma with nativeEnum so we don't recreate
        overrideType: z.enum(['WORKING', 'NOT_WORKING'], {
            errorMap: () => ({
                message: `Please select either: Working or Not Working`,
            }),
        }),
        durationType: z.enum(['NON_REPEATING', 'REPEATS_EACH_YEAR'], {
            errorMap: () => ({
                message: `Please select either: Non Repeating or Repeats Each Year`,
            }),
        }),
        dateType: z.enum(['SINGLE', 'RANGE'], {
            errorMap: () => ({
                message: `Please select either: Single or Range`,
            }),
        }),
        explanation: z.string().optional(),
        startDate: dateSchema,
        endDate: dateSchema.optional(),
        isAllDay: z.boolean(),
        timeBlocks: z.array(VS_ownerCreateTimeBlockInput).optional(),
    })
    .superRefine((data, ctx) => {
        // Check if endDate is provided when dateType is RANGE
        if (data.dateType === 'RANGE' && !data.endDate) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'End date is required for date range',
                path: ['endDate'],
            });
        }
        // Check if year is provided for non-repeating events
        if (data.durationType === 'NON_REPEATING' && !data.startDate.year) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Year is required for non-repeating events',
                path: ['startDate', 'year'],
            });
        }

        // Check if end date is after start date for RANGE type
        // TODO: These 2000 need to be refactored ?
        if (data.dateType === 'RANGE' && data.endDate) {
            const startDate = new Date(
                data.startDate.year ?? 2000,
                data.startDate.month - 1,
                data.startDate.day,
            );
            const endDate = new Date(
                data.endDate.year ?? 2000,
                data.endDate.month - 1,
                data.endDate.day,
            );
            if (endDate <= startDate) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'End date must be after start date',
                    path: ['endDate'],
                });
            }
        }

        // Check if time blocks are provided for non-all-day events
        if (
            !data.isAllDay &&
            (!data.timeBlocks || data.timeBlocks.length === 0)
        ) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Time blocks are required for non-all-day events',
                path: ['timeBlocks'],
            });
        }

        // Check for overlapping time blocks
        if (data.timeBlocks && data.timeBlocks.length > 1) {
            const sortedBlocks = [...data.timeBlocks].sort(
                (a, b) => a.startTime - b.startTime,
            );
            for (let i = 1; i < sortedBlocks.length; i++) {
                if (sortedBlocks[i].startTime < sortedBlocks[i - 1].endTime) {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: 'Time blocks must not overlap',
                        path: ['timeBlocks', i, 'startTime'],
                    });
                }
            }
        }
    });

export type TVS_ownerCreateOverrideTemplateInput = z.infer<
    typeof VS_ownerCreateOverrideTemplateInput
>;
