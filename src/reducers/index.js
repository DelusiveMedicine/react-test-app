import {combineReducers} from 'redux';
import customerHandler from './customers';
import productHandler from './products';
import invoiceHandler from './invoices';
import invoiceItemsHandler from './invoiceItems';

export default combineReducers({
customers: customerHandler,
products: productHandler,
invoices: invoiceHandler,
invoiceItems: invoiceItemsHandler
})