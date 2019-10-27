import axios from 'axios';
import {START, SUCCESS, FAIL, GET_CUSTOMERS, CREATE_CUSTOMER, EDIT_CUSTOMER, DELETE_CUSTOMER, 
    GET_PRODUCTS, CREATE_PRODUCT, EDIT_PRODUCT, DELETE_PRODUCT, 
    GET_INVOICES, CREATE_INVOICE, EDIT_INVOICE, DELETE_INVOICE,
    GET_INVOICE_ITEMS, CREATE_INVOICE_ITEMS, EDIT_INVOICE_ITEMS, DELETE_INVOICE_ITEMS} from '../constants';

/* CUSTOMER ACTIONS */

export function getCustomers(){

    return (dispatch) => {
        dispatch({ type: GET_CUSTOMERS + START });
        axios.get('/api/customers').then(res => dispatch({
            type: GET_CUSTOMERS + SUCCESS,
            payload: {
                customers: res.data
            }
        })).catch(err => {
            console.log('err', err);
            dispatch({
            type: GET_CUSTOMERS + FAIL,
            payload: {
                customers: err
            }
        }) 
}
        )}
}

export function createCustomer(newCustomer){

    return (dispatch) => {

        axios.post('/api/customers', newCustomer)
            .then(res => dispatch({
                type: CREATE_CUSTOMER + SUCCESS,
                payload: {
                    customer: res.data
                }
            }))
            .catch(err => {
                console.log('err', err);
                dispatch({
                type: CREATE_CUSTOMER + FAIL,
                payload: {
                    customer: err
                }
            })
        })
            .then(dispatch(getCustomers()))
    }
    
}

export function editCustomer(customerId, editedCustomer){

    return (dispatch) => {
        axios.get('/api/customers').then(response => 
        axios.put('/api/customers/' + customerId, editedCustomer)
            .then(res => dispatch({
                type: EDIT_CUSTOMER,
                payload: {
                    customers: response.data,
                    customer: res.data
                }
            }))
            .catch(err => {
                console.log('err', err);
                dispatch({
                type: EDIT_CUSTOMER,
                payload: {
                    customer: err
                }
            })
        }))
    }
    
}

export function deleteCustomer(customerId){

    return (dispatch) => {
        axios.get('/api/customers').then(response => 
        axios.delete('/api/customers/' + customerId)
            .then(res => dispatch({
                type: DELETE_CUSTOMER,
                payload: {
                    customers: response.data,
                    customer: res.data
                }
            }))
            .catch(err => {
                console.log('err', err);
                dispatch({
                type: DELETE_CUSTOMER,
                payload: {
                    customer: err
                }
            })
        }))
            
    }
    
}

/* PRODUCT ACTIONS */

export function getProducts(){

    return (dispatch) => {
        dispatch({ type: GET_PRODUCTS + START });

        axios.get('/api/products')
        .then(res => dispatch({
            type: GET_PRODUCTS + SUCCESS,
            payload: {
                products: res.data
            }
        }))
        .catch(err => {
            console.log('err', err);
            dispatch({
            type: GET_PRODUCTS + FAIL,
            payload: {
                products: err
            }
        })
    })
    }
}

export function createProduct(newProduct){
    
    return (dispatch) => {

        axios.post('/api/products', newProduct)
            .then(res => dispatch({
                type: CREATE_PRODUCT + SUCCESS,
                payload: {
                    product: res.data
                }
            }))
            .catch(err => {
                console.log('err', err);
                dispatch({
                type: CREATE_PRODUCT + FAIL,
                payload: {
                    product: err
                }
            })
        })
        .then(dispatch(getProducts()))
    }
}

export function editProduct(productId, editedProduct){

    return (dispatch) => {
        axios.get('/api/products').then(response => 
        axios.put('/api/products/' + productId, editedProduct)
            .then(res => dispatch({
                type: EDIT_PRODUCT,
                payload: {
                    products: response.data,
                    product: res.data
                }
            }))
            .catch(err => {
                console.log('err', err);
                dispatch({
                type: EDIT_PRODUCT,
                payload: {
                    product: err
                }
            })
        })
    )}  
}

export function deleteProduct(productId){

    return (dispatch) => {
        axios.get('/api/products')
        .then(response => 
        axios.delete('/api/products/' + productId)
            .then(res => dispatch({
                type: DELETE_PRODUCT,
                payload: {
                    products: response.data,
                    product: res.data
                }
            }))
            .catch(err => {
                console.log('err', err);
                dispatch({
                type: DELETE_PRODUCT,
                payload: {
                    product: err
                }
            })
        }))
    }
    
}

/* INVOICE ACTIONS */

