import React from 'react';
import {Container, Row, Form, Table, Col, Button} from 'react-bootstrap';
import DeleteButton from '../DeleteButton';

export class ProductTable extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isOpen: false,
            items: this.props.data,
            total: 0,
            invoiceItemsTrigger: true
        }    
    }

componentWillMount()    {
    console.log('product table props', this.props)
    const { location, invoiceItems, products, data } = this.props;

if(location.state && location.state.invoice)this.setState({isOpen: true});
let itemsList;
if(invoiceItems.data.length && !products.loading && !data.length && this.state.invoiceItemsTrigger){
    itemsList = invoiceItems.data.map(item => products.data.find( product => product.id === item.product_id ? product : null));
    this.setState({items: itemsList, invoiceItemsTrigger: false});
    }
}

quantityHandler = (quantity, id) => {
    const newArr = this.state.items.map(item => item.id === id ? 
        {...item, quantity: quantity, multiplied: item.price * quantity} : item);
    this.setState({items: newArr});
}

    render() {

const { isOpen, items, total } = this.state;
const { location } = this.props;

    let productList = items.map(product => (<tr key={product.id}><td>{product.name}</td>
    <td>{product.multiplied || product.price}</td>
        <td><Form.Group as={Col} lg="4" >
            <Form.Control onChange={event => this.quantityHandler(Number(event.target.value), product.id)} 
            defaultValue = {1} type="number"/></Form.Group></td></tr>));

            if(items.length < this.props.data.length){
                for (let item of items){
                    const missingItem = this.props.data.filter(product => item.id !== product.id ? product : null)
                    this.setState({items: items.concat(missingItem)})
                    }
                }

                let totalCount = items.reduce((acc, num) => acc + (num.multiplied || num.price), 0);
                if(this.props.discount)totalCount -= (totalCount/100*this.props.discount).toFixed(2);
                if(total !== totalCount){
                    this.setState({total: totalCount});
                } 

    let newInvoice = {};
    newInvoice.customer_id = this.props.id
    newInvoice.discount = this.props.discount
    newInvoice.total = total

    const handleSubmit = () => {
        const { createInvoice, editInvoice, history, invoiceItems} = this.props;
        if(location.state && location.state.invoice) {
            const newInvoiceItems = invoiceItems.data.map(invoiceItem => {
                let obj = this.state.items.find(item => item.id === invoiceItem.product_id);
                return {...obj, id: invoiceItem.id}
            })

            return editInvoice(location.state.invoice.id, newInvoice, newInvoiceItems)};

            const newInvoiceItems = this.state.items.map(item => ({product_id: item.id, quantity: item.quantity || 1}));
        createInvoice(newInvoice, newInvoiceItems);
        history.push({pathname: '/'})
    };

    return (   
        <Container>    
            <Row className="justify-content-between">
    <Table responsive>
    <thead><tr><th>Name</th><th>Price</th><th>Qty</th></tr></thead>
    <tbody>{productList}</tbody>
    </Table>
    <Col>
    <h3>Total: {total}</h3>
    </Col>
    <Row>
    <Col>
    <Button type="button" onClick={handleSubmit}>Submit</Button>
    </Col>
    <Col>
    {isOpen ? <DeleteButton {...this.props}/> : ''}
    </Col>
    </Row>
    </Row> 
    </Container>
    )}
}