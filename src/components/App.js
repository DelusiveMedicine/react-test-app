import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route } from "react-router-dom";
import InvoiceList from "./InvoiceList/InvoiceList";
import CustomerList from "./CustomerList/CustomerList";
import ProductList from "./ProductList/ProductList";
import InvoiceForm from "./InvoiceList/InvoiceForm";
import Header from "./Header";
import { Container } from "react-bootstrap";

const App = () => (
  <Container>
    <Header />
    <Switch>
      <Route exact path='/' component={InvoiceList} />
      <Route path='/invoices' component={InvoiceForm} />
      <Route path='/invoices/:id/edit' component={InvoiceForm} />
      <Route path='/products' component={ProductList} />
      <Route path='/customers' component={CustomerList} />
    </Switch>
  </Container>
);

export default App;
