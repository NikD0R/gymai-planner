import { Dumbbell, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/Button";
import { useAuth } from "../../context/AuthContext";
import { UserButton } from "@neondatabase/neon-js/auth/react";
import { useState } from "react";

export default function Navbar() {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--color-border)] bg-background/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-foreground"
          onClick={closeMenu}
        >
          <Dumbbell className="h-6 w-6 text-accent" />
          <span className="font-semibold text-lg">GymAI</span>
        </Link>

        <nav className="hidden max-[500px]:hidden min-[501px]:flex items-center gap-4">
          {user ? (
            <>
              <Link to="/profile">
                <Button
                  variant="ghost"
                  size="sm"
                >
                  My Plan
                </Button>
              </Link>
              <UserButton className="cursor-pointer bg-accent text-black hover:bg-accent/90" />
            </>
          ) : (
            <>
              <Link to="/auth/sign-in">
                <Button
                  variant="ghost"
                  size="sm"
                >
                  Sign In
                </Button>
              </Link>
              <Link to="/auth/sign-up">
                <Button size="sm">Sign Up</Button>
              </Link>
            </>
          )}
        </nav>

        <button
          className="min-[501px]:hidden p-2 text-foreground focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {isMenuOpen && (
        <div className="min-[501px]:hidden absolute top-16 left-0 w-full bg-background border-b border-[var(--color-border)] shadow-lg py-4 px-6 flex flex-col gap-4 animate-in slide-in-from-top-2 duration-200">
          {user ? (
            <>
              <Link
                to="/profile"
                onClick={closeMenu}
                className="w-full"
              >
                <Button
                  variant="ghost"
                  className="w-full justify-center"
                >
                  My Plan
                </Button>
              </Link>
              <div className="pt-4 border-t border-[var(--color-border)] flex justify-center">
                <UserButton className="cursor-pointer bg-accent text-black hover:bg-accent/90" />
              </div>
            </>
          ) : (
            <>
              <Link
                to="/auth/sign-in"
                onClick={closeMenu}
                className="w-full"
              >
                <Button
                  variant="ghost"
                  className="w-full justify-center"
                >
                  Sign In
                </Button>
              </Link>
              <Link
                to="/auth/sign-up"
                onClick={closeMenu}
                className="w-full"
              >
                <Button className="w-full justify-center">Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
