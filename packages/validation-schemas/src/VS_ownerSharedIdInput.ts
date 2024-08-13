import { z } from 'zod';

export const VS_ownerSharedIdInput = z.object({
    id: z.string().uuid(),
});

export type TVS_ownerSharedIdInput = z.infer<typeof VS_ownerSharedIdInput>;
