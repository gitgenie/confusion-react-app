
import * as ActionTypes from './ActionTypes';
import { FEEDBACK } from '../shared/feedback';

export const Feedback = (state=FEEDBACK, action)=>{
    switch(action.type){
        case ActionTypes.ADD_FEEDBACK:
            var feedback = action.payload;
            console.log("feedback: ", feedback);
            alert("Thank you for your feedback\n"+JSON.stringify(feedback));
            return {...state, feedback:state.concat(feedback)};
        default:
            return state;
    }
}
