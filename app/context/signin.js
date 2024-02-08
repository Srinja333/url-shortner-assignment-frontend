"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { verifyToken } from "../apis/apis";


const SigninContext = createContext();

function SigninProvider({ children }) {
  const [signinValidity, setSigninValidity] = useState(undefined);
 const [logout,setLogout]=useState(false)
 const [profEmail,setProfEmail]=useState("")

  useEffect(() => {
    let tempCookie = document.cookie;
   
    if(tempCookie==undefined||tempCookie===null||tempCookie.length==0){
      setSigninValidity(false);
      return;
    }
    const fetcher=async()=>{
      const result=await verifyToken()
      if (
        tempCookie.includes("token") === false||result.verified==false
      ) {
        setSigninValidity(false);
      } else {
        setSigninValidity(true);
        console.log(result?.email)
        setProfEmail(result.email)
      }
    }
    fetcher()
  }, []);

  return (
    <SigninContext.Provider value={{ signinValidity,setSigninValidity,logout,setLogout,profEmail,setProfEmail}}>
      {children}
    </SigninContext.Provider>
  );
}

const useSignin = () => useContext(SigninContext);

export { SigninProvider, useSignin };
