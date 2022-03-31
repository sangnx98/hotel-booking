import {signUpStart, signUpError, signUpSuccess} from './userSlice'
import {signUp} from '../services/userService'

export const signUpUser = async (user:{}, dispatch:any) => {
    try{
        const res = await signUp(user);
        console.log(res)
        dispatch(signUpSuccess(res))
    }catch(err){
        dispatch(signUpError())
    }
}