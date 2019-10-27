import React from 'react';
import {connect} from 'react-redux';
import {Modal, Button, Col} from 'react-bootstrap';
import {deleteCustomer, deleteProduct, deleteInvoice} from '../AC';

function DeleteButton(props) {
    const {deleteCustomer, deleteProduct, deleteInvoice} = props;

    const [show, setShow] = React.useState(false);
    const handleDelete = () => {
        const {target, location, history} = props;
        if(target){
            if(target.customer) return deleteCustomer(props.data.id);
            if(target.product) return deleteProduct(props.data.id);
        } 
        if(location.state.invoice) {
            deleteInvoice(location.state.invoice.id); 
            return history.push({pathname: '/'})
        };

    };
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
        return (
            <>
            <Button onClick={handleShow} type="button">Delete</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure?</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Are you sure you want to delete this item?</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button type="button" onClick={handleDelete} variant="secondary">Yes</Button>
                    <Button onClick={handleClose} variant="outline-secondary">No</Button>
                </Modal.Footer>
                </Modal>
            </>
        )
    }

export default connect((state) => ({
    customer: state.customer, 
    product: state.product,
    invoice: state.invoice
}), {deleteCustomer, deleteProduct, deleteInvoice})(DeleteButton)