export function getInvoices(){

    return (dispatch) => {
        dispatch({ type: GET_INVOICES + START });

        axios.get('api/invoices')
        .then(res => {
            dispatch({
                type: GET_INVOICES + SUCCESS,
                payload: {
                    invoices: res.data
                }
            })
        })
        .catch(err => {
            console.log('err', err);
            dispatch({
            type: GET_INVOICES + FAIL,
            payload: {
                invoices: err,
            }
        })
    })
    }
}

export function createInvoice(newInvoice, newInvoiceItems){
    
    return (dispatch) => {

        axios.post('/api/invoices', newInvoice)
            .then(res => {
                dispatch({
                    type: CREATE_INVOICE + SUCCESS,
                    payload: {
                        invoice: res.data
                    }
                });

                newInvoiceItems.map( item => {
                    return dispatch(createInvoiceItems(res.data.id, item))
                })
                return
            })
            .catch(err => {
                console.log('err', err)
                return dispatch({
                type: CREATE_INVOICE + FAIL,
                payload: {
                    invoice: err
                }
            })

        })
    }
    
}

export function editInvoice(invoiceId, editedInvoice, editedInvoiceItems){

    return (dispatch) => {
        axios.get('/api/invoices').then( response =>
        axios.put('/api/invoices/' + invoiceId, editedInvoice)
            .then(res => {
                dispatch({
                type: EDIT_INVOICE,
                payload: {
                    invoices: response.data,
                    invoice: res.data
                }
            });
            editedInvoiceItems.map(item => {
                return dispatch(editInvoiceItems(invoiceId, item.id, item))
            })
            return
        })
            .catch(err => {
                console.log('err', err);
                dispatch({
                type: EDIT_INVOICE,
                payload: {
                    invoice: err
                }
            })
        }))
    }
    
}

export function deleteInvoice(invoiceId){

    return (dispatch) => {
        axios.get('/api/invoices').then(response => 
        axios.delete('/api/invoices/' + invoiceId)
            .then(res => dispatch({
                type: DELETE_INVOICE,
                payload: {
                    invoices: response.data,
                    invoice: res.data
                }
            }))
            .catch(err => {
                console.log('err', err);
                dispatch({
                type: DELETE_INVOICE,
                payload: {
                    invoice: err
                }
            })
        }))
    }
    
}

/* INVOICE ITEMS ACTIONS */

export function getInvoiceItems(id){
    
    return (dispatch) => {
        dispatch({ type: GET_INVOICE_ITEMS + START });
        axios.get(`/api/invoices/${id}/items`)
        .then(res => {
            return dispatch({
                type: GET_INVOICE_ITEMS + SUCCESS,
                payload: {
                    invoiceItems: res.data
                }
            })  
        })
        .catch(err => {
            console.log('err', err);
            dispatch({
            type: GET_INVOICE_ITEMS + FAIL,
            payload: {
                invoiceItems: err,
            }
        })
    })
    }
}

export function createInvoiceItems(id, item){
    return (dispatch) => {
  
            axios.post(`/api/invoices/${id}/items`, item)
                .then(res => dispatch({
                    type: CREATE_INVOICE_ITEMS + SUCCESS,
                    payload: {
                        invoiceItems: res.data
                    }
                }))
                .catch(err => {
                    console.log('err', err);
                    dispatch({
                    type: CREATE_INVOICE_ITEMS + FAIL,
                    payload: {
                        invoiceItems: err
                    }
                })
            })
        
    }
    
}

export function editInvoiceItems(invoice_id, id, editedInvoiceItems){

    return (dispatch) => {
        axios.get(`/api/invoices/${invoice_id}/items`).then( response => 
        axios.put(`/api/invoices/${invoice_id}/items/${id}`, editedInvoiceItems)
            .then(res => {
                console.log('working');
                dispatch({
                type: EDIT_INVOICE_ITEMS,
                payload: {
                    invoiceItems: response.data,
                    invoiceItem: res.data
                }
            })
        })
            .catch(err => {
                console.log('err', err);
                dispatch({
                type: EDIT_INVOICE_ITEMS,
                payload: {
                    invoiceItems: err
                }
            })
        })
    )
}    
}

export function deleteInvoiceItems(invoice_id, id){

    return (dispatch) => {
        axios.get('/api/invoices').then(response => 
        axios.delete(`/api/invoices/${invoice_id}/items/${id}`)
            .then(res => dispatch({
                type: DELETE_INVOICE_ITEMS,
                payload: {
                    invoices: response.data,
                    invoiceItems: res.data
                }
            }))
            .catch(err => {
                console.log('err', err);
                dispatch({
                type: DELETE_INVOICE_ITEMS,
                payload: {
                    invoiceItems: err
                }
            })
            }))
    }
    
}
