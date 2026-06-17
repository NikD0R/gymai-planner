import { AccountView } from "@neondatabase/neon-js/auth/react";
import { useParams } from "react-router-dom";

export default function Account() {
  const { pathname } = useParams();
  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-4xl mx-auto">
        <AccountView
          pathname={pathname}
          className={`
            text-foreground neon-custom-form 
            [&_button]:cursor-pointer 
            [&_button]:transition-colors
            [&_button]:hover:text-foreground/90

            [&_div[data-slot='card-content']]:!min-w-0
            [&_div[data-slot='card']]:!flex-wrap
            [&_div[data-slot='card']]:!w-full
            
            [&_div[data-slot='card']>div]:!min-w-0
            
            [&_button:hover_svg]:!text-black
            [&_button:hover_svg_*]:!stroke-black
            [&_button:hover_svg_*]:!fill-black
          `}
        />
      </div>
    </div>
  );
}
