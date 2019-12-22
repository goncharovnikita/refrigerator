import React, { PropsWithChildren } from "react";

import { useCurrUser } from "../hooks";
import { Redirect } from "react-router-dom";

interface Props {
  only?: "authenticated" | "unauthenticated";
  redirect?: string;
}

export default (props: PropsWithChildren<Props>) => {
  const { only = "authenticated", redirect, children } = props;
  const { loaded, authenticated } = useCurrUser();

  if (!loaded) {
    return null;
  }

  if (only === "authenticated") {
    return (
      (authenticated && <>{ children }</>) ||
      (redirect && <Redirect to={redirect} />) ||
      null
    );
  }

  return (
    (!authenticated && <>{ children }</>) ||
    (redirect && <Redirect to={redirect} />) ||
    null
  );
};
