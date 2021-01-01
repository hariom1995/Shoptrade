import { createAction } from 'redux-actions';

// Define Actions
export const PRODUCT = 'PRODUCT';
export const PRODUCT_STORE = 'PRODUCT_STORE';

// Create Actions
export const product = createAction(PRODUCT);
export const productStore = createAction(PRODUCT_STORE);

// Initial State
const INITIAL_STATE = {
    products: [],
};

// Reducers
export function products(state = INITIAL_STATE, action = {}) {
    const payload = action.payload;
    switch (action.type) {
        case PRODUCT_STORE:
            return {
                ...state,
                products: payload
            }

        default:
            return state
    }
}