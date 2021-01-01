import { createAction } from 'redux-actions';

export const ADD_TO_CART = 'ADD_TO_CART';

// Actions
export const addToCart = createAction(ADD_TO_CART);

const INITIAL_STATE = {
    cartProducts: []
};

export const cartProducts = (state = INITIAL_STATE, action = {}) => {
    let payload = action.payload;
    switch (action.type) {
        case ADD_TO_CART:
            return {
                ...state,
                cartProducts: [...state.cartProducts, payload]
            }
        default:
            return state;
    }
}


