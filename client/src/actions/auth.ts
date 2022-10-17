import axios from "axios";
import {
    REG_PASS, 
    REG_FAIL, 
    AUTH_PASS, 
    AUTH_FAIL, 
    LOGIN_PASS, 
    LOGIN_FAIL, 
    LOGOUT,
} from "../actions/types";
import setAuthToken from "../helpers/setAuthToken";


//Load User
export const loadUser = () => async (dispatch:any) => {
    if(localStorage.token){
        setAuthToken(localStorage.token)
    }
    try{
        const res = await axios.get('/api/auth')
        dispatch({
            type: AUTH_PASS,
            payload: res.data,
        });
    }   catch(err){
        dispatch({type: AUTH_FAIL})
    }
};

//Register User
export const register = 
({name, email, password, contact, dob}:{name:any, email:any, password:any, contact:any, dob:any}) => 
async (dispatch:any) =>{
    const config ={
        headers: {"Content-Type": "application/json"},
    };
    const body = JSON.stringify({name, email, password, contact, dob});
    try{
        const res = await axios.post("/api/users", body, config);
        dispatch({
            type: REG_PASS,
            payload: res.data
        });
    }   catch(error:any){
        const errors = error.response.data.errors;
        if(errors){
            errors.forEach((error:any) => alert(error.msg));
        }
        dispatch({
            type: REG_FAIL,
        });
    }
};

//Login
export const login = ({email, password}:{email:any, password:any}) => async (dispatch:any) =>{
    const config = {
        headers: {'Content-Type': 'application/json'}
    }
    const body = JSON.stringify({email, password})
    try{
        const res = await axios.post('/api/auth',body,config);
        dispatch({
            type: LOGIN_PASS,
            payload: res.data
        })
        dispatch(loadUser)
    }catch(error:any){
        const errors = error.response.data.errors
        if(errors){
            errors.forEach((error: { msg: any; }) => alert(error.msg))
        }
        dispatch({
            type:LOGIN_FAIL,
        });
    }
};

export const logout = () => (dispatch:any) => {
    dispatch({
        type: LOGOUT,
    })
}