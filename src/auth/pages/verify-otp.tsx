import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MoveLeft } from 'lucide-react';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const VerifyOTP = () => {

  const [codeInputs, setCodeInputs] = useState(Array(6).fill(''));

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleInputChange = (index: number, value: string) => {

    if (!/^\d?$/.test(value)) return;

    const updatedInputs = [...codeInputs];

    updatedInputs[index] = value;

    setCodeInputs(updatedInputs);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !codeInputs[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted code:', codeInputs.join(''));
    // Submit codeInputs.join('')
  };

  return (
    <form className="flex flex-col gap-5 p-10" onSubmit={handleSubmit}>

      <div className="text-center mb-2">
        <h3 className="text-lg font-medium text-mono mb-5">Please check your email!</h3>
        <div className="flex flex-col">
          <span className="text-sm text-secondary-foreground mb-1.5">
            We've emailed a 6-digit confirmation code.
            Please enter the code in the box below to verify your email.
          </span>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-1.5">
        {codeInputs.map((value, index) => (
          <Input
            key={index}
            type="text"
            inputMode="numeric"
            maxLength={1}
            className="size-10 shrink-0 px-0 text-center"
            value={value}
            ref={el => inputRefs.current[index] = el as HTMLInputElement}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onChange={e => handleInputChange(index, e.target.value)}
            autoFocus={index === 0}
          />
        ))}
      </div>

      <div className="flex items-center justify-center mb-2">
        <span className="text-sm text-secondary-foreground me-1.5">
          Didn’t receive a code? 
          {/* (37s) */}
        </span>
        <Link to="/auth/verify-otp" className="font-semibold text-foreground hover:text-primary">
          Resend
        </Link>
      </div>

      <Button className="grow" type="submit">Continue</Button>

      <Link to="/auth/signin" className="gap-2.5 flex items-center justify-center text-sm font-semibold text-foreground hover:text-primary">
        <MoveLeft className="size-3.5 opacity-70" />
        Back to Login
      </Link>
    </form>
  );
};

export { VerifyOTP };

