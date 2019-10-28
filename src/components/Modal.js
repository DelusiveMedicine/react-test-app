import React from "react";
import { Modal, Button } from "react-bootstrap";
import CustomerForm from "./CustomerList/CustomerForm";
import ProductForm from "./ProductList/ProductForm";
import InvoiceForm from "./InvoiceList/InvoiceForm";

export default function ModalForm(props) {
  let form = <ProductForm {...props} />;
  // if(props.target.customer)form = <CustomerForm {...props}/>;
  // if(props.target.invoice)form = <InvoiceForm {...props}/>;

  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant='outline-secondary' onClick={handleShow}>
        {props.button}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{form}</Modal.Body>
      </Modal>
    </>
  );
}
