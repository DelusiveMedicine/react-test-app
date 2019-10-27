import React from 'react';
import Modal from '../Modal';

class Product extends React.Component {
    constructor(props){
        super(props)
        this.editTitle = 'Edit your product';
        this.editButton = 'Edit';
        this.target = {
            product: true,
            customer: false
        }
    }

    render(){
        const {product, idx} = this.props;
        
        return (
            <tr>
            <td>{idx}</td><td>{product.name}</td><td>{product.price}</td>
            <td><Modal data={product} target={this.target} button={this.editButton} title={this.editTitle}/></td>
            </tr>
        )
    }
}

export default Product;