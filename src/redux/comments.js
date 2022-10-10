import { actionTypes } from 'react-redux-form';
import { COMMENTS } from '../shared/comments';

export const Comments = (state = COMMENTS, action)=>{
    switch(actionTypes.type){

        default:
            return state;
    }
}
