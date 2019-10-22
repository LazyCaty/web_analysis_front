import axios from 'axios';
import action from './index';
import config from './common/config';
import Qs from 'qs';


const {
    GET_COUNTRY_DATA_SUCCESS,
    GET_COUNTRY_DATA_FAILURE
} = action;

const baseUrl =config.baseUrl;

export function getData(query = ''){
    return async (dispatch) => {
        try{
            const data = (await axios.post(`${baseUrl}`,Qs.stringify(query))).data;
            dispatch({
                type: GET_COUNTRY_DATA_SUCCESS,
                data : data
            })
        }
        catch(e){
            dispatch({
                type: GET_COUNTRY_DATA_FAILURE,
                error : e
            })
        }
    }
}