import React from 'react';

import { Route, Switch } from "react-router-dom";
import HomeScreen from './../Containers/HomeScreen/HomeScreen';
import Header from '../Components/Header/Header'
import Banner from '../Components/Banner/Banner'


export const Routes = () => {
    return (
        <Switch>
            <PrivateRoute exact path="/" component={HomeScreen} />
        </Switch>
    )
}

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) =>
                true ? (
                    <div>
                        <div className="app-container">
                            <div>
                                <Header />
                                <Banner />
                            </div>
                            <div className="content-wrapper">
                                <Component {...props} />
                            </div>
                        </div>
                    </div>
                ) : null
            }
        />
    );
};
