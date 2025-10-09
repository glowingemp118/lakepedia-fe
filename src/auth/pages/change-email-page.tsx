import RHFTextField from '@/components/rhf/rhf-textfield';
import { Alert, AlertIcon, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useBoolean } from '@/hooks/use-boolean';
import { useResetPasswordMutation } from '@/store/Reducer/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, Check, Eye, EyeOff, LoaderCircleIcon, MoveLeft } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import * as Z from 'zod';


export function ChangeEmailPage() {

  const { state } = useLocation();

  const navigate = useNavigate();

  const show = useBoolean();

  const [error, setError] = useState<string | null>(null);

  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [codeInputs, setCodeInputs] = useState(Array(6).fill(""));

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [resetPassword] = useResetPasswordMutation();

  const schema=Z.object({
    otp:Z.string().regex(/^\d{6}$/,"OTP must be exactly 6 digits"),
    email:Z.string().email("Invalid email address")
  })

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      otp: '',
      email: '',
    },
  });

  const {formState:{errors}}=form;


 const email = (state as { email: string })?.email || "";

  const handleInputChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const updatedInputs = [...codeInputs];
    updatedInputs[index] = value;
    setCodeInputs(updatedInputs);

    // keep hidden input in sync with RHF
    form.setValue("otp", updatedInputs.join(""));

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !codeInputs[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };


  useEffect(() => {
    if (errors.otp && form.watch("otp").length === 6) {
      form.clearErrors("otp");
    }
  }, [errors.otp, form, form.watch("otp")?.length]);



  async function onSubmit(values: Z.infer<typeof schema>) {
    try {
      setError(null);

      // let response = await resetPassword({
      //   otp: codeInputs.join(""),
      //   email,
      // });
      const response={
        error:false
      }

      if (!response?.error) {
        // toast.success("Password reset successfully");
        navigate('/auth/signin/traveler');
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
              Change Email
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your new email address.
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

            <div className="flex flex-wrap justify-center gap-1.5">
              {codeInputs.map((value, index) => (
                <Input
                  key={index}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  className="size-10 shrink-0 px-0 text-center"
                  value={value}
                  ref={(el) => (inputRefs.current[index] = el)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  autoFocus={index === 0}
                />
              ))}
            </div>

            <input type="hidden" {...form.register("otp")} />

            {errors.otp && (
              <p className="text-red-400 text-sm ">{errors.otp.message}</p>
            )}

           <RHFTextField name="email" label="New Email" placeholder="Enter your new email" />

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
              to="/auth/signin"
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
