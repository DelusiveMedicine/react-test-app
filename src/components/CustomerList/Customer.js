import React from 'react';
import Modal from '../Modal';

class Customer extends React.Component {
    constructor(props){
        super(props)
        this.editTitle = 'Edit your customer';
        this.editButton = 'Edit';
        this.target = {
            product: false,
            customer: true
        }
    }

    render(){
        const {customer, idx} = this.props;
        return (
            <tr>
            <td>{idx}</td><td>{customer.name}</td><td>{customer.address}</td><td>{customer.phone}</td>
            <td><Modal data={customer} target={this.target} title={this.editTitle} button={this.editButton}/></td>
            </tr>
        )
    }
}

export default Customer;