"use client"
import React from 'react';
import { useSignin } from './context/signin';

const NotFound = () => {
  const { signinValidity, setSigninValidity } = useSignin();
  return (
    <div>
     
        <div class="d-flex align-items-center justify-content-center vh-100">
            <div class="text-center">
                <h1 class="display-1 fw-bold">404</h1>
                <p class="fs-3"> <span class="text-danger">Opps!</span> Page not found.</p>
                <p class="lead">
                    The page you’re looking for doesn’t exist.
                </p>
                <button onClick={()=>{if(signinValidity){window.location.replace("/pages/links")}else{window.location.replace("/pages/signin")}}} class="btn btn-primary">{signinValidity?"You are already signed in, Go To Home":"Go To Signin"}</button>
            </div>
        </div>
    </div>
  )
}

export default NotFound









