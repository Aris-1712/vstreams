const initialState={
    userList:[],
    videoLisst:[],
    clicked:false
}
const Reducer=(state=initialState,Action)=>{
    if(Action.type==='usersList'){
        let users=Action.val
        return{...state,userList:users}
    }
    if(Action.type==='videosList'){
        let users=Action.val
        return{...state,videoLisst:users}
    }
    if(Action.type==='clicked'){
        let curr=state.clicked
        return{...state,clicked:!curr}
    }
    return state
}

export default Reducer