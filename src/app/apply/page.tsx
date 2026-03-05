'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ApplyIndexPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect user to home to select a scheme
    router.replace("/");
  }, [router]);

  return null;
}