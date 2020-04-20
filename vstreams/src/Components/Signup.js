import React from 'react'
import  '../Components/Signup.css'

const Signup=(props)=>{
    // console.log("HERE")

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
    <h1 style={{color:"cadetblue"}}><span><i style={{color:"cadetblue"}} class="far fa-address-card"></i></span> SIGNUP</h1>
    </div>

    
    <form>
    <input type="text" id="login" className="fadeIn second" name="login" placeholder="Name" onChange={(event)=>{props.change(event,'Name')}}></input>
      {/* {props.eerr?<label style={{color:"RED"}}>Enter proper E-Mail address</label>:null} */}
      <input type="text" id="login" className="fadeIn second" name="login" placeholder="Email Address" onChange={(event)=>{props.change(event,'Email')}}></input>
      {props.eerr?<label style={{color:"RED"}}>Enter proper E-Mail address</label>:null}
      <input type="text" id="password" className="fadeIn third" name="login" placeholder="Password" onChange={(event)=>{props.change(event,'Password')}}></input>
      {props.perr?<label style={{color:"RED"}}>Pasword should be greater than 4 characters</label>:null}
      {/* <input type="submit" className="fadeIn fourth" value="Log In"></input> */}
    </form>

   
    <div id="formFooter">
    {props.eerr||props.perr||props.eerr===undefined||props.perr===undefined?<button class="btn btn-info" disabled>Submit</button>:<button class="btn btn-info" onClick={props.submit}>Submit</button>}
    </div>
    </div>
  </div>
</div>
    )
}

export default Signup