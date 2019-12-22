import { useState, useEffect } from "react";
import { Refrigerator, Product, RefrigeratorItem } from "../models";
import { useCurrUser } from "./useCurrUser";

import { refrigeratorsService } from "../service";

export const useRefrigeratorsList = () => {
  const [refrigerators, setRefrigerators] = useState<Refrigerator[]>([]);
  const { user } = useCurrUser();

  useEffect(() => {
    if (user) {
      const s = refrigeratorsService
        .getRefrigeratorsList(user.uid)
        .subscribe(setRefrigerators);

      return () => s.unsubscribe();
    }
  }, [user]);

  return { refrigerators };
};

export const useRefrigerator = (id: string) => {
  const [refrigerator, setRefrigerator] = useState<RefrigeratorItem | null>(
    null
  );
  const { user } = useCurrUser();

  useEffect(() => {
    if (user) {
      const s = refrigeratorsService
        .getRefrigerator(user.uid, id)
        .subscribe(setRefrigerator);

      return () => s.unsubscribe();
    } else {
      setRefrigerator(null);
    }
  }, [id, user]);

  return { refrigerator };
};

export const useRefrigeratorProducts = (id: string) => {

  const [products, setProducts] = useState<Product[]>(
    []
  );
  const { user } = useCurrUser();

  useEffect(() => {
    if (user) {
      const s = refrigeratorsService
        .getRefrigeratorProducts(user.uid, id)
        .subscribe(setProducts);

      return () => s.unsubscribe();
    } else {
      setProducts([]);
    }
  }, [id, user]);

  return { products };
}
