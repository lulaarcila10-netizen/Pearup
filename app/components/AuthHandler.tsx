"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export function AuthHandler() {
  const router = useRouter();

  useEffect(() => {
    // Handle implicit flow: Supabase lands on homepage with tokens in hash
    const hash = window.location.hash;
    if (hash.includes("type=recovery")) {
      router.push("/reset-password");
      return;
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        router.push("/reset-password");
      }
    });
    return () => subscription.unsubscribe();
  }, [router]);

  return null;
}
