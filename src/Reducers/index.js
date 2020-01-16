import { combineReducers } from 'redux' 

function Reducer (state = [], action){
    switch(action.type){
        case "RegisterData" : return action;
        default : return state;      
    }
}

export default combineReducers({Reducer});