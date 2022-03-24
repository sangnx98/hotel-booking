import React from 'react'
import {GoogleLogin} from 'react-google-login'
import { Navigate, useNavigate } from 'react-router-dom'

export default function SocialLogin() {
    const navigate = useNavigate()
    const [user, setUser] = React.useState<any>()
    const clientId = '520939878663-807sm576rj1ud8k3sq7vuejb6db2ensv.apps.googleusercontent.com'
    const handleLogin = (res: any) =>{
        setUser(res.profileObj)
        navigate('/')
    }

    const handleFailure = (res: any) =>{
        console.log("Login failed!", res)
    }

    React.useEffect(()=>{
        localStorage.setItem('user', JSON.stringify(user))
        console.log('user', user)
    },[user])
    
    return (
        <>
        <GoogleLogin
            clientId={clientId}
            buttonText="Log in with Google"
            onSuccess={handleLogin}
            onFailure={handleFailure}
            cookiePolicy={'single_host_origin'}
        />
        </>
    )
}
