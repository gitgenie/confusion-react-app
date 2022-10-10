import { actionTypes } from 'react-redux-form';
import { DISHES } from '../shared/dishes';

export const Dishes = (state = DISHES, action)=>{
    switch(actionTypes.type){
        default:
            return state;
    }
}
