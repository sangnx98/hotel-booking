import React, { useState, useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { CONFIG } from "../config/config";
import { signUpUser } from "../store/apiRequest";
import { signUpSuccess } from "../store/userSlice";

export default function SocialLogin() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [user, setUser] = useState<any>();
  const clientId = CONFIG.GOOGLE_API;
  const handleLogin = (res: any) => {
    setUser(res.profileObj);
    localStorage.setItem('user', JSON.stringify(res.profileObj))
    navigate("/");
    signUpUser(res.profileObj, dispatch(signUpSuccess(res.profileObj)))
  };
  const handleFailure = (res: any) => {};
  
  return (
    <>
      <GoogleLogin
        clientId={clientId}
        buttonText="Log in with Google"
        onSuccess={handleLogin}
        onFailure={handleFailure}
        cookiePolicy={"single_host_origin"}
      />
    </>
  );
}
