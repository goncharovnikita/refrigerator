import React, { useCallback, useState } from "react";

import { Modal, Button, Form } from "react-bootstrap";
import dayjs from "dayjs";
import { refrigeratorsService } from "../service";
import { toPlainProduct } from "../models";
import { useCurrUser } from "../hooks";

const useMvvm = (refId, onClose) => {
  const { user } = useCurrUser();
  const [validated, setValidated] = useState(false);
  const [name, setName] = useState("");
  const [shelfLife, setShelfLife] = useState(dayjs().format("YYYY-MM-DD"));

  const resetForm = useCallback(() => {
    setName("");
    setShelfLife(dayjs().format("YYYY-MM-DD"));
    setValidated(false);
  }, []);

  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      setValidated(true);
      const form = e.currentTarget;
      if (!form.checkValidity()) {
        return;
      }

      if (!user) return;

      refrigeratorsService.createProduct(
        user.uid,
        refId,
        toPlainProduct({ name, shelfLife })
      );
      resetForm();
      onClose();
    },
    [name, onClose, refId, resetForm, shelfLife, user]
  );

  return {
    validated,
    setValidated,
    onSubmit,
    name,
    shelfLife,
    setName,
    setShelfLife
  };
};

export const AddProduct = ({ refId, show, onClose }) => {
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const {
    validated,
    onSubmit,
    name,
    shelfLife,
    setName,
    setShelfLife
  } = useMvvm(refId, onClose);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add product</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit} validated={validated} noValidate>
        <Modal.Body>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name of product"
              required
              minLength={3}
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Product name should be at least 3 characters long
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Shelf life</Form.Label>
            <Form.Control
              required
              min={dayjs().format("YYYY-MM-DD")}
              type="date"
              placeholder="Shelf life"
              value={shelfLife}
              onChange={e => setShelfLife(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Choose product shelf life
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Add product
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
