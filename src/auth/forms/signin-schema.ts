import { z } from 'zod';

export const getSigninSchema = () => {
  return z.object({
    email: z
      .string()
      .email({ message: 'Please enter a valid email address.' })
      .min(1, { message: 'Email is required.' }),
    password: z.string().min(1, { message: 'Password is required.' }),
    rememberMe: z.boolean({message: 'Remember Me must be a boolean value.'})
  });
};

export const getAdminSigninSchema = () => {
  return z.object({
    email: z
      .string()
      .email({ message: 'Please enter a valid email address.' })
      .min(1, { message: 'Email is required.' }),
    password: z.string().min(1, { message: 'Password is required.' }),
  });
}

export type SigninSchemaType = z.infer<ReturnType<typeof getSigninSchema>>;

export type AdminSigninSchemaType = z.infer<ReturnType<typeof getAdminSigninSchema>>;