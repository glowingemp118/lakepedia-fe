import { paths } from '@/components/layouts/layout-3/components/paths';
import { Alert, AlertIcon, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useBoolean } from '@/hooks/use-boolean';
import { useAdminLoginMutation } from '@/store/Reducer/auth';
import { setToken, setUser } from '@/store/slices/userSlice';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, Check, Eye, EyeOff, LoaderCircleIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AdminSigninSchemaType, getAdminSigninSchema } from '../forms/signin-schema';

export function AdminSignInPage() {

  const [searchParams] = useSearchParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const show = useBoolean();

  const [login] = useAdminLoginMutation();

  const [error, setError] = useState<string | null>(null);

  const [successMessage, setSuccessMessage] = useState<string | null>(null);


  // Check for success message from password reset or error messages
  useEffect(() => {

    const pwdReset = searchParams.get('pwd_reset');

    const errorParam = searchParams.get('error');

    const errorDescription = searchParams.get('error_description');

    if (pwdReset === 'success') {
      setSuccessMessage(
        'Your password has been successfully reset. You can now sign in with your new password.',
      );
    }

    if (errorParam) {
      switch (errorParam) {
        case 'auth_callback_failed':
          setError(
            errorDescription || 'Authentication failed. Please try again.',
          );
          break;
        case 'auth_callback_error':
          setError(
            errorDescription ||
            'An error occurred during authentication. Please try again.',
          );
          break;
        case 'auth_token_error':
          setError(
            errorDescription ||
            'Failed to set authentication session. Please try again.',
          );
          break;
        default:
          setError(
            errorDescription || 'Authentication error. Please try again.',
          );
          break;
      }
    }
  }, [searchParams]);

  const form = useForm<AdminSigninSchemaType>({
    resolver: zodResolver(getAdminSigninSchema()),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: AdminSigninSchemaType) {
    try {
      // setIsProcessing(true);
      setError(null);

      //console.log('Attempting to sign in with email:', values.email);

      // Simple validation
      if (!values.email.trim() || !values.password) {
        setError('Email and password are required');
        return;
      }

      // Sign in using the auth context
      // const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      // const res = await login({ email: values.email, password: values.password, timezone });
      // if (!res?.error) {

      // toast.success('Signed in successfully!');

      // dispatch(setUser(res?.data?.data?.user));

      const data = {
        email: values.email,
        pass: values.password,
        role: "admin",
      }

      dispatch(setUser(data))

      // dispatch(setToken(res?.data?.data?.token));

      const nextPath = searchParams.get('next') || paths.adminDashboard.root;
      navigate(nextPath);
      // }
      // Get the 'next' parameter from URL if it exists

    } catch (err) {
      console.error('Unexpected sign-in error:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'An unexpected error occurred. Please try again.',
      );
    }
  }


  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="block w-full space-y-5"
      >
        <div className="text-center space-y-1 pb-3">
          <h1 className="text-2xl font-semibold tracking-tight">Sign In</h1>
          <p className="text-sm text-muted-foreground">
            Welcome back! Log in with your credentials.
          </p>
        </div>

        {error && (
          <Alert
            variant="destructive"
            appearance="light"
            onClose={() => setError(null)}
          >
            <AlertIcon>
              <AlertCircle />
            </AlertIcon>
            <AlertTitle>{error}</AlertTitle>
          </Alert>
        )}

        {successMessage && (
          <Alert appearance="light" onClose={() => setSuccessMessage(null)}>
            <AlertIcon>
              <Check />
            </AlertIcon>
            <AlertTitle>{successMessage}</AlertTitle>
          </Alert>
        )}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between items-center gap-2.5">
                <FormLabel>Password</FormLabel>
              </div>
              <div className="relative">
                <Input
                  placeholder="Your password"
                  type={show.value ? 'text' : 'password'} // Toggle input type
                  {...field}
                />
                <Button
                  type="button"
                  variant="ghost"
                  mode="icon"
                  onClick={show.onToggle}
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                >
                  {show.value ? (
                    <EyeOff className="text-muted-foreground" />
                  ) : (
                    <Eye className="text-muted-foreground" />
                  )}
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? (
            <span className="flex items-center gap-2">
              <LoaderCircleIcon className="h-4 w-4 animate-spin" /> Loading...
            </span>
          ) : (
            'Sign In'
          )}
        </Button>
      </form>
    </Form>
  );
}
