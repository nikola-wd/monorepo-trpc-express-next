import { z } from 'zod';

/********************************************************
 * MARK: auth input schemas *****************************
 ********************************************************/

export const authSignUpSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .min(5, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string({
      required_error: 'Password is required',
      invalid_type_error: 'Password must be a string',
    })
    .min(8, 'Password must be at least 8 characters long'),
});

export const authSignInSchema = z.object({
  // email to be required and a valid email
  email: z.string().min(5, 'Email is required').email('Invalid email address'),
  password: z.string().min(8, 'Password is required'),
});

/********************************************************
 * MARK: Type inference *********************************
 ********************************************************/
export type TauthSignUpSchema = z.infer<typeof authSignUpSchema>;
export type TauthSignInSchema = z.infer<typeof authSignInSchema>;
