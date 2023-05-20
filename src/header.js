import '../node_modules/bootstrap/dist/css/bootstrap.css';

function Header(props)
{
  const returnUI = ()=>{
    if(props.loggedInUser == "Guest")
    {
      return  <div style={{float: "right"}}>
                Welcome {props.loggedInUser}
              </div>
    }
    else
    {
        return  <div style={{float: "right"}}>
                  Welcome {props.loggedInUser}
                  <button className='btn btn-warning'
                          onClick={()=>{props.logout()}}>Sign out</button>
                </div>
    }
  }
    return (<div>
                <h1>DigitalFlake</h1>
                  {  
                    returnUI()
                  }
           </div>)
}

export default Header