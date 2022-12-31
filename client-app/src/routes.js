import { Switch, Route } from "react-router-dom";
import AdminRoute from "./Auth/adminRoute";
import ManagerRoute from "./Auth/managerRoute";
import FanRoute from "./Auth/fanRoute";
import Dashboard from "./pages/admin/Dashboard";
import Signup from "./pages/admin/Signup";
// import FanSignup from "./pages/Signup";
import Login from "./pages/Login"
import MgmtDashboard from "./pages/MgmtDashboard";
import FanHome from "./pages/FanHome"
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
                {/* <Route path="/fan/signup" component={FanSignup} /> */}
                <Route path="/fan" component={FanHome} />
            </Switch>
        </>
    );
}

export default Routes;