import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';

import { rootSagas } from '../Sagas/rootSaga';
import reducer from '../Actions/index';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(reducer, applyMiddleware(sagaMiddleware, createLogger()));

sagaMiddleware.run(rootSagas);
