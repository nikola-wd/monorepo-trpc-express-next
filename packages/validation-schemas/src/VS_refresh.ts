import { z } from 'zod';

export const VS_refresh = z.object({
  refreshToken: z.string({
    required_error: 'refreshToken is required',
    invalid_type_error: 'refreshToken must be a string',
  }),
});
