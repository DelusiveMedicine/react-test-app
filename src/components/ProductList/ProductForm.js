import React from 'react';
import {connect} from 'react-redux';
import { Form, Button, Col } from 'react-bootstrap';
import { createProduct, editProduct } from '../../AC';
import {changeHandler} from '../../helpers';
import DeleteButton from '../DeleteButton';

export function ProductForm(props) {
  
    let deleteButton;
    if(props.button === 'Edit') deleteButton = <DeleteButton {...props}/>;

    const defaultName = props.data ? props.data.name : '';
    const defaultPrice = props.data ? props.data.price : '';

    const [validated, setValidated] = React.useState(false);
    
    let newProduct = {};

    const handleChange = event => changeHandler(event, newProduct);

    const handleSubmit = event => {
      const form = event.target.parentNode.parentNode;
      if (form.checkValidity()) {
        const { createProduct, editProduct } = props;
        if(props.data) return editProduct(props.data.id, newProduct);
        return createProduct(newProduct);
      }
      setValidated(true);
      event.stopPropagation();
    } 
    return (
      <Form noValidate validated={validated}>
        <Form.Row>
          <Form.Group as={Col} controlId="validationCustom01">
            <Form.Label>Product name</Form.Label>
            <Form.Control
              defaultValue = {defaultName}
              onChange={handleChange}
              required
              type="text"
              placeholder="Name"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom02">
            <Form.Label>Price</Form.Label>
            <Form.Control defaultValue = {defaultPrice} onChange={handleChange} type="text" placeholder="Price" required />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <Form.Row className="justify-content-between">
        <Button type="button" onClick={handleSubmit}>Submit</Button>
        {deleteButton}
        </Form.Row>
      </Form>
    );
  }

  export default connect((state) => ({
    product: state.product
}), { createProduct, editProduct })(ProductForm);