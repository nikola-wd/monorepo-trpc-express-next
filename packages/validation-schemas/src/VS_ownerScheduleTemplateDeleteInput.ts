import { z } from 'zod';

export const VS_ownerScheduleTemplateDeleteInput = z.object({
    scheduleTemplateId: z.string().uuid({
        message: 'Schedule Template ID is required',
    }),
});

// extracting the type
export type TVS_ownerScheduleTemplateDeleteInput = z.infer<
    typeof VS_ownerScheduleTemplateDeleteInput
>;
