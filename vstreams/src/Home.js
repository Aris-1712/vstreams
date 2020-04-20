import React,{Component} from "react";
import ReactPlayer from "react-player";
import './Home.css'
import {connect} from 'react-redux'
import Axios from 'axios'
import * as Actions from './Action'
import { MDBContainer, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBIcon } from 'mdbreact';
import Navbar from "./Containers/navbar";

class Home extends Component {
    state={
        Name:'',
        Likedvids:[],
        key:'',
        Email:''
    }
    likeClick=async(event,vidKey)=>{
        let temp={}
        this.props.vids.map((obj)=>{
            if(obj.key===vidKey){
                temp=obj
                temp.Likes=obj.Likes+1
            }
        })
        let res=await Axios.put('https://vstreams-444be.firebaseio.com/videos/'+vidKey+'.json',temp)
        let temp1
        if(this.state.Likedvids===undefined){
            temp1=[vidKey]
            console.log(temp1)
            this.setState({Likedvids:temp1})
        }
        else{
            temp1=this.state.Likedvids
            temp1.push(vidKey)
            console.log(temp1)
            this.setState({Likedvids:temp1})

        }
        
        
        let res2=await Axios.put("https://vstreams-444be.firebaseio.com/users/"+this.state.key+'.json',this.state)

        this.Update()
    }
    unlikeClick=async(event,vidKey)=>{
        let temp={}
        this.props.vids.map((obj)=>{
            if(obj.key===vidKey){
                temp=obj
                temp.Likes=obj.Likes-1
            }
        })
        let res=await Axios.put('https://vstreams-444be.firebaseio.com/videos/'+vidKey+'.json',temp)
        let index=this.state.Likedvids.indexOf(vidKey)
        
        this.state.Likedvids.splice(index,1)
        // console.log(temp1)
        // this.setState({Likedvids:temp1})
        let res2=await Axios.put("https://vstreams-444be.firebaseio.com/users/"+this.state.key+'.json',this.state)
        this.Update()


    }
    Update=async()=>{
        let res2=await Axios.get('https://vstreams-444be.firebaseio.com/users.json')
        if(res2.status===200){
            let arr=[]
            let key=Object.keys(res2.data)
            key.map((obj)=>{
                arr.push({...res2.data[obj],key:obj})
    
            })
            this.props.getUsers(arr)
      }
      let res3=await Axios.get("https://vstreams-444be.firebaseio.com/videos.json")
      if(res3.status===200 && (res3.data)!==null){
     
                    let arr1=[];
                    let keys=Object.keys(res3.data)
                    keys.map((obj)=>{
                        arr1.push({...res3.data[obj],key:obj})
                    })
                    this.props.getVideos(arr1)
    }
    }
componentDidMount=()=>{
    console.log(this.props)
    const query = new URLSearchParams(this.props.location.search);
    let id=''
    for (let param of query.entries()) {
        id=param[1] // yields ['start', '5']
        console.log(param[1])
    }
    this.props.users.map((obj)=>{
        if(obj.key===id){
            this.setState({Name:obj.Name,Likedvids:obj.Likedvids,key:id,Email:obj.Email})
        }
    })


}
refresh=()=>{
    const query = new URLSearchParams(this.props.location.search);
    let id=''
    for (let param of query.entries()) {
        id=param[1] // yields ['start', '5']
        console.log(param[1])
    }
    this.props.users.map((obj)=>{
        if(obj.key===id){
            this.setState({Name:obj.Name,Likedvids:obj.Likedvids,key:id,Email:obj.Email})
        }
    })
}
componentDidUpdate(){
    console.log("after back button")
    if(this.state.Name===''){
        this.refresh()
    }
}

render(){
    console.log(this.props)
    const display=(
        this.props.vids.map((obj)=>{
            return(
                
             <div>
                  <div className="card">
                    <h5 class="card-header">{obj.Name}</h5>
                    <div class="card-body">
                    <ReactPlayer width={'100%'} url={obj.Play} playing={!true} controls />
                    <br></br>
                    {this.state.Likedvids===undefined?<div><div onClick={(event)=>{this.likeClick(event,obj.key)}}><span><i style={{color:"red"}} class="far fa-heart fa-2x "></i></span></div><h1>{obj.Likes} Likes</h1></div>:
                    (this.state.Likedvids.includes(obj.key)?
                    <div><div onClick={(event)=>{this.unlikeClick(event,obj.key)}}><span><i style={{color:"red"}} class="fas fa-heart fa-2x "></i></span></div><h1>{obj.Likes} Likes</h1></div>:
                    <div><div onClick={(event)=>{this.likeClick(event,obj.key)}}><span><i style={{color:"red"}} class="far fa-heart fa-2x "></i></span></div><h1>{obj.Likes} Likes</h1></div>
                    )}
                      
                    </div>
                    </div>
                    <br></br>
                  <hr></hr>
                  <br></br>
                  </div>
                  
                  
          
            )

        })
       
    )
  return(
  
  <div >
      
      <Navbar obj={this.state}></Navbar>
      <div className="container">      <br></br>
      <br></br>
      
                <h1>Welcome {this.state.Name} !</h1>
                <hr></hr>
                
                <h1 style={{textAlign:"Left",color:"Red" ,fontStyle:"Italic"}}>Watch Now</h1>
      
      {display}
      </div>
      </div>

  )
    
    
 
    
  
  }
};

const mapStatetToProps=(state)=>{
    return({
        vids:state.videoLisst,
        users:state.userList
    })
}
const mapActionsToProps=(dispatch)=>{return({
    getUsers:(obj)=>{dispatch(Actions.users(obj))},
    getVideos:(obj)=>{dispatch(Actions.videos(obj))}})
  }
export default connect(mapStatetToProps,mapActionsToProps)(Home);
