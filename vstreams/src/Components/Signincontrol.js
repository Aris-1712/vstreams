import React,{useState} from 'react'
import fire from '../firebase'
import Signin from './Signin'
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux'

const Signincontrol=(props)=>{
    
    const [email,emailnew]=useState('')
    const [pasword,passwordnew]=useState('')
    const [emailerr,emailerrnew]=useState()
    const [pasworderr,passworderrnew]=useState()
    // console.log(props)
    const changehandler=(event,id)=>{
        
        const val=event.target.value
        // console.log(val)
        if(id==="Email"){
            emailnew(val)
            // console.log(email,emailerr)
            if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val)===false){
                emailerrnew(true)
                
            }
            else{
                emailerrnew(false)
            }
        }
        if(id==="Password"){
            passwordnew(val)
            if(val.length<=4){
                passworderrnew(true)
            }
            else(passworderrnew(false))
        }

    }
    const  submit=async()=>{
        
            try{
         await fire
        .auth()
        .signInWithEmailAndPassword(email, pasword);
        props.control()
        let id=''
        props.userList.map((obj)=>{
            if(email===obj.Email){
                id=obj.key
            }
        })
        props.history.push({pathname:'/Home',search: '?id='+id})
            }
            catch(error){
                alert(error.message)
            }

        

    }
console.log(props)
    return(
        <Signin change={changehandler} submit={submit} eerr={emailerr} perr={pasworderr} ></Signin>
    )
}
const mapStateToProps=(state)=>{
    return(
        {
            userList:state.userList
        }
    )
}
export default withRouter(connect(mapStateToProps)(Signincontrol))