import React from "react";
import { Alert } from 'reactstrap';
import { useDispatch, useSelector } from "react-redux";
import { hideSnackbar } from '../../Redux/Actions/alertSnackBar'

export const AlertSnackBar = () => {
    const dispatch = useDispatch();
    
    const currentState = useSelector(state => state),
    snackbarData = currentState.snackbar;

    if (snackbarData.show) {
        setTimeout(() => {
            dispatch(hideSnackbar());
        }, 2000)
    }
    const onDismiss = () => dispatch(hideSnackbar());;

    return (
        <div className='snackbar-position'>
            <Alert color={snackbarData.alertType} isOpen={snackbarData.show} toggle={onDismiss}>
                {snackbarData.messgage}
            </Alert>
        </div>
    );
}

// $ Available Colors Which we can use in Snackbar Alert color property
// $ primary, secondary, success, danger, warning, info, light, dark
