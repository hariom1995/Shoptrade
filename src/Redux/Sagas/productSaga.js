import { put, call } from 'redux-saga/effects';
import { productApi } from '../Apis/productApi'
import { productStore } from '../Actions/product'

export function* products(action) {
    let products = yield call(productApi);
    yield put(productStore(products))
}
