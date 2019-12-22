import React, { useMemo, useState, useEffect } from "react";

import { userService } from "../service";
import User from "../models/user";
import { Observable, combineLatest } from "rxjs";

export const useCurrUser = () => {
  const [loaded, setLoaded] = useState(false);
  const [authenticated, setAuthenticated] = useState<boolean | undefined>();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const s = combineLatest(
      userService.getAuthenticated(),
      userService.getUser()
    ).subscribe((res) => {
      const [a, u] = res as any;
      setAuthenticated(a);
      setUser(u);
      setLoaded(true);
    });

    return () => s.unsubscribe();
  }, []);

  return { loaded, authenticated, user };
};
