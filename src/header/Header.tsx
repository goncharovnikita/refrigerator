import React, { useCallback } from "react";

import { Navbar } from "react-bootstrap";
import { useCurrUser } from "../hooks";
import { userService } from '../service';

export default () => {
  const logout = useCallback(userService.logout, []);
  const { user } = useCurrUser();

  return (
    <Navbar bg="light" expand="lg" className="justify-content-between">
      <a href="/" className="navbar-brand">
        Refrigerator control
      </a>
      {user && (
        <span className=" navbar-text">
          Добро пожаловать, {user.displayName}!{" "}
          <span className="ml-4" onClick={logout}>
            Выйти
          </span>
        </span>
      )}
    </Navbar>
  );
};
