import React from "react";

import { useRefrigeratorsList } from "../hooks";
import { Link } from "react-router-dom";
import { ListGroup } from "react-bootstrap";
import styled from "styled-components";

const LinkWrapper = styled(Link)`
  padding: 0.75rem 1.25rem;
  display: block;
`;

function ListItem({ item: { id, name } }) {
  const url = `/home/r/${id}`;
  return (
    <ListGroup.Item className="p-0">
      <LinkWrapper to={url}>
        {name}
      </LinkWrapper>
    </ListGroup.Item>
  );
}

export const RefrigeratorsList = () => {
  const { refrigerators } = useRefrigeratorsList();

  return (
    <ListGroup>
      {refrigerators.map(ref => (
        <ListItem key={ref.id} item={ref} />
      ))}
    </ListGroup>
  );
};
