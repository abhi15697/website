import './asset/common.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

function Login(props)
{
    const history=useHistory();
    const [user, setUser] = useState({UserName: "", Password: ""});
    const [message, setmessage] = useState("");
   
    const handleChange = (args)=>
    {
        var copyOfCurrentUserInState = {...user};
        copyOfCurrentUserInState[args.target.name] = args.target.value;
        setUser(copyOfCurrentUserInState);
    }

    useEffect(()=>{
        if(message!="")
        {
            setTimeout(() => 
            {
                setmessage("");
            }, 2000);
        }
    }, [message]);
    const clearBoxes=()=>
    {
        setUser({UserName: "", Password: ""});
    }

    const signIn=()=>
    {

        if(user.UserName=="abhishek" && user.Password=="abhi123")
        {
            debugger;
             //Step 1: set the session state that says user is logged in now
             sessionStorage.setItem("isloggedin", "true")
             sessionStorage.setItem("userName",user.UserName)
             props.afterlogin();
             //Step 2: navigate user to Home page..
             history.push("/home");
        }
        else
        {
            clearBoxes();
            setmessage("Username / Password")
        }
    }



    return <div>
    <center>
        <h3>Welcome to DigitalFlake Admin</h3>
         <br></br>
         <br></br>
         <br></br>
         <table>
             <tbody>
                 <tr>
                     <td className='td'>UserName:</td>    
                     <td className='td'>
                         <input type="text" name="UserName"
                                value={user.UserName}
                                onChange={handleChange}/>
                     </td>
                 </tr>

                 <tr>
                     <td className='td'>Password:</td>    
                     <td className='td'>
                         <input type="password" name="Password"
                                value={user.Password}
                                onChange={handleChange}/>
                     </td>
                 </tr>
                 <tr>
                    <td colSpan={2}>
                        <Link to={'/forgot'}>Forgot Password?</Link>
                    </td>
                 </tr>
                 <tr>
                     <td  className='td'>
                         <button className='btn btn-primary'
                                 onClick={signIn}>
                             Login
                         </button>
                     </td>
                     <td  className='td'>
                         <button className='btn btn-danger'
                                 onClick={clearBoxes}>
                             Reset
                         </button>
                     </td>
                 </tr>
             </tbody>
         </table>
         <h6 style={{color:"orangered"}}>{message}</h6>
    </center>
</div>
}
export default Login