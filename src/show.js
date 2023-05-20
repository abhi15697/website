import { useEffect, useState } from "react";
import './asset/common.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import { useHistory } from "react-router-dom";

function Show()
{

    const history=useHistory();
    const [emps,setemps]= useState([]);
    const [message, setmessage] = useState("");
    const [userName, setUserName]=useState("");
   

    useEffect(()=>{
        if(sessionStorage.getItem("userName")!=null && sessionStorage.getItem("userName")!="")
        {
            setUserName(sessionStorage.getItem("userName"));
        }
        else
        {
            setUserName(sessionStorage.getItem("Guest"));
        }
    },[])



    useEffect(()=>{
        if(message!="")
        {
            if(message == "Record Removed Successfully!")
            {
                //Refresh the set of employees
                var helper = new XMLHttpRequest();
                helper.onreadystatechange = ()=>{
                    if(helper.readyState == 4 && helper.status == 200)
                    {
                        var result = JSON.parse(helper.responseText);
                        setemps(result);
                    }
                };
                helper.open("GET","http://localhost:9999/category");
                helper.send();
            }
            setTimeout(() => 
            {
                setmessage("");
            }, 2000);
        }
    },[message])

    

    useEffect(()=>{

        var helper=new XMLHttpRequest();
        helper.onreadystatechange=()=>{
            if(helper.readyState==4 && helper.status==200)
            {
             
                var result=JSON.parse(helper.responseText);
                console.log(result);
                debugger;
                setemps(result);
            }
        };
        helper.open("GET","http://localhost:9999/category");
        helper.send();
    },[])

    const navigateToLogOut=()=>
    {
        debugger;
        sessionStorage.setItem("isloggedin", "false")
        history.push("/");
    }

    const navigateToAdd=()=>
    {
        history.push('/create');

    }
    const removeRecord =(Id)=>{
        var helper = new XMLHttpRequest();
        helper.onreadystatechange = ()=>
                {
                    if(helper.readyState == 4 && helper.status == 200)
                    {
                        var result = JSON.parse(helper.responseText);
                        if(result.affectedRows!=undefined)
                        {
                            if(result.affectedRows > 0)
                            {
                               // debugger;
                               setmessage("Record Removed Successfully!");
                            }
                            else
                            {
                               setmessage("We could not remove the record.!")
                            }
                        }
                        else
                        {
                            setmessage("Something went wrong! Try Again!"); 
                        }
                    }
                };
        helper.open("DELETE","http://localhost:9999/category/" + Id);
        helper.send();
    }

    return (
       <div>
        <button className="margin btn btn-primary" onClick={navigateToAdd}>Add Category</button>
        {/* <button className="margin btn btn-danger" onClick={navigateToLogOut}>Logout</button> */}
        <span style={{color: "orange"}}>{message}</span>
        <div  className="table-responsive marginset">
         <table className="table table-bordered">
            <tbody>
                {
                    emps.map((emp)=>{
                        return<tr key={emp.Id}>
                            <td>{emp.Id}</td>
                            <td>{emp.C_Name}</td>
                            <td>{emp.Description}</td>
                            <td>{emp.Status}</td>
                            <td>
                                <button className="btn btn-danger" onClick={()=>{removeRecord(emp.Id);}}>Delete</button>
                            </td>
                        </tr>
                    })
                }
            </tbody>
        </table>
       </div>


       </div>

    //   <div>
    //         {
    //             // emps.map((e1)=>{
    //             //     return(
    //             //     <h1 key={e1.no}>{e1.no},{e1.name },{e1.address}</h1>
    //             //     );
    //             // })
    //         }
    //  </div>
        

    );
}
export default Show;