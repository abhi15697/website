import { Route } from "react-router-dom";
import Login from "./login";

function ProtectedRoute(props)
{
    debugger;
    if(sessionStorage.getItem('isloggedin')!=null && sessionStorage.getItem('isloggedin')=="true")
    {
        //return expected route
        return <Route path={props.path} exact component={props.component} />
    }
    else
    {
        //return login component in hard coded way
        return <Login afterlogin={props.afterLogin}></Login>
    }
}
export default ProtectedRoute;
  