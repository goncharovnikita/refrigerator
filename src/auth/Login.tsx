import React, { useState } from "react";
import { Container, Row, Col, Jumbotron } from "react-bootstrap";
import Auth from './Auth';

interface Props {}

export default (props: Props) => {
  return (
    <Container>
      <Row>
        <Col lg={3}></Col>
        <Col lg={6}>
          <Jumbotron>
            <h3 className="text-center">
              Добро пожаловать в Refrigerator Control!
            </h3>
              <div>Авторизация: <Auth /></div>
          </Jumbotron>
        </Col>
      </Row>
    </Container>
  );
};
