import { Switch, Route } from "react-router-dom";
import AdminRoute from "./Auth/adminRoute";
import ManagerRoute from "./Auth/managerRoute";
import Dashboard from "./pages/admin/Dashboard";
import Login from "./pages/Login"
import Signup from "./pages/admin/Signup";
import MgmtDashboard from "./pages/MgmtDashboard";
function Routes() {
    return (
        <>
            <Switch>
                <Route path="/admin/dashboard" component={Dashboard} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
                <AdminRoute path="/admin/signup" component={Signup} />
                <AdminRoute path="/admin/login" component={Login} />
                <AdminRoute path="/manager/dashboard" component={MgmtDashboard} />
            </Switch>
        </>
    );
}

export default Routes;