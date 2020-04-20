import React from 'react'
import  '../Components/Signup.css'
import { Link } from 'react-router-dom'

const Signin=(props)=>{
    // // console.log("HERE")

    return(
      <div className="container">
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div className="wrapper fadeInDown">
  <div id="formContent">
   
    <div className="fadeIn first">
      <br></br>
    <h1 style={{color:"cadetblue"}}><span><i style={{color:"cadetblue"}} class="far fa-address-card"></i></span> SIGNIN</h1>
    <br></br>
    </div>

    
    <form>
      <input type="text" id="login" className="fadeIn second" name="login" placeholder="email" onChange={(event)=>{props.change(event,'Email')}}></input>
      {/* {props.eerr?<label style={{color:"RED"}}>Enter proper E-Mail address</label>:null} */}
      <input type="password" id="password" className="fadeIn third" name="login" placeholder="password" onChange={(event)=>{props.change(event,'Password')}}></input>
      {/* {props.perr?<label style={{color:"RED"}}>Pasword should be greater than 4 characters</label>:null} */}
      {/* <input type="submit" className="fadeIn fourth" value="Log In"></input> */}
    </form>
    
    <Link to={{pathname:"/Signup"}}>New user? Sign up Now!</Link>
    <br></br>
    <br></br>
    <div id="formFooter">
    <button class="btn btn-info"  onClick={props.submit}>Submit</button>
    </div>
    </div>
  </div>
</div>
    )
}

export default Signin