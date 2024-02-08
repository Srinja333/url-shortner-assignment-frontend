"use client";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { useRouter } from "next/navigation";
import { allUsers, registerUser } from "@/app/apis/apis";
import { toast, Toaster } from "react-hot-toast";
const validator = require('validator')
import NotFound from "@/app/not-found";
import { useSignin } from "@/app/context/signin";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email:"",
    password: "",
  });
  const [loading,setLoading]=useState(false)
  const[users,setUsers]=useState([])
  const { signinValidity, setSigninValidity } = useSignin();
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true)
    const registeredUserData = await registerUser(formData);

      if(registeredUserData==undefined){
        setLoading(false)
        toast.remove();
      toast.error("registration unsuccessfull !!! try again leter!!!");
    
      }else{
        setLoading(false)
        toast.remove();
        toast.success("registration successfull !!!");
        router.push("/pages/signin")
      }
  };

  const checkValidation=(e)=>{
    e.preventDefault();
    let allEmails=[]
    users.forEach((u)=>{
      allEmails.push(u?.email)
    })
    
    if(formData.email==""||formData.name==""||formData.password==""){
      toast.remove();
      toast.error("please fill all the fields !!!");
      return false;
    }
    if(validator.isEmail(formData?.email)==false){
      toast.remove();
      toast.error("please provide valid email");
      return false;
    }
    if(allEmails.includes(formData?.email)){
      toast.remove();
      toast.error("email already taken");
      return false;
    }
    if(formData.password.length<6){
      toast.remove();
      toast.error("password length must be equal to or greater than 6");
      return false;
    }
    return true
  }

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.min.js");
    const fetcher=async()=>{
     const tempAllUserData= await allUsers()
     if(tempAllUserData==undefined){
        
      toast.remove();
      toast.error("unexpected error !!! try again leter!!!");
    
  }
  else{
     setUsers([...tempAllUserData])
  }
    }
    fetcher()
  }, []);

  if (signinValidity) {
    return <NotFound />;
  } else if(signinValidity==false) {
  return (
    <>
    <Toaster toastOptions={{ duration: 4000 }} />
  
    <div className="container mt-5">
    <h3 className="text-center">Registration From</h3>
    <div className="mb-3">
      <label htmlFor="name" className="form-label">
        Name
      </label>
      <input
        type="text"
        className="form-control form-control-sm"
        id="name"
        name="name"
        autoComplete="off"
        value={formData.name}
        onChange={handleChange}
      />
    </div>
    <div className="mb-3">
      <label htmlFor="email" className="form-label">
        Email
      </label>
      <input
        type="email"
        className="form-control form-control-sm"
        id="email"
        name="email"
        autoComplete="off"
        value={formData.email}
        onChange={handleChange}
      />
    </div>
    <div className="mb-3">
      <label htmlFor="password" className="form-label">
        Password
      </label>
      <input
        type="text"
        className="form-control form-control-sm"
        id="password"
        name="password"
        autoComplete="off"
        value={formData.password}
        onChange={handleChange}
      />
    </div>
    <button
      className="btn btn-primary"
      onClick={(e) => {
        if(checkValidation(e)==true){
        handleSignup(e);
        }
      }}
    >
      {
        loading?
        <div>
         Signup <span className="spinner-grow ms-2" style={{zoom:"50%"}} role="status">
       <span className="sr-only"></span>
      </span>
      </div>:"Signup"
      }
   
    </button>
    <p
    style={{textAlign:"center"}}
    >
      If you already sign up then 
    <a
    style={{ textDecoration: "underline", cursor: "pointer", color: "blue" }}
    onClick={()=>{
      router.push("/pages/signin")
    }}
      >
        {" "}Signin
      </a>
      </p>
  </div>
  </>
  )
    }
}

export default Signup