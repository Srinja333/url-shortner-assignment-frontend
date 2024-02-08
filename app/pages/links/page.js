"use client";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { useRouter } from "next/navigation";
import { createShortUrl, userSignIn } from "@/app/apis/apis";
import Link from 'next/link'
import Nav from "@/app/components/nav/nav";
import { toast, Toaster } from "react-hot-toast";
import NotFound from "@/app/not-found";
import { useSignin } from "@/app/context/signin";
import Loader from "@/app/components/loader/loader";

function Links() {

  const [showResult, setShowResult] = useState(false)
  const [baseUrl, setBaseUrl] = useState("")
  const [shortId, setShortId] = useState("")
  const router = useRouter();
  const { signinValidity, setSigninValidity,logout,setLogout} = useSignin();
 


  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.min.js");
  }, []);


  const handleShortUrl = async (e) => {
    e.preventDefault();
    setShowResult(true);
    const data = {
      redirectUrl: baseUrl
    }
    const urlData = await createShortUrl(data)
    if(urlData==undefined){
      toast.remove();
      toast.error("short url created unsuccessfully !!!");
    }else{
    setShortId(urlData?.shortId)
    toast.remove();
    toast.success("short url created successfully !!!");
    }
  }

  if(logout){
    return(
  <>
<Loader/>
  </>
    )
  }else{
  if (signinValidity==false) {
    return <NotFound />;
  } else if(signinValidity==true) {
  return (
    <>
      <Toaster toastOptions={{ duration: 4000 }} />
     <Nav/>
    
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="input-group mb-3">

              <input type="text" autoComplete="off" className="form-control" placeholder="Give the url" id="searchInput" value={baseUrl} onChange={(e) => {
                setBaseUrl(e.target.value)
              }} />


              <button className="btn btn-primary" type="button" id="shortUrlButton" onClick={(e) => {
                handleShortUrl(e)

              }}>Short url </button>
            </div>
          </div>
        </div>
      </div>

      {showResult && baseUrl.length !== 0 &&shortId!==""&&
        <div className="container mt-3" id="resultDiv">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">

                  <h5 className="card-title">Result</h5>
                  <p className="card-text">shorted Url: <span><Link href={`${process.env.NEXT_PUBLIC_API}/url/${shortId}`} style={{ textDecoration: "underline", cursor: "pointer", color: "blue" }}>{shortId}</Link></span></p>
                  <p>Go to Dashboard to see all urls data <span><Link href="/pages/dashboard" style={{ textDecoration: "underline", cursor: "pointer", color: "blue" }}>Dashboard</Link></span> </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      }




    </>
  )
    }
  }
}

export default Links