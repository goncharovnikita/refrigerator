import React from "react";

import { useRefrigeratorProducts } from "../hooks";
import { Alert, Card, Button, Jumbotron } from "react-bootstrap";

function Product({ product }) {
  const { name, shelfLife } = product;

  return (
    <Card>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>Shelf life due to: {shelfLife}</Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

interface Props {
  refId: string;
  onAdd?(): void;
  wrapper?(key: string, children): any;
}

export const ProductsList = (props: Props) => {
  const { refId, onAdd, wrapper = (key, children) => children } = props;
  const { products } = useRefrigeratorProducts(refId);

  if (products.length === 0) {
    return (
      <Jumbotron className="w-100">
        <h3>No products in this refrigerator</h3>
        <p>Try to add some products or delete refrigerator</p>
        {onAdd && <Button onClick={onAdd}>Add product</Button>}
      </Jumbotron>
    );
  }

  return (
    <>
      {products.map(prod =>
        wrapper(prod.id, <Product key={prod.id} product={prod} />)
      )}
    </>
  );
};
