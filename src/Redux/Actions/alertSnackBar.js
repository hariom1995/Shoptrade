import { createAction } from 'redux-actions';

export const SHOW_SNACKBAR = 'SHOW_SNACKBAR';
export const HIDE_SNACKBAR = 'HIDE_SNACKBAR';

// Actions
export const showSnackbar = createAction(SHOW_SNACKBAR);
export const hideSnackbar = createAction(HIDE_SNACKBAR);

const INITIAL_STATE = {
    type: '',
    messgage: '',
    show: false,
    alertType: ''
};

export const snackbar = (state = INITIAL_STATE, action = {}) => {
    let payload = action.payload;
    switch (action.type) {
        case SHOW_SNACKBAR:
            return { 
                ...state,
                messgage: payload.messgage,
                alertType: payload.alertType,
                show: true
            }
        case HIDE_SNACKBAR:
            return {
                ...state,
                show: false
            }
        default:
            return state;
    }
}


