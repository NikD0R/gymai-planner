import { AuthView } from "@neondatabase/neon-js/auth/react";
import { useParams } from "react-router-dom";

export default function Auth() {
  const { pathname } = useParams();
  return (
    <div className="min-h-screen pt-24 pb-12 px-6 flex items-center justify-center">
      <div className="max-w-md w-full">
        <AuthView
          pathname={pathname}
          className={`
            text-foreground neon-custom-form 
            [&_button:not([type='submit'])]:cursor-pointer 
            [&_button:not([type='submit'])]:hover:text-foreground/80!

            max-[360px]:[&_div:has(label)]:flex-col
            max-[360px]:[&_div:has(label)]:items-start

            max-[360px]:[&_div:has(label)>a]:mt-1.5
            max-[360px]:[&_div:has(label)>button]:mt-1.5
          `}
        />
      </div>
    </div>
  );
}
