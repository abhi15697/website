import {Link, Route, Switch} from 'react-router-dom'
import About from './about';
import Create from './create';
import Show from './show';
import NotFound from './notfound';
import './asset/common.css'
import ProtectedRoute from './protectedRoute';
import Header from './header';
import { useEffect, useState } from 'react';
import AddProduct from './addProduct';
import Forgot from './forgot';
function Dashboard()
{
    const [userName, setUserName] = useState("");

    useEffect(()=>{
        setLoggedInUserName();
    }, []);

    const setLoggedInUserName = ()=>{
      debugger;
        if(sessionStorage.getItem("userName")!=null &&
        sessionStorage.getItem("userName")!="")
        {
             setUserName(sessionStorage.getItem("userName"));
        }
        else
        {
             setUserName("Guest");
        }
    }

    const updateLoginStatus = ()=>{
        setLoggedInUserName();
    }

    const logout=()=>
    {
      debugger;
      sessionStorage.removeItem("isloggedin")
      sessionStorage.removeItem("userName")
      setLoggedInUserName();
    }
    
    return <div className='margin'>
                <Header loggedInUser={userName} logout={logout}></Header>
                <br></br>
        
                <hr></hr>
                    <Link to={"/home"}> Category </Link> {" | "}
                    {/* <Link to={"/create"}> Category </Link> {" | "}  */}
                    <Link to={"/about"}> Products </Link> {" |  "}
                <hr></hr>
                    <Switch>
                        {/* <ProtectedRoute path="/home" component={Show} 
                                        afterLogin={updateLoginStatus}/> */}
                        <ProtectedRoute path="/home" component={Show} 
                                        afterLogin={updateLoginStatus}/>
                        <ProtectedRoute path="/about" exact component={About} 
                         afterLogin={updateLoginStatus}/>
                         <Route path="/create" exact component={Create}/>
                        <Route path="/addProduct" exact component={AddProduct}/>
                        <Route path="/forgot" exact component={Forgot}/>
                        <ProtectedRoute path="/"  exact component={Show} 
                                        afterLogin={updateLoginStatus}/>
                        <Route path="*" component={NotFound} />
                    </Switch>
                <hr></hr>
                <h1>Footer</h1>
           </div>
}

export default Dashboard;
