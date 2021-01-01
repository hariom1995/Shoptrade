import { takeEvery, all } from 'redux-saga/effects';
import { PRODUCT } from '../Actions/product';
import { products } from '../Sagas/productSaga'

export function* rootSagas() {
    yield all([
        takeEvery(PRODUCT, products),
    ]);
}
