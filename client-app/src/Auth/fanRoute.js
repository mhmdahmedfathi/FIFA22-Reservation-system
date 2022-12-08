import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { getUser } from "../StateManagment/Auth/actions";

const FanRoute = ({ component: Component, ...rest }) => {
    const role = useSelector((state) => state.auth.role);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchUser = async () => {
            await dispatch(getUser());
            setIsLoading(false);
        };
        if (role.length === 0) {
            fetchUser();
        }
    }, []);
    return isLoading ? (
        <div>Loading...</div>
    ) : (
        <Route
            {...rest}
            render={(props) =>
                role === "fan" ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: "/", state: { from: props.location } }} />
                )
            }
        />
    );
};

export default FanRoute;