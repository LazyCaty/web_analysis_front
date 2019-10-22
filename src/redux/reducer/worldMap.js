import action from '../action/index';

const {
    GET_COUNTRY_DATA_SUCCESS,
} = action;

export default (state = {},action) =>{
    switch(action.type){
        case GET_COUNTRY_DATA_SUCCESS:
            return {
                ...state,
                getData: action.data
            }
        default:
            return state;
    }
}