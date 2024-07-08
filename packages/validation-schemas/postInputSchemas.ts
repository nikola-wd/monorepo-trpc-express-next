import { z } from 'zod';

/********************************************************
 * MARK: post input schemas *****************************
 ********************************************************/
export const postByIdInputSchema = z
  .string()
  .uuid({ message: 'Invalid post ID' });

export const postCreateInputSchema = z.object({
  title: z
    .string({
      message: 'Title must be between 2 and 100 characters',
    })
    .min(2)
    .max(100),
  content: z
    .string({
      message: 'Content must be between 10 and 1000 characters',
    })
    .min(10)
    .max(1000),
  authorId: z.string().uuid({ message: 'Invalid author ID' }),
});

/********************************************************
 * MARK: Type inference *********************************
 ********************************************************/
export type TpostByIdInputSchema = z.infer<typeof postByIdInputSchema>;
export type TpostCreateInputSchema = z.infer<typeof postCreateInputSchema>;
