import { paths } from '@/components/layouts/layout-3/components/paths';
import { Alert, AlertIcon, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useBoolean } from '@/hooks/use-boolean';
import { useLoginMutation, useSocailLoginMutation } from '@/store/Reducer/auth';
import { setToken, setUser } from '@/store/slices/userSlice';
import { useAuth0 } from "@auth0/auth0-react";
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, Check, Eye, EyeOff, LoaderCircleIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { getSigninSchema, SigninSchemaType } from '../forms/signin-schema';

export function SignInPage() {

  const [searchParams] = useSearchParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const show = useBoolean();

  const [login] = useLoginMutation();

  let [socailLogin] = useSocailLoginMutation();

  const [error, setError] = useState<string | null>(null);

  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [currentTab, setCurrentTab] = useState("traveler");

  const { loginWithRedirect, user, isAuthenticated } = useAuth0();


  // useEffect(() => {

  //   const pathname = window.location.pathname;

  //   const userType = pathname.includes('?user=business') ? 'business' : 'traveler';
    
  //   if (userType === 'traveler' || userType === 'business') {
  //     setCurrentTab(userType);
  //   }
  // }, []);

  // useEffect(() => {
  //   if (currentTab) {
      
  //     const pathname = currentTab === "business" ? "/signin?user=business" : "/signin?user-traveler";

  //     navigate(pathname, { replace: true });
     
  //   }
  // }, [currentTab, navigate]);


  useEffect(() => {
    if (!user || !isAuthenticated) return;

    const currentSocialTab = localStorage.getItem("currentSocialTab");

    const savedRole = localStorage.getItem("currentTab");

    if (!currentSocialTab || !savedRole) return;

    setCurrentTab(savedRole);

    let userData: any = null;

    if (currentSocialTab === "google") {
      userData = {
        first_name: user.name,
        last_name: user.family_name,
        email: user.email,
        // image: user.picture,
        role: savedRole === "traveler" ? "traveler" : "business",
        provider: user?.sub?.split("|")?.[0]?.split("-")?.[0],
        socialId: user?.sub?.split("|")?.[1],
      };
    }

    if (currentSocialTab === "facebook") {

      userData = {
        first_name: user.name,
        last_name: user.nickname,
        email: user.email,
        // image: user?.picture,
        role: savedRole === "traveler" ? "traveler" : "business",
        provider: user?.sub?.split("|")?.[0],
        socialId: user?.sub?.split("|")?.[1],
      };
    }

    if (!userData) return;

    let isMounted = true;
    socailLogin(userData).then((res: any) => {
      if (!isMounted) return;
      if (!res.error) {
        dispatch(setUser(res?.data?.data?.user));
        dispatch(setToken(res?.data?.data?.token));

        localStorage.removeItem("currentSocialTab");
        localStorage.removeItem("currentTab");

        if (userData.role === "business") {
          navigate(paths.businessDashboard.root);
        } else {
          navigate(paths.travelerDashboard.root);
        }
      }
    });

    return () => {
      isMounted = false;
    };
  }, [user, isAuthenticated, dispatch, navigate]);


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

  const form = useForm<SigninSchemaType>({
    resolver: zodResolver(getSigninSchema()),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: true,
    },
  });

  useEffect(() => {
    const rememberMeData = localStorage.getItem("rememberMe");
    if (rememberMeData) {
      const { email, password, rememberMe } = JSON.parse(rememberMeData);
      form.setValue("email", email);
      form.setValue("password", password);
      form.setValue("rememberMe", rememberMe);
    }
  }, []);

  async function onSubmit(values: SigninSchemaType) {
    try {
      setError(null);

      // Simple validation
      if (!values.email.trim() || !values.password) {
        setError('Email and password are required');
        return;
      }

      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      const response = await login({ email: values.email, password: values.password, timezone, role: currentTab });

      if (!response.error) {

        values.rememberMe ? localStorage.setItem("rememberMe", JSON.stringify({
          rememberMe: values.rememberMe,
          email: values.email,
          password: values.password
        })) : localStorage.removeItem("rememberMe");

        dispatch(setUser(response?.data?.data?.user));

        dispatch(setToken(response?.data?.data?.token));
        

        const nextPath = searchParams.get('next') || (response?.data?.data?.user?.role === 'traveler' ? paths.travelerDashboard.root : paths.businessDashboard.root);
        console.log("Next Path:", nextPath);

        navigate(nextPath);
      }

    } catch (err) {
      console.error('Unexpected sign-in error:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'An unexpected error occurred. Please try again.',
      );
    }
  }

  const handleChangeTab = (value: string) => {
    setCurrentTab(value);
  }

  return (
    <>
      <Tabs value={currentTab} onValueChange={handleChangeTab} >
        <TabsList className="justify-center px-5 mb-2.5" variant="line">
          <TabsTrigger value="traveler">Traveler</TabsTrigger>
          <TabsTrigger value="business">Business</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="text-center space-y-1 pb-3">
        <h1 className="text-2xl font-semibold tracking-tight">Sign In {currentTab === 'traveler' ? 'Traveler' : 'Business'}</h1>
        <p className="text-sm text-muted-foreground">
          Welcome back! Log in with your credentials.
        </p>
      </div>
      <div>
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
      </div>
      <div className="flex items-center justify-center gap-4">


        <Button
          variant="outline"
          className=" cursor-pointer h-[60px] w-[60px] rounded-full"
          onClick={() => {
            localStorage.setItem("currentTab", currentTab);
            localStorage.setItem("currentSocialTab", "google");
            loginWithRedirect({
              authorizationParams: {
                connection: "google-oauth2",
                redirect_uri: import.meta.env.VITE_AUTH_REDIRECT_URI,
              }
            })
          }}
        >
          <span className="w-6 h-6 flex items-center justify-center">

            <img
              src="/media/images/social/googleIcon.png"
              alt="Google"
              className="w-[25px] h-[25px]"
              width={25}
              height={25}
            />
          </span>
        </Button>

        <Button
          variant="outline"
          className=" cursor-pointer h-[60px] w-[60px] rounded-full"
          onClick={() => {
            localStorage.setItem("currentTab", currentTab);
            localStorage.setItem("currentSocialTab", "facebook");
            loginWithRedirect({
              authorizationParams: {
                connection: "facebook",
                redirect_uri: import.meta.env.VITE_AUTH_REDIRECT_URI,
              }
            })
          }}
        >
          <span className="w-6 h-6 flex items-center justify-center">
            <img
              src="/media/images/social/facebook.svg"
              alt="Meta"
              className="w-[25px] h-[25px]"
              width={25}
              height={25}
            />
          </span>
        </Button>
      </div>
      <br />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="block w-full space-y-5"
        >

          <div className="relative py-1.5">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">or</span>
            </div>
          </div>

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
          <div className='flex justify-between items-center mb-5'>
            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-0.5 space-y-0 rounded-md">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm text-muted-foreground">
                      Remember me

                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <Link
              to="/auth/forgot-password"
              className="text-sm font-semibold text-foreground hover:text-primary"
            >
              Forgot Password?
            </Link>
          </div>

          <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? (
              <span className="flex items-center gap-2">
                <LoaderCircleIcon className="h-4 w-4 animate-spin" /> Loading...
              </span>
            ) : (
              'Sign In'
            )}
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link
              to="/auth/signup"
              className="text-sm font-semibold text-foreground hover:text-primary"
            >
              Sign Up
            </Link>
          </div>
        </form>
      </Form >
    </>
  );
}
