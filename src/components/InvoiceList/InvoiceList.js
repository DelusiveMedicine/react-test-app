import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Container, Row, Col, Table} from 'react-bootstrap';
import Invoice from './Invoice';
import Loading from '../Loading';
import {getInvoices, getCustomers} from '../../AC';

class InvoiceList extends React.Component {

    constructor(props){
        super(props);
        this.createTitle = 'Create a new invoice';
        this.createButton = 'Create';
        this.target = {
            invoice: true,
            product: false,
            customer: false
        }
    }

    componentWillMount(){
        const {getInvoices, getCustomers} = this.props;
        getCustomers();
        getInvoices();
    }

    render(){
        const {invoices, customers} = this.props;

        if (invoices.loading || customers.loading) return <Loading />;
        let invoiceList = [];
        if(invoices.data.length)
        invoices.data.forEach(invoice => {
            customers.data.find( customer => {
            if(customer.id === invoice.customer_id) invoiceList.push({...invoice, name: customer.name});
            })
        });
        invoiceList = invoiceList.map((invoice, idx) =>
        <Invoice key={invoice.id} idx={idx + 1} invoice={invoice}/>);
        return (
            <Container>
            <Row className="align-items-center">
            <Col lg={3}>
            <h2>Invoice List</h2>
            </Col><Col>
            <Link className="nav-link" activeStyle={{ color: 'grey' }} to={{
                pathname:'/invoices',
                state: {title: this.createTitle}
                }}>{this.createButton}</Link>           
            </Col>
            </Row>
            <Row>
            <Col>
            <Table responsive>
            <thead>
            <tr>
               <th>#</th>
               <th>Customer</th>
               <th>Discount</th>
               <th>Total</th>
               <th></th>
            </tr>
            </thead>
            <tbody>{invoiceList}</tbody>
            </Table>
            </Col>
            </Row>
             </Container>
        )
    }
}

export default connect((state) => ({
    invoices: state.invoices,
    customers: state.customers
}), { getInvoices, getCustomers })(InvoiceList);