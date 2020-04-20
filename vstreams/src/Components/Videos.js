import React, { useState } from 'react'
import Axios from 'axios'
import * as Actions from '../Action'
import {connect} from 'react-redux'

const Videos=(props)=>{
    const [Name,newName]=useState('')
    const [videoBy,newVideoBy]=useState('')
    const [play,newPlay]=useState('')
    const [link,newLink]=useState('')
    const [likes,newLikes]=useState(0)
    const [comments,newComments]=useState([])
    const changehandler=(event,id)=>{
        let val=event.target.value
        console.log(val)
        if(id==='Name'){
            newName(val)
        }
        if(id==='Videoby'){
            newVideoBy(val)
        }
        if(id==='Videoplay'){
            newPlay(val)
        }
        if(id==='Videodwnld'){
            newLink(val)
        }
    }
    const submithandler=async()=>{
        if(Name!=='' && play!=='' && link!==''){
            let video={
                Name:Name,
                Author:videoBy,
                Play:play,
                Link:link,
                Likes:likes,
                Comments:comments
            }
            console.log(video)
            let res=await Axios.post("https://vstreams-444be.firebaseio.com/videos.json",video)
            if(res.status===200){
                let res2=await Axios.get("https://vstreams-444be.firebaseio.com/videos.json")
                if(res2.status===200){
                let arr=[];
                let keys=Object.keys(res2.data)
                keys.map((obj)=>{
                    arr.push({...res2.data[obj],key:obj})
                })
                props.getVideos(arr)
                window.location.reload();
            }}

        }
    }
    return(
        <div className='container'>
        <form>
  <div class="form-group">
    <label >Video Name</label>
    <input  class="form-control"  placeholder="Video Name" onChange={(event)=>{changehandler(event,'Name')}}></input>
      </div>
      <div class="form-group">
    <label >Author Name</label>
    <input  class="form-control"  placeholder="Author Name" onChange={(event)=>{changehandler(event,'Videoby')}}></input>
      </div>
      <div class="form-group">
    <label >Video Link</label>
    <input  class="form-control"  placeholder="Video Link" onChange={(event)=>{changehandler(event,'Videoplay')}}></input>
      </div>
      <div class="form-group">
    <label for="exampleInputEmail1">Download Link</label>
    <input  class="form-control"  placeholder="Download Link" onChange={(event)=>{changehandler(event,'Videodwnld')}}></input>
      </div>
     
  <button type="button" class="btn btn-primary" onClick={submithandler}>Submit</button>
</form>
</div>

    )
}

const mapStateToProps=(state)=>{
    return({
    currUsers:state.videoLisst})
}
const mapActionsToProps=(dispatch)=>{return({
    getVideos:(obj)=>{dispatch(Actions.videos(obj))}})
}
export default connect(mapStateToProps,mapActionsToProps)(Videos);