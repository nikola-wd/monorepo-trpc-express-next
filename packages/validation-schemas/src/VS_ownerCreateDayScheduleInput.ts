import { z } from 'zod';
import { VS_ownerCreateTimeBlockInput } from './VS_ownerCreateTimeBlockInput';

export const VS_ownerCreateDayScheduleInput = z.object({
    scheduleTemplateId: z.string().uuid(),
    dayOfWeek: z.number().int().min(0).max(7),
    timeBlock: VS_ownerCreateTimeBlockInput,
});

export type TVS_ownerCreateDayScheduleInput = z.infer<
    typeof VS_ownerCreateDayScheduleInput
>;
