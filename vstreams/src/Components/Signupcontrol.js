import React, { useState } from "react";
import fire from "../firebase";
import Signup from "./Signup";
import Axios from 'axios'
import * as Actions from '../Action'
import {connect} from 'react-redux'

const Signupcontrol = props => {
    console.log(props)
  const [email, emailnew] = useState("");
  const [pasword, passwordnew] = useState("");
  const [emailerr, emailerrnew] = useState();
  const [pasworderr, passworderrnew] = useState();
  const [name, namenew] = useState("");

  const changehandler = (event, id) => {
    const val = event.target.value;
    // // // // console.log(val)
    if (id === "Name") {
      namenew(val);
    }
    if (id === "Email") {
      emailnew(val);
      // // // // console.log(email,emailerr)
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val) === false) {
        emailerrnew(true);
      } else {
        emailerrnew(false);
      }
    }
    if (id === "Password") {
      passwordnew(val);
      if (val.length <= 4) {
        passworderrnew(true);
      } else passworderrnew(false);
    }
  };
  const submit = async () => {
    if (emailerr === false && pasworderr === false) {
      try {
       let user= await fire.auth().createUserWithEmailAndPassword(email, pasword);
       if(user){
        let user={
            Name:name,
            Email:email,
            Likedvids:[]
        }
        let res=await Axios.post('https://vstreams-444be.firebaseio.com/users.json',user)
        if(res.status===200){
            let res2=await Axios.get('https://vstreams-444be.firebaseio.com/users.json')
            if(res2.status===200){
                let arr=[]
                let key=Object.keys(res2.data)
                key.map((obj)=>{
                    arr.push({...res2.data[obj],key:obj})

                })
                props.getUsers(arr)
                alert("User Registered Successfully. Wait you are being redirected to the signin page.")
                setTimeout(() => {
                    props.history.push({pathname:'/Signin'})
                    
                }, 5000);
            }

        }
       }
       
      } catch (error) {
        alert(error.message);
      }
    }
  };

  return (
    <Signup
      change={changehandler}
      submit={submit}
      eerr={emailerr}
      perr={pasworderr}
    ></Signup>
  );
};
const mapStateToProps=(state)=>{
    return({
    currUsers:state.userList})
}
const mapActionsToProps=(dispatch)=>{return({
    getUsers:(obj)=>{dispatch(Actions.users(obj))}})
}
export default connect(mapStateToProps,mapActionsToProps)(Signupcontrol);
