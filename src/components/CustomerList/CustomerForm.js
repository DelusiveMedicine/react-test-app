import React from 'react';
import {connect} from 'react-redux';
import { Form, Button, Col } from 'react-bootstrap';
import { createCustomer, editCustomer } from '../../AC';
import {changeHandler} from '../../helpers';
import DeleteButton from '../DeleteButton';

function CustomerForm(props) {
  let deleteButton;
  if(props.button === 'Edit') deleteButton = <DeleteButton {...props}/>;
  
  const defaultName = props.data ? props.data.name : '';
  const defaultAddress = props.data ? props.data.address : '';
  const defaultPhone = props.data ? props.data.phone : '';

    const [validated, setValidated] = React.useState(false);   

    let newCustomer = {};
    
    const handleChange = event => changeHandler(event, newCustomer);

    const handleSubmit = event => {
      const form = event.target.parentNode.parentNode;
      if (form.checkValidity()) {
        const { createCustomer, editCustomer } = props;
        if(props.data) return editCustomer(props.data.id, newCustomer);
        return createCustomer(newCustomer);
      }
      setValidated(true);
      event.stopPropagation();
    } 
    

    return (
      <Form noValidate validated={validated}>
        <Form.Row>
          <Form.Group as={Col} controlId="validationCustom01">
            <Form.Label>First and Last name</Form.Label>
            <Form.Control
              defaultValue = {defaultName}
              required
              type="text"
              placeholder="Name"
              onChange={handleChange}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <Form.Row>
        <Form.Group as={Col} md="6" controlId="validationCustom02">
            <Form.Label>Address</Form.Label>
            <Form.Control defaultValue = {defaultAddress} onChange={handleChange} type="text" placeholder="Address" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid address.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom03">
            <Form.Label>Phone</Form.Label>
            <Form.Control defaultValue = {defaultPhone} onChange={handleChange} type="text" placeholder="Phone" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid phone number.
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <Form.Row className="justify-content-between">
        <Button onClick={handleSubmit} type="button">Submit</Button>
        {deleteButton}
        </Form.Row>
      </Form>
    );
  }

  export default connect((state) => ({
    customer: state.customer
}), { editCustomer, createCustomer })(CustomerForm);