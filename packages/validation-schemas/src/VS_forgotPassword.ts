import { z } from 'zod';

// TODO: Create a simple VS_email and reuse

export const VS_forgotPassword = z.object({
    // email to be required and a valid email
    email: z
        .string()
        .min(5, 'Email is required')
        .email('Invalid email address'),
});

// extracting the type
export type TVS_forgotPassword = z.infer<typeof VS_forgotPassword>;
