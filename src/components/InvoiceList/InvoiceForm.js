import React from 'react';
import {connect} from 'react-redux';
import {Container, Row, Col, Form, Button} from 'react-bootstrap';
import { getCustomers, getProducts, createInvoice, editInvoice, getInvoiceItems } from '../../AC';
import Loading from '../Loading';
import {ProductTable} from './ProductTable';

class InvoiceForm extends React.Component {

  constructor(props){
    super(props);
    this.newProduct = null;
    this.productSelection = [];

    this.state = {
      isOpen: false,
      discount: 0,
      targetCustomer: 'Select...',
      targetCustomerId: null
    }
  }

componentWillMount(){
  const { location, getCustomers, getProducts } = this.props;
  getCustomers();
  getProducts();
  const state = location.state;
  if(state && state.invoice){
    this.setState({isOpen: true, discount: state.invoice.discount, targetCustomer: state.invoice.name, 
      targetCustomerId: state.invoice.customer_id});
    }
}

handleAdd = () => {
  if(!this.newProduct || !this.state.targetCustomerId) return;
  this.productSelection.push(this.newProduct);
  this.setState({isOpen: true});
}

getDiscount = event => {
  this.setState({discount: Number(event.target.value)})
}

handleChange = event => {
  const {products} = this.props;
  this.newProduct = products.data.find(product => product.name === event.target.value);  
}

getCustomer = event => {
  const {customers} = this.props;
  customers.data.find(customer => customer.name === event.target.value ? 
    this.state.targetCustomerId = customer.id : this.state.targetCustomerId = null); 
}

  render() {
    const {customers, products, location, invoiceItems} = this.props;
    const {isOpen, targetCustomer, targetCustomerId} = this.state;

    const state = location.state;
    const title = state ? state.title : 'Create a new invoice';
    let customerList,
        productList;

    if(invoiceItems.loading || products.loading || customers.loading) return <Loading />;

    customerList = customers.data.map(customer => customer.name !== targetCustomer ? <option>{customer.name}</option> : '');
    
    productList = products.data.map(product => <option>{product.name}</option>);

    return (
      <Container>
      <Row className="align-items-center">
      <Col>
      <h2>{title}</h2>
      </Col>
      </Row>
      <Form>
        <Form.Row>
          <Form.Group as={Col} md="2">
            <Form.Label>Discount (%)</Form.Label>
            <Form.Control
              onChange={this.getDiscount}
              defaultValue = {this.state.discount}
              type="number"
            />
          </Form.Group>
          </Form.Row>
          <Form.Row>
        <Form.Group as={Col} md="4">
    <Form.Label>Customer</Form.Label>
    <Form.Control as="select" onChange={this.getCustomer}>
      <option>{targetCustomer}</option>
      {customerList}
    </Form.Control>
  </Form.Group>
  </Form.Row>
  <Form.Row className="align-items-end">
  <Form.Group as={Col} md="3">
    <Form.Label>Add product</Form.Label>
    <Form.Control as="select" onChange={this.handleChange}>
      <option>Select...</option>
      {productList}
    </Form.Control>
  </Form.Group>
  <Form.Group as={Col}>
  <Button type="button" variant="outline-secondary" onClick={this.handleAdd}>Add</Button>
  </Form.Group>
  </Form.Row>
  {isOpen ? <ProductTable {...this.props} data={this.productSelection} id={targetCustomerId} discount={this.state.discount}/> : ''}
      </Form>
      </Container>
    )
  }
}

export default connect((state) => ({
    customers: state.customers,
    products: state.products,
    invoices: state.invoices,
    invoiceItems: state.invoiceItems
}), { getCustomers, getProducts, createInvoice, editInvoice, getInvoiceItems })(InvoiceForm);