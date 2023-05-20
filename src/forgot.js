
import './asset/common.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
function Forgot()
{
    //const [user, setUser] = useState({UserName: ""});
    // const [message, setmessage] = useState("");
    // const handleChange = (args)=>
    // {
    //     var copyOfCurrentUserInState = {...user};
    //     copyOfCurrentUserInState[args.target.name] = args.target.value;
    //     setUser(copyOfCurrentUserInState);
    // }


    return(<div>
       <center>
       <h3>Did you forgot your password?</h3>
       <table>
             <tbody>
                
                 <tr>
                     <td className='td'>Email Address:</td>    
                     <td className='td'>
                         <input type="text" name="UserName"
                                // value={user.UserName}
                                // onChange={handleChange}
                                />
                     </td>
                 </tr>
                
                 
               </tbody>
         </table>
         <br></br>
         <button>Request reset link</button>
         <br></br>
         <Link to={'/home'}><ul>back to login</ul></Link>
       </center>
    </div>)

}
export default Forgot;