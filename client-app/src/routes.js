import { Switch, Route, Redirect } from "react-router-dom";
import AdminRoute from "./Auth/adminRoute";
import ManagerRoute from "./Auth/managerRoute";
import FanRoute from "./Auth/fanRoute";
import Dashboard from "./pages/admin/Dashboard";
import AdminSignup from "./pages/admin/Signup";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import MgmtDashboard from "./pages/MgmtDashboard";
import FanHome from "./pages/FanHome";
import LandingPage from "./pages/LandingPage";
function Routes() {
  return (
    <>
      <Switch>
        <Route path="/admin/dashboard" component={Dashboard} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/admin/signup" component={AdminSignup} />
        <Route path="/admin/login" component={Login} />
        <ManagerRoute path="/manager/dashboard" component={MgmtDashboard} />
        {/* <Route path="/signup" component={Signup} /> */}
        <Route path="/fan" component={FanHome} />
        <Route path="/" component={LandingPage} />
        <Route path="*" component={() => Redirect("/login")} />
      </Switch>
    </>
  );
}

export default Routes;
