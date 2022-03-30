import React, { useState, useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import { useNavigate } from "react-router-dom";

import { CONFIG } from "../config/config";

export default function SocialLogin() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>();
  const clientId = CONFIG.GOOGLE_API;
  const handleLogin = (res: any) => {
    setUser(res.profileObj);
    navigate("/");
    fetch(CONFIG.ApiUser, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(res.profileObj),
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("user", JSON.stringify(data))
        navigate("/");
      })
      .catch((error) => {});
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
