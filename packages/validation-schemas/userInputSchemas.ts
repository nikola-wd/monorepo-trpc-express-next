import { z } from 'zod';

/********************************************************
 * MARK User input schemas ******************************
 ********************************************************/
export const userByIdInputSchema = z
  .string()
  .uuid({ message: 'Invalid user ID' });

export const userCreateInputSchema = z.object({
  name: z
    .string({
      message: 'Name must be between 2 and 100 characters',
    })
    .min(2)
    .max(100),
  email: z.string().email({ message: 'Invalid email' }),
});

/********************************************************
 * MARK: Type inference *********************************
 ********************************************************/
export type TuserByIdInputSchema = z.infer<typeof userByIdInputSchema>;
export type TuserCreateInputSchema = z.infer<typeof userCreateInputSchema>;
