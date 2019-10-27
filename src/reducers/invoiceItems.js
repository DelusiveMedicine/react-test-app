import {START, SUCCESS, FAIL, GET_INVOICE_ITEMS, CREATE_INVOICE_ITEMS, EDIT_INVOICE_ITEMS, DELETE_INVOICE_ITEMS} from '../constants';

const initState = {
    data: [],
    loading: false,
    error: false
}

export default (invoiceItems = initState, action) => {
    const {type, payload} = action;
    console.log('invoice items', payload)
    switch(type){ 
        
        case GET_INVOICE_ITEMS + START:

        return {
            loading: true
        };

        case GET_INVOICE_ITEMS + SUCCESS:

        return {
            data: payload.invoiceItems,
            loading: false
        };

        case GET_INVOICE_ITEMS + FAIL:

        return {
            data: payload.invoiceItems,
            loading: false,
            error: true
        };

        case CREATE_INVOICE_ITEMS + SUCCESS:

        return {
            ...invoiceItems,
            data: payload.invoiceItems
        };

        case CREATE_INVOICE_ITEMS + FAIL:

        return {
            error: true
        };

        case EDIT_INVOICE_ITEMS:

            return {
                ...invoiceItems,
                data: payload.invoiceItems.map(invoiceItem => invoiceItem.id === payload.invoiceItem.id ? payload.invoiceItem : invoiceItem)
            };

        case DELETE_INVOICE_ITEMS:

            return {
                ...invoiceItems,
                data: payload.invoiceItems.filter(invoiceItem => invoiceItem.id !== payload.invoiceItem.id)
            };

    }
    return invoiceItems
}