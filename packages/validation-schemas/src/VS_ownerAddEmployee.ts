import { z } from 'zod';

export const VS_ownerAddEmployee = z.object({
  businessId: z.string({
    required_error: 'Business ID is required',
    invalid_type_error: 'Business ID must be a string',
  }),
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Invalid email address'),
});

// extracting the type
export type TVS_ownerAddEmployee = z.infer<typeof VS_ownerAddEmployee>;
