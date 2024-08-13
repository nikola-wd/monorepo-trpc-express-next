import { z } from 'zod';

export const VS_superadminCreateCategory = z.object({
  name: z
    .string({
      required_error: 'Category name is required',
      invalid_type_error: 'Category name must be a string',
    })
    .min(3, 'Category name is required'),
});

// TODO: Are these useful?
// extracting the type
export type TVS_superadminCreateCategory = z.infer<
  typeof VS_superadminCreateCategory
>;
