const initialState = {
    isAdmin:false,
    isInstructor:false,
    isLogin:false
}

const reducer = (state=initialState, action)=>{
    switch(action.type){
        case 'CHECKADMIN':{
            return {...state,isAdmin:action.payload}
        }
        case 'CHECKLOGIN':{
            return{...state,isLogin:action.payload}
        }
        case 'CHECKINSTRUCTOR':{
            return { ...state,isInstructor:action.payload}
        }
        default:{
            return state
        }
    }
}

export default  reducer;