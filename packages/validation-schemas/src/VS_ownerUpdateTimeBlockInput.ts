import { z } from 'zod';
import {
    VS_baseTimeBlockInput,
    validateTimeBlock,
} from './VS_ownerCreateTimeBlockInput';

export const VS_ownerUpdateTimeBlockInput = validateTimeBlock(
    VS_baseTimeBlockInput.extend({
        id: z.string().uuid(),
    }),
);

export type TVS_ownerUpdateTimeBlockInput = z.infer<
    typeof VS_ownerUpdateTimeBlockInput
>;
