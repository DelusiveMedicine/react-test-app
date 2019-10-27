import React from 'react';
import {connect} from 'react-redux';
import { getInvoiceItems } from '../../AC';
import {Link} from 'react-router-dom';

class Invoice extends React.Component {
    constructor(props){
        super(props)
        this.editTitle = 'Edit your invoice';
        this.editButton = 'Edit';
    }

    componentDidMount(){
        const {getInvoiceItems, invoice} = this.props;
        getInvoiceItems(invoice.id);
    }

    render(){
        const {invoice, idx} = this.props;
        return (
            <tr>
            <td>{idx}</td><td>{invoice.name}</td><td>{invoice.discount}</td><td>{invoice.total}</td>
            <td><Link className="nav-link" activeStyle={{ color: 'grey' }} to={{
                pathname:`invoices/${invoice.id}/edit`,
                state: {invoice, idx, title: this.editTitle}
                }}>{this.editButton}</Link>
            </td>           
            </tr>
        )
    }
}

export default connect((state) => ({

    invoiceItems: state.invoiceItems
}), { getInvoiceItems })(Invoice);