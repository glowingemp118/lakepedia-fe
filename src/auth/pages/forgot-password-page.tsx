import RHFTextField from '@/components/rhf/rhf-textfield';
import { Alert, AlertIcon, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Form
} from '@/components/ui/form';
import { useForgotPasswordMutation } from '@/store/Reducer/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, Check, LoaderCircleIcon, MoveLeft } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import {
  getResetRequestSchema,
  ResetRequestSchemaType,
} from '../forms/reset-password-schema';
import { paths } from '@/components/layouts/layout-3/components/paths';

export function ForgotPasswordPage() {


  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);

  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [forgotPassword] = useForgotPasswordMutation();

  const form = useForm<ResetRequestSchemaType>({
    resolver: zodResolver(getResetRequestSchema()),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(values: ResetRequestSchemaType) {
    try {
      setError(null);

      let response = await forgotPassword({email: values.email});

      if (!response?.error) {
        // toast.success("OTP sent to your email");
        navigate(paths.resetPassword, { state: { email: values.email, otp: response?.data?.data?.otp } });
      }


      form.reset();
    } catch (err) {
      console.error('Password reset request error:', err);
      setError(
        err instanceof Error
          ? `Error: ${err.message}. Please ensure your email is correct and try again.`
          : 'An unexpected error occurred. Please try again or contact support.',
      );
    } finally {
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold tracking-tight">
              Forgot Password
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email to reset your password.
            </p>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertIcon>
                <AlertCircle className="h-4 w-4" />
              </AlertIcon>
              <AlertTitle>{error}</AlertTitle>
            </Alert>
          )}

          {successMessage && (
            <Alert>
              <AlertIcon>
                <Check className="h-4 w-4 text-green-500" />
              </AlertIcon>
              <AlertTitle>{successMessage}</AlertTitle>
            </Alert>
          )}

          <div className="space-y-5">

            <RHFTextField name='email' label='Email' type='email' placeholder='your.email@example.com' />

            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? (
                <span className="flex items-center gap-2">
                  <LoaderCircleIcon className="h-4 w-4 animate-spin" /> Submitting
                </span>
              ) : (
                'Submit'
              )}
            </Button>
          </div>

          <div className="text-center text-sm">
            <Link
              to={paths.signin}
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent-foreground hover:underline hover:underline-offset-2"
            >
              <MoveLeft className="size-3.5 opacity-70" /> Back to Sign In
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}
