// Source from Jim's AuthAuth demo

import React from "react";
import { Navigate } from "react-router-dom";
import Local from "../helpers/Local";

function PrivateRoute(props) {
    // If there is no userId redirect to /login if anonymouse user
    let userId = Local.getUserId();
    if (!userId) {
        return <Navigate to="/login" />
    }

    // Render child component(s)
    // NOTE: Anything between the start tag and end tag for PrivateRoutes, 
    // is passed to PrivateRoutes in a special property called children
    return (
        <>
            {props.children}
        </>
    );
}

export default PrivateRoute;