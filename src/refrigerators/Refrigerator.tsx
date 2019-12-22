import React, { useState, useCallback } from "react";
import { RouteComponentProps } from "react-router-dom";

import { Container, Row, Col, Button } from "react-bootstrap";

import { Link } from "react-router-dom";
import { useRefrigerator } from "../hooks";
import { ProductsList, AddProduct } from "../products";

const useMvvm = () => {
  const [showAddRefrigerator, setShowAddRefrigerator] = useState(false);

  const onAddProductClick = useCallback(() => setShowAddRefrigerator(true), []);

  const closeAddProduct = useCallback(() => setShowAddRefrigerator(false), []);

  return { showAddRefrigerator, onAddProductClick, closeAddProduct };
};

export const RefrigeratorComponent = (
  props: RouteComponentProps<{ refId: string }>
) => {
  const { refId } = props.match.params;
  const { refrigerator } = useRefrigerator(refId);
  const { showAddRefrigerator, onAddProductClick, closeAddProduct } = useMvvm();

  if (!refrigerator) {
    return null;
  }

  const { name } = refrigerator;

  return (
    <Container>
      <Row>
        <Col sm="1">
          <Link to="/home">
            <Button size="sm" variant="link">
              Back
            </Button>
          </Link>
        </Col>
        <Col>
          <h1>
            {name} <small>refrigerator</small>
          </h1>
          <hr />

          <Container>
            <Row>
              <Col className="d-flex align-items-center">
                <h3>Products</h3>
                <Button size="sm" onClick={onAddProductClick} className="ml-3">
                  Add product
                </Button>
              </Col>
            </Row>
            <Row>
              <ProductsList
                wrapper={(key, prod) => (
                  <Col className="mt-3" key={key} xs="3">
                    {prod}
                  </Col>
                )}
                refId={refId}
                onAdd={onAddProductClick}
              ></ProductsList>
            </Row>
          </Container>
        </Col>
      </Row>
      <AddProduct
        refId={refId}
        show={showAddRefrigerator}
        onClose={closeAddProduct}
      ></AddProduct>
    </Container>
  );
};
