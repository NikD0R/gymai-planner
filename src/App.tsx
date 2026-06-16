import { BrowserRouter, Routes, Route } from "react-router-dom";
import Account from "./pages/Account";
import Auth from "./pages/Auth";
import OnBoarding from "./pages/OnBoarding";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Navbar from "./components/layout/Navbar";
import { NeonAuthUIProvider } from "@neondatabase/neon-js/auth/react";
import { authClient } from "./lib/auth";
import AuthProvider from "./context/AuthContext";

function App() {
  return (
    <NeonAuthUIProvider
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      authClient={authClient as any}
      defaultTheme="dark"
    >
      <AuthProvider>
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route
                  path="/"
                  element={<Home />}
                />
                <Route
                  path="/onboarding"
                  element={<OnBoarding />}
                />
                <Route
                  path="/auth/:pathname"
                  element={<Auth />}
                />
                <Route
                  path="/account/:pathname"
                  element={<Account />}
                />
                <Route
                  path="/profile"
                  element={<Profile />}
                />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </NeonAuthUIProvider>
  );
}

export default App;
