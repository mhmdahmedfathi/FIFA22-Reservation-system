import { Switch, Route } from "react-router-dom";
import { AdminRoute } from "./Auth/adminRoute";
import Dashboard from "./pages/admin/Dashboard";
function Routes() {
    return (
        <>
            <Switch>
                <Route path="/" >
                    <Dashboard />
                </Route>
            </Switch>
        </>
    );
}

export default Routes;