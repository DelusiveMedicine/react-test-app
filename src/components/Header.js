import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

const Header = () => (
  <Navbar bg='light' expand='lg'>
    <NavLink className='navbar-brand' activeStyle={{ color: "grey" }} to='/'>
      Invoice App
    </NavLink>
    <Nav className='mr-auto nav-link' activeStyle={{ color: "grey" }}>
      <NavLink
        className='nav-link'
        activeStyle={{ color: "grey" }}
        to='/invoices'>
        Invoices
      </NavLink>
      <NavLink
        className='nav-link'
        activeStyle={{ color: "grey" }}
        to='/products'>
        Products
      </NavLink>
      <NavLink
        className='nav-link'
        activeStyle={{ color: "grey" }}
        to='/customers'>
        Customers
      </NavLink>
    </Nav>
  </Navbar>
);

export default Header;
