import { combineReducers } from 'redux';
import { snackbar } from './alertSnackBar'
import { products } from './product'
import {cartProducts} from './cartProducts'

export default combineReducers({
    snackbar,
    products,
    cartProducts
})
