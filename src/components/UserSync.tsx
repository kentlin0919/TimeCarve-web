"use client";

import { useEffect, useRef } from "react";
import { useUserStore } from "@/lib/store/userStore";
import { User } from "@/lib/domain/auth/repository";

export default function UserSync({ user }: { user: User | null }) {
  const setUser = useUserStore((state) => state.setUser);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current || user) {
      setUser(user);
      initialized.current = true;
    }
  }, [user, setUser]);

  return null;
}
