import React from "react";

import { Container, Row, Col } from "react-bootstrap";

import { RefrigeratorsList, AddRefrigerator } from "../refrigerators";

export default () => {
  return (
    <Container>
      <Row>
        <Col>
          <h1>Home</h1>
        </Col>
      </Row>
      <Row>
        <Col><h3>Refrigerators list</h3></Col>
        <Col><h3>Add refrigerator</h3></Col>
      </Row>
      <Row>
        <Col lg={4}>
          <RefrigeratorsList />
        </Col>
        <Col lg={4}>
          <AddRefrigerator />
        </Col>
      </Row>
    </Container>
  );
};
