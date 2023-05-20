import './asset/common.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Create()
{
    const [emp, setEmp] = useState({Id: 0, C_Name: "", Description: "", Status: ""});
    const [message, setmessage] = useState("");
    const [shouldCleanTextBoxes, setShouldCleanTextBoxes] = useState(false);

    const handleChange = (args)=>
    {
        var copyOfCurrentEmpInState = {...emp};
        copyOfCurrentEmpInState[args.target.name] = args.target.value;
        setEmp(copyOfCurrentEmpInState);
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

    useEffect(()=>
    {
        if(shouldCleanTextBoxes == true)
        {
            setEmp({Id: 0, C_Name: "", Description: "",Status:""});
        }
    }, [shouldCleanTextBoxes])

    const addRecord =()=>
    {
        var helper = new XMLHttpRequest();
        helper.onreadystatechange = ()=>{
            if(helper.readyState == 4 && helper.status == 200)
            {
                debugger;
                var result = JSON.parse(helper.responseText);
                if(result.affectedRows!=undefined)
                {
                    if(result.affectedRows > 0)
                    {
                       setmessage("Record Added Successfully!");
                       setShouldCleanTextBoxes(true);
                    }
                    else
                    {
                       setmessage("We could not add the record.!")
                       setShouldCleanTextBoxes(false);
                    }
                }
                else
                {
                    setmessage("Something went wrong! Try Again!"); 
                    setShouldCleanTextBoxes(false);  
                }
            }
        };
        helper.open("POST","http://localhost:9999/category");
        helper.setRequestHeader("Content-Type", "application/json")
        debugger;
        helper.send(JSON.stringify(emp));
    }

    const clearRecord=()=>
    {
        setEmp({Id: 0, Name: "", Description: "", Status: ""});
    }

    return <div>
               <center>
                    <br></br>
                    <br></br>
                    <br></br>
                    <table>
                        <tbody>
                            <tr>
                                <td className='td'>Id:</td>    
                                <td className='td'>
                                    <input type="text" name="Id"
                                           value={emp.Id}
                                           onChange={handleChange}/>
                                </td>
                            </tr>

                            <tr>
                                <td className='td'>Category Name:</td>    
                                <td className='td'>
                                    <input type="text" name="C_Name"
                                           value={emp.C_Name}
                                           onChange={handleChange}/>
                                </td>
                            </tr>
                            <tr>
                                <td className='td'>Description:</td>    
                                <td className='td'>
                                    <input type="text" name="Description"
                                           value={emp.Description}
                                           onChange={handleChange}/>
                                </td>
                            </tr>

                            <tr>
                                <td className='td'>Status:</td>    
                                <td className='td'>
                                    <input type="text" name="Status"
                                           value={emp.Status}
                                           onChange={handleChange}/>
                                </td>
                            </tr>
                            <tr>
                                <td  className='td'>
                                    <button className='btn btn-primary'
                                            onClick={addRecord}>
                                        Submit
                                    </button>
                                </td>
                                <td  className='td'>
                                    <button className='btn btn-danger'
                                            onClick={clearRecord}>
                                        Reset
                                    </button>
                                </td>
                                
                            </tr>
                            <tr>
                                <td colSpan={"2"}  className='td'>
                                    <h6 style={{color: "orange"}}>
                                        {message}
                                    </h6>
                                    <br></br><br></br>
                                    <Link to={"/home"}>Go Home</Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
               </center>
           </div>
}

export default Create;