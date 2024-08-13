import { z } from 'zod';
import { VS_timeSchemaFragment } from './VS_timeSchema.fragment';

export const VS_baseTimeBlockInput = z.object({
    startTime: VS_timeSchemaFragment,
    endTime: VS_timeSchemaFragment,
});

export const validateTimeBlock = (schema: z.ZodType<any>) =>
    schema.superRefine((data, ctx) => {
        if (data.startTime >= data.endTime) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'End time must be after start time',
                path: ['endTime'],
            });
        }
    });

export const VS_ownerCreateTimeBlockInput = validateTimeBlock(
    VS_baseTimeBlockInput,
);

export type TVS_ownerCreateTimeBlockInput = z.infer<
    typeof VS_ownerCreateTimeBlockInput
>;
