import React from 'react';
import {connect} from 'react-redux';
import {Container, Row, Col} from 'react-bootstrap';
import {Table} from 'react-bootstrap';
import Customer from './Customer';
import Loading from '../Loading';
import {getCustomers} from '../../AC';
import Modal from '../Modal';

class CustomerList extends React.Component {
    constructor(props){
        super(props);
        this.createTitle = 'Create a new customer';
        this.createButton = 'Create';
        this.target = {
            product: false,
            customer: true,
            invoice: false
        }
    }

    componentWillMount(){
        const {getCustomers} = this.props;
        getCustomers();
        
    }

    render(){
        console.log('customer list props', this.props)
        const {customers} = this.props;
        if (customers.loading) return <Loading />;
        let customersList;
        if(customers.data.length){customersList = customers.data.map((customer, idx) => <Customer  key={customer.id} idx={idx + 1} customer={customer}/>)};
        
        return (
            <Container>
            <Row className="align-items-center">
                <Col lg={3}>
            <h2>Customer List</h2>
            </Col><Col>
            <Modal button={this.createButton} title={this.createTitle} target={this.target}/>
            </Col>
            </Row>
            <Row>
            <Col>
            <Table responsive>
            <thead>
            <tr>
               <th>#</th>
               <th>Name</th>
               <th>Address</th>
               <th>Phone</th>
               <th></th>
               </tr>
            </thead>
            <tbody>{customersList}</tbody>
            </Table>
            </Col>
            </Row>
            </Container>
        )
    }
}


export default connect((state) => ({
    customers: state.customers
}), { getCustomers })(CustomerList);