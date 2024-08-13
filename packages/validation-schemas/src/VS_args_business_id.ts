import { z } from 'zod';

export const VS_args_business_id = z.object({
  businessId: z.string({
    required_error: 'Business id is required',
    invalid_type_error: 'Business id must be a string',
  }),
});

// extracting the type
export type TVS_args_business_id = z.infer<typeof VS_args_business_id>;
