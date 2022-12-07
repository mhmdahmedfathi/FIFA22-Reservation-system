import { Switch, Route } from "react-router-dom";
import AdminRoute from "./Auth/adminRoute";
import Dashboard from "./pages/admin/Dashboard";
import Login from "./pages/admin/Login"
import Signup from "./pages/admin/Signup";
function Routes() {
    return (
        <>
            <Switch>
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
            </Switch>
        </>
    );
}

export default Routes;