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
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRegisterMutation, useSocailLoginMutation } from '@/store/Reducer/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, Check, Eye, EyeOff, LoaderCircleIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { getSignupSchema, SignupSchemaType } from '../forms/signup-schema';
import { paths } from '@/components/layouts/layout-3/components/paths';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '@/store/slices/userSlice';
import { LowerCaseWithUserId, toAbsoluteUrl } from '@/lib/helpers';
import { useBoolean } from '@/hooks/use-boolean';

export function SignUpPage() {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const loading = useBoolean();

  const hasLoggedInRef = useRef(false);

  const [passwordVisible, setPasswordVisible] = useState(false);

  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [currentTab, setCurrentTab] = useState(window.location.search || "traveler");

  const [register] = useRegisterMutation();

  let [socailLogin, { isLoading }] = useSocailLoginMutation();

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

  //     const pathname = currentTab === "business" ? "/login?user=business" : "/login?user-traveler";

  //     navigate(pathname, { replace: true });

  //   }
  // }, [currentTab, navigate]);

  const socialLoginFun = (userData: any) => {

    loading.onTrue();

    socailLogin(userData).then(async (res: any) => {

      if (!res.error) {

        dispatch(setUser(res?.data?.data?.user));

        dispatch(setToken(res?.data?.data?.token));

        localStorage.removeItem("currentSocialTab");
        localStorage.removeItem("currentTab");

        if (userData.role === "business") {

          await new Promise((resol) => setTimeout(resol, 2000));
          navigate(paths.businessDashboard.root(LowerCaseWithUserId(res?.data?.data?.user)));
          loading.onFalse();
        } else {

          await new Promise((resol) => setTimeout(resol, 2000));

          navigate(paths.travelerDashboard.root(LowerCaseWithUserId(res?.data?.data?.user)));
          loading.onFalse();
        }
      }
    }).finally(() => {

      loading.onFalse();
    })
  };


  useEffect(() => {
    if (!user || !isAuthenticated) return;

    if (hasLoggedInRef.current) return; // Prevent multiple calls

    hasLoggedInRef.current = true;

    const currentSocialTab = localStorage.getItem("currentSocialTab");

    const savedRole = localStorage.getItem("currentTab");

    if (!currentSocialTab || !savedRole) return;

    setCurrentTab(savedRole);

    let userData: any = null;

    if (currentSocialTab === "google") {
      userData = {
        first_name: user.name?.split(" ")?.[0] || "",
        last_name: user.name?.split(" ")?.slice(1).join(" ") || "",
        email: user.email,
        // image: user.picture,
        role: savedRole === "traveler" ? "traveler" : "business",
        provider: user?.sub?.split("|")?.[0]?.split("-")?.[0],
        socialId: user?.sub?.split("|")?.[1],
      };
    }

    if (currentSocialTab === "facebook") {

      userData = {
        first_name: user.name?.split(" ")?.[0] || "",
        last_name: user.name?.split(" ")?.slice(1).join(" ") || "",
        email: user.email,
        // image: user?.picture,
        role: savedRole === "traveler" ? "traveler" : "business",
        provider: user?.sub?.split("|")?.[0],
        socialId: user?.sub?.split("|")?.[1],
      };
    }

    if (!userData) return;

    socialLoginFun(userData);



  }, [user, isAuthenticated, dispatch, navigate]);





  const form = useForm<SignupSchemaType>({
    resolver: zodResolver(getSignupSchema()),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
    },
  });

  // useEffect(() => {
  //   const params = new URLSearchParams(window.location.search);
  //   const userType = params.get('user');
  //   if (userType === 'traveler' || userType === 'business') {
  //     setCurrentTab(userType);
  //   }
  // }, []);

  // useEffect(() => {
  //   if (currentTab) {
  //     const params = new URLSearchParams(window.location.search);
  //     const userType = params.get("user");

  //     if (userType !== currentTab) {
  //       navigate(`${window.location.pathname}?user=${currentTab}`, {
  //         replace: true,
  //       });
  //     }
  //   }
  // }, [currentTab, navigate]);


  async function onSubmit(values: SignupSchemaType) {
    try {
      setError(null);

      // Register the user with Supabase


      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      let response = await register(
        {
          first_name: values.firstName,
          last_name: values.lastName,
          email: values.email,
          password: values.password,
          timezone,
          role: currentTab
        }
      );

      // Set success message and metadata

      if (!response.error) {
        setSuccessMessage(
          'Registration successful! Please check your email to confirm your account.',
        );
        navigate(paths.verifyOTP, { state: { email: response?.data?.data?.user?.email, otp: response?.data?.data?.otp } });
      }


    } catch (err) {
      console.error('Registration error:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'An unexpected error occurred during registration. Please try again.',
      );
    }
  }

  const handleChangeTab = (value: string) => {
    setCurrentTab(value);
  }

  return (
    <>
      {isLoading ?
        <div className="flex flex-col items-center gap-2 justify-center inset-0 z-50 transition-opacity duration-700 ease-in-out">
          <img
            className="h-[30px] max-w-none"
            src={toAbsoluteUrl('/media/app/mini-logo.png')}
            alt="logo"
          />
          <div className="text-muted-foreground font-medium text-sm">
            Loading...
          </div>
        </div>
        :
        <>
          <Tabs value={currentTab} onValueChange={handleChangeTab} >
            <TabsList className="justify-center px-5 mb-2.5" variant="line">
              <TabsTrigger value="traveler">Traveler</TabsTrigger>
              <TabsTrigger value="business">Business</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="text-center space-y-1 pb-3">
            <h1 className="text-2xl font-semibold tracking-tight">{
              currentTab === "traveler" && "Sign Up as Traveler" ||
              currentTab === "business" && "Sign Up as Business"
            }</h1>
            <p className="text-sm text-muted-foreground">
              Create your account to get started
            </p>
          </div>
          {
            error && (
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
            )
          }
          {
            successMessage && (
              <Alert appearance="light" onClose={() => setSuccessMessage(null)}>
                <AlertIcon>
                  <Check />
                </AlertIcon>
                <AlertTitle>{successMessage}</AlertTitle>
              </Alert>
            )
          }
          <div className="flex items-center justify-center gap-4">

            <Button
              variant="outline"
              className=" cursor-pointer h-[60px] w-[60px] rounded-full"
              onClick={() => {
                localStorage.setItem("currentTab", currentTab);
                localStorage.setItem("currentSocialTab", "google");
                loginWithRedirect({
                  appState: { returnTo: "/signup" },
                  authorizationParams: {
                    connection: "google-oauth2",
                    screen_hint: "signup",
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
                  appState: { returnTo: "/signup" },
                  authorizationParams: {
                    screen_hint: "signup",
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <RHFTextField name='firstName' label='First Name' placeholder='Your first name' />

                <RHFTextField name='lastName' label='Last Name' placeholder='Your last name' />

              </div>

              <RHFTextField name='email' label='Email' placeholder='Your email address' type='email' />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <div className="relative">
                      <Input
                        placeholder="Create a password"
                        type={passwordVisible ? 'text' : 'password'}
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        mode="icon"
                        onClick={() => setPasswordVisible(!passwordVisible)}
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      >
                        {passwordVisible ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <div className="relative">
                      <Input
                        placeholder="Confirm your password"
                        type={confirmPasswordVisible ? 'text' : 'password'}
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        mode="icon"
                        onClick={() =>
                          setConfirmPasswordVisible(!confirmPasswordVisible)
                        }
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      >
                        {confirmPasswordVisible ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
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
                    <LoaderCircleIcon className="h-4 w-4 animate-spin" /> Creating account...
                  </span>
                ) : (
                  'Create Account'
                )}
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link
                  to={paths.signin}
                  className="text-sm font-semibold text-foreground hover:text-primary"
                >
                  Sign In
                </Link>
              </div>
            </form>
          </Form>

        </>
      }    </>
  );
}
