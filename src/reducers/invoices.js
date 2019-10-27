import {START, SUCCESS, FAIL, GET_INVOICES, CREATE_INVOICE, EDIT_INVOICE, DELETE_INVOICE} from '../constants';

const initState = {
    data: [],
    loading: false,
    error: false
}

export default (invoices = initState, action) => {
    const {type, payload} = action;

    switch(type){ 
        
        case GET_INVOICES + START:

        return {
            loading: true
        };

        case GET_INVOICES + SUCCESS:

        return {
            data: payload.invoices,
            loading: false
        };

        case GET_INVOICES + FAIL:

        return {
            data: payload.invoices,
            loading: false,
            error: true
        };

        case CREATE_INVOICE + SUCCESS:

        return {
            ...invoices,
            data: payload.invoice,
        };

        case CREATE_INVOICE + FAIL:

        return {
            error: true
        };

        case EDIT_INVOICE:

            return {
                ...invoices,
                data: payload.invoices.map(invoice => invoice.id === payload.invoice.id ? payload.invoice : invoice)
            };

        case DELETE_INVOICE:

            return {
                ...invoices,
                data: payload.invoices.filter(invoice => invoice.id !== payload.invoice.id)
            };

    }
    return invoices
}