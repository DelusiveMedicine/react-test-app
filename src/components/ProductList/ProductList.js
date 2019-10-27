import React from 'react';
import {connect} from 'react-redux';
import {Container, Row, Col, Table} from 'react-bootstrap';
import Product from './Product';
import Loading from '../Loading';
import {getProducts} from '../../AC';
import Modal from '../Modal';

class ProductList extends React.Component {
    
    constructor(props){
        super(props);
        this.createTitle = 'Create a new product';
        this.createButton = 'Create';
        this.target = {
            product: true,
            customer: false,
            invoice: false
        }
    }
    
    componentWillMount(){
        const {getProducts} = this.props;
        getProducts();
    }

    render(){
        const {products} = this.props;
        if (products.loading) return <Loading />;
        let productList;
        if(products.data.length){productList = products.data.map((product, idx) => <Product key={product.id} idx={idx + 1} product={product}/>)};
        
        return (
            <Container>
            <Row className="align-items-center">
            <Col lg={3}>
            <h2>Product List</h2>
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
               <th>Price</th>
               <th></th>
               </tr>
            </thead>
            <tbody>{productList}</tbody>
            </Table>
            </Col>
            </Row>
            </Container>
        )
    }
}


export default connect((state) => ({
    products: state.products
}), { getProducts })(ProductList);