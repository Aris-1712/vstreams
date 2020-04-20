import React, { Component } from 'react'
import  {Link,withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import { MDBBtn, MDBJumbotron, MDBContainer } from "mdbreact";
import Navbar from '../Containers/navbar'


class Userinfo extends Component {
    // componentDidUpdate=()=>{
    //     window.onpopstate  = (e) => {
    //         console.log("HERE")
    //         }
    // }
    state={
        user:{},
        vids:[]
    }
    user={}
    componentDidMount=()=>{
       
        let id=''
        const query = new URLSearchParams(this.props.location.search);
        for (let param of query.entries()) {
            id=param[0]; // yields ['start', '5']
        }
        let output=[]
        this.props.users.map((obj)=>{
            if (obj.key===id) {
                output=obj.Likedvids
                this.setState({user:obj})
            }
    
        })
        let name=[]
        if(output!==undefined){
        output.map((obj)=>{
            this.props.vids.map((obj2)=>{
                if(obj2.key===obj){
                    name.push(obj2.Name)
                }
            })
        })
        this.setState({vids:name})
    }else{
        this.setState({vids:["You haven't liked any videos yet!"]})

    }
        
    
    }
    render(){
    
   
    return(<div>
        <Navbar obj={this.state.user}></Navbar>
        <br></br>
        <br></br>
        <br></br>
        <MDBContainer>
        
          <h1 className="h1-responsive" style={{textAlign:"center"}}><span><i style={{color:"red"}} class="fab fa-youtube fa-2x"></i></span> Your liked videos </h1>
          <hr style={{borderTop:"1px solid red"}}></hr>
            <br></br>
            
          {this.state.vids.map((obj)=>{
              return(
                  <h1 style={{color:"black",textAlign:"center"}}>{obj}</h1>
              )
          })}
          
        
      </MDBContainer></div>)
}
    
}
const mapStatetToProps=(state)=>{
    return({
        vids:state.videoLisst,
        users:state.userList,
        click:state.clicked
    })
}
const mapActionsToProps=(dispatch)=>{
    return({
        clicker:()=>dispatch({type:"clicked"})
    })
}
export default connect(mapStatetToProps,mapActionsToProps)(Userinfo);