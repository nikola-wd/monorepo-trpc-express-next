import { z } from 'zod';

// TODO: Refactor
export const VS_ownerScheduleTemplateInput = z.object({
    name: z.string().min(3, 'Schedule name is required'),
});

// extracting the type
export type TVS_ownerScheduleTemplateInput = z.infer<
    typeof VS_ownerScheduleTemplateInput
>;
