"use client";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { useRouter } from "next/navigation";
import { userSignIn } from "@/app/apis/apis";
import { useSignin } from "@/app/context/signin";
import { toast, Toaster } from "react-hot-toast";
import NotFound from "@/app/not-found";
import Loader from "@/app/components/loader/loader";
const validator = require('validator')

function Signin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false)
  const { signinValidity, setSigninValidity, profEmail, setProfEmail, setLogout } = useSignin();
  const [loader, setLoader] = useState(false)

  const router = useRouter();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    setLoading(true)
    const result = await userSignIn(formData);
    const token = result.token
    const email = result.email

    if (token !== "Password not matched" && token != undefined && email != undefined) {
      setLoading(false)

      toast.remove();
      toast.success("signin successfull !!!");
      var now = new Date();
      var time = now.getTime();
      time += 3600 * 1000;
      now.setTime(time);
      document.cookie =
        "token=" + token + "; expires=" + now.toUTCString() + "; path=/";


      setLoader(true)
      setSigninValidity(true)
      setLogout(false)
      setProfEmail(email)
      router.push("/pages/links")
    }
    else if (token == "Password not matched") {
      setLoading(false)
      toast.remove();
      toast.error("password not matched !!!");
    } else {
      setLoading(false)
      toast.remove();
      toast.error("signin unsuccessfull !!! try again leter!!!");
    }
  }

  const checkValidation = (e) => {
    e.preventDefault();


    if (formData.email == "" || formData.password == "") {
      toast.remove();
      toast.error("please fill all the fields !!!");
      return false;
    }
    if (validator.isEmail(formData?.email) == false) {
      toast.remove();
      toast.error("please provide valid email");
      return false;
    }

    if (formData.password.length < 6) {
      toast.remove();
      toast.error("password length must be equal to or greater than 6");
      return false;
    }
    return true
  }

  useEffect(() => {

    require("bootstrap/dist/js/bootstrap.min.js");
  }, []);



  if (loader) {
    return (
      <>
        <Toaster toastOptions={{ duration: 4000 }} />
        <Loader />
      </>
    )
  } else {
    if (signinValidity) {
      return <NotFound />;
    } else if (signinValidity == false) {
      return (
        <>
          <Toaster toastOptions={{ duration: 4000 }} />
          <div className="container mt-5">
            <h3 className="text-center">Signin From</h3>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control form-control-sm"
                id="email"
                name="email"
                value={formData.email}
                autoComplete="off"
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
                value={formData.password}
                autoComplete="off"
                onChange={handleChange}
              />
            </div>
            <button
              className="btn btn-primary"
              onClick={(e) => {
                if (checkValidation(e) == true) {
                  handleSignin(e);
                }
              }}
            >
              {
                loading ?
                  <div>
                    Signin <span className="spinner-grow ms-2" style={{ zoom: "50%" }} role="status">
                      <span className="sr-only"></span>
                    </span>
                  </div> : "Signin"
              }

            </button>
          </div>
        </>
      )
    }
  }
}

export default Signin