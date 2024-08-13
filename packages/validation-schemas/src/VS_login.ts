import { z } from 'zod';

export const VS_login = z.object({
  // email to be required and a valid email
  email: z.string().min(5, 'Email is required').email('Invalid email address'),
  // TODO: Create a strong password policy and validate here
  password: z.string().min(8, 'Password is required'),
});

// extracting the type
export type TVS_login = z.infer<typeof VS_login>;
