import React, { useState, useCallback } from "react";

import { Card } from "react-bootstrap";
import { refrigeratorsService } from "../service";
import { useCurrUser } from "../hooks";

export const AddRefrigerator = () => {
  const { user } = useCurrUser();
  const [name, setName] = useState("");

  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      if (user) {
        refrigeratorsService.createRefrigeratorByName(user.uid, name);
        setName("");
      }
    },
    [name, user]
  );

  return (
    <Card>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Название"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </form>
    </Card>
  );
};
