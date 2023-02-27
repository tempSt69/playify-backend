import { z } from 'zod';

export const loginSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'email is required',
      })
      .email({
        message: 'Wrong email format',
      }),
    hash: z
      .string({
        required_error: 'Password is required',
      })
      .min(8),
  }),
});

export const signupSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'email is required',
      })
      .email({
        message: 'Wrong email format',
      }),
    hash: z
      .string({
        required_error: 'Password is required',
      })
      .min(8),
  }),
});
