"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface AuthGuardProps {
  children: React.ReactNode;
}

const AUTH_KEY = "valentine-auth";

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(AUTH_KEY) === "true";
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace("/");
    }
    // Only runs on client
  }, [router]);

  return <>{children}</>;
};

export default AuthGuard;
export { AUTH_KEY };
