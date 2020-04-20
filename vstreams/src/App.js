import React,{Component} from 'react';
// import logo from './logo.svg';
import './App.css';
// import ReactPlayer from 'react-player'
import {Route, Switch} from 'react-router-dom'
// import Signup from './Components/Signup'
import Signupcontrol from './Components/Signupcontrol';
// import Signin from './Components/Signin';
import Signincontrol from './Components/Signincontrol';
// import fire from '../src/firebase'
import Home from './Home';
import * as Actions from '../src/Action'
import {connect} from 'react-redux'
import Axios from 'axios'
import Videos from './Components/Videos';
import Userinfo from './Containers/Userinfo';


class App extends Component {
  state={
    auth:false
  }
  componentDidMount=async()=>{
    let res2=await Axios.get('https://vstreams-444be.firebaseio.com/users.json')
    if(res2.status===200 && res2.data !== null){
      // console.log(res2.data)
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
}}
  // componentDidUpdate() {
  //   fire.auth().onAuthStateChanged(user => {
  //     // console.log("change")
  //     if (user) {
  //       this.setState({
  //         auth: true
  //       });
  //     } 
  //   });
  // }
   authUpdate=()=>{
    this.setState({auth:true})
  }
 render(){
   console.log(this.state.auth)
  return (
    <div className="App">
      <Switch>
      <Route exact path='/' render={(props)=>{return(<Signincontrol control={this.authUpdate}></Signincontrol>)}} ></Route>
      <Route path='/Upload' component={Videos}></Route>
      <Route path='/Signup' component={Signupcontrol}></Route>
        {this.state.auth?<Route path='/Home' component={Home}></Route>:<Route  path='/' render={(props)=>{return(<Signincontrol control={this.authUpdate}></Signincontrol>)}} ></Route>}
        
        {/* <Route path='/Home' component={Home}></Route> */}
        {this.state.auth?<Route path='/Userinfo' component={Userinfo}></Route>:<Route  path='/' render={(props)=>{return(<Signincontrol control={this.authUpdate}></Signincontrol>)}} ></Route>}
        
        
        <Route path='/Signin' render={(props)=>{return(<Signincontrol control={this.authUpdate}></Signincontrol>)}} ></Route>
        {/* <Route  render={(props)=>{return(<Signincontrol control={this.authUpdate}></Signincontrol>)}} ></Route> */}
      </Switch>
      
      
      
    </div>
  );
}
}
const mapStateToProps=(state)=>{
  return({
  currUsers:state.userList})
}
const mapActionsToProps=(dispatch)=>{return({
  getUsers:(obj)=>{dispatch(Actions.users(obj))},
  getVideos:(obj)=>{dispatch(Actions.videos(obj))}})
}
export default connect(mapStateToProps,mapActionsToProps)(App);
