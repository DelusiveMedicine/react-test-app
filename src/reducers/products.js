import {START, SUCCESS, FAIL, GET_PRODUCTS, CREATE_PRODUCT, EDIT_PRODUCT, DELETE_PRODUCT} from '../constants';

const initState = {
    data: [],
    loading: false,
    error: false
}

export default (products = initState, action) => {
    const {type, payload} = action;
    
    switch(type){ 
        
        case GET_PRODUCTS + START:

        return {
            loading: true
        };

        case GET_PRODUCTS + SUCCESS:

        return {
            data: payload.products,
            loading: false
        };

        case GET_PRODUCTS + FAIL:

        return {
            data: payload.products,
            loading: false,
            error: true
        };

        case CREATE_PRODUCT + SUCCESS:
        
            return {
                ...products,
                data: payload.product
            };
    
            case CREATE_PRODUCT + FAIL:
    
            return {
                error: true
            };

        case EDIT_PRODUCT:

            return {
                ...products,
                data: payload.products.map(product => product.id === payload.product.id ? payload.product : product)
            };

        case DELETE_PRODUCT:

            return {
                ...products,
                data: payload.products.filter(product => product.id !== payload.product.id)
            };
}
    return products
}