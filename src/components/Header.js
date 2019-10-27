import React from 'react';
import {NavLink, Switch, Route, Router} from 'react-router-dom';
import {ConnectedRouter} from 'react-router-redux';
import history from '../history';
import {Container, Row, Col, Navbar, Nav} from 'react-bootstrap';
import InvoiceList from './InvoiceList/InvoiceList';
import CustomerList from './CustomerList/CustomerList';
import ProductList from './ProductList/ProductList';
import InvoiceForm from './InvoiceList/InvoiceForm';

class Header extends React.Component {

    render(){
        return (
            <Router history={history}>
                <Container>
                <Row className="justify-content-lg-center">
                    <Col>
                    <Navbar bg="light" expand="lg">
                    <NavLink className="navbar-brand" activeStyle={{ color: 'grey' }} to="/">Invoice App</NavLink>
                    <Nav className="mr-auto nav-link" activeStyle={{ color: 'grey' }}>
                <NavLink className="nav-link" activeStyle={{ color: 'grey' }} to="/invoices">Invoices</NavLink>
                <NavLink className="nav-link" activeStyle={{ color: 'grey' }} to="/products">Products</NavLink>
                <NavLink className="nav-link" activeStyle={{ color: 'grey' }} to="/customers">Customers</NavLink>
                </Nav>
                </Navbar>                 
                    <Switch>
                    <Route exact path="/" component={InvoiceList} />
                    <Route path="/invoices" component={InvoiceForm}/>
                    <Route path="/invoices/:id/edit" component={InvoiceForm}/>
                    <Route path="/products" component={ProductList}/>
                    <Route path="/customers" component={CustomerList}/>
                    </Switch> 
                    </Col>
                    </Row>
                    </Container>           
            </Router>

        )
    }
}

export default Header