import {START, SUCCESS, FAIL, GET_CUSTOMERS, CREATE_CUSTOMER, EDIT_CUSTOMER, DELETE_CUSTOMER} from '../constants';

const initState = {
    data: [],
    loading: false,
    error: false
}

export default (customers = initState, action) => {
    const {type, payload} = action;

    switch(type){ 
        
        case GET_CUSTOMERS + START:

        return {
            loading: true
        };

        case GET_CUSTOMERS + SUCCESS:

        return {
            data: payload.customers,
            loading: false
        };

        case GET_CUSTOMERS + FAIL:

        return {
            data: payload.customers,
            loading: false,
            error: true
        };

        case CREATE_CUSTOMER + SUCCESS:

        return {
            ...customers,
            data: payload.customer
        };

        case CREATE_CUSTOMER + FAIL:

        return {
            error: true
        };

        case EDIT_CUSTOMER:

            return {
                ...customers,
                data: payload.customers.map(customer => customer.id === payload.customer.id ? payload.customer : customer)
            };

        case DELETE_CUSTOMER:

            return {
                ...customers,
                data: payload.customers.filter(customer => customer.id !== payload.customer.id)
            };

    }
    return customers
}