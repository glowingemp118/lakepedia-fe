import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MoveLeft } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useVerifyOTPMutation } from "@/store/Reducer/auth";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "@/store/slices/userSlice";
import { paths } from "@/components/layouts/layout-3/components/paths";

const otpSchema = z.object({
  otp: z
    .string()
    .regex(/^\d{6}$/, "OTP must be exactly 6 digits"),
});

type OtpFormValues = z.infer<typeof otpSchema>;

const VerifyOTP = () => {


  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { state } = useLocation();

  const email = (state as { email: string })?.email || "";

  const otp = (state as { otp: string })?.otp || "";

  const [codeInputs, setCodeInputs] = useState(Array(6).fill(""));

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [verifyOTP] = useVerifyOTPMutation();


  const methods = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
  });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods;

  const handleInputChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const updatedInputs = [...codeInputs];
    updatedInputs[index] = value;
    setCodeInputs(updatedInputs);

    // keep hidden input in sync with RHF
    setValue("otp", updatedInputs.join(""));

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !codeInputs[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const onSubmit = async (data: OtpFormValues) => {

    let response = await verifyOTP({ email, otp: data.otp });

    if (!response.error) {
      toast.success("OTP verified successfully!");

        dispatch(setUser(response?.data?.data?.user));

        dispatch(setToken(response?.data?.data?.token));

        const isTraveler = response?.data?.data?.user?.role === 'traveler';

        const isBuiness = response?.data?.data?.user?.role === 'business';

        if (isTraveler) {
          navigate(paths.travelerDashboard.root);
        }
        else if (isBuiness) {
          navigate(paths.businessDashboard.root);
        }


    }
  };

  useEffect(() => {
    if (errors.otp && methods.watch("otp").length === 6) {
      methods.clearErrors("otp");
    }
  }, [errors.otp, methods, methods.watch("otp")?.length]);

  useEffect(() => {
    if (otp) {
      const otpArray = otp.split("");
      setCodeInputs(otpArray);
      setValue("otp", otp);
    }
  }, [otp, setValue]);

  return (
    <form className="flex flex-col gap-5 p-10" onSubmit={handleSubmit(onSubmit)}>
      <div className="text-center mb-2">
        <h3 className="text-lg font-medium text-mono mb-5">Please check your email!</h3>
        <span className="text-sm text-secondary-foreground mb-1.5">
          We've emailed a 6-digit confirmation code. Please enter it below to verify your email.
        </span>
      </div>

      {/* OTP Inputs */}
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

      <input type="hidden" {...register("otp")} />

      {errors.otp && (
        <p className="text-red-400 text-sm ">{errors.otp.message}</p>
      )}

      <div className="flex items-center justify-center mb-2">
        <span className="text-sm text-secondary-foreground me-1.5">
          Didn’t receive a code?
        </span>
        <Link to="/auth/verify-otp" className="font-semibold text-foreground hover:text-primary">
          Resend
        </Link>
      </div>

      <Button className="grow" type="submit">Continue</Button>

      <Link
        to="/auth/signin"
        className="gap-2.5 flex items-center justify-center text-sm font-semibold text-foreground hover:text-primary"
      >
        <MoveLeft className="size-3.5 opacity-70" />
        Back to Login
      </Link>
    </form>
  );
};

export { VerifyOTP };
