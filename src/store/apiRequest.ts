import {signUpSuccess} from './userSlice'
import {signUp} from '../services/userService'

export const signUpUser = async (user:{}, dispatch:any) => {
    try{
        const res = await signUp(user);
        dispatch(signUpSuccess(res))
    }catch(err){
    }
}