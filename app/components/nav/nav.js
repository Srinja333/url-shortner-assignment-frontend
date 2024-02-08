"use client";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { useRouter } from "next/navigation";
import { useSignin } from "../../context/signin";

function Nav() {
  const [showProfile, setShowProfile] = useState(false)
  const router = useRouter();
  const { signinValidity, setSigninValidity,logout,setLogout, profEmail,setProfEmail} = useSignin();



  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.min.js");
  }, []);


  return (
    <>



      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">


          <div className="navbar-brand">Url Shortner</div>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/pages/links">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/pages/dashboard">Dashboard</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/pages/analysis">Analysis</a>
              </li>
            </ul>
          </div>
          <div className="navbar-nav ms-auto" style={{ zoom: "180%", cursor: "pointer" }} onClick={() => { setShowProfile(!showProfile) }}>
            <FontAwesomeIcon icon={faCircleUser} />
          </div>

        </div>
      </nav>
      {
        showProfile && (
          <div className="container mt-2" style={{ maxWidth: "1500px", position: "absolute", zIndex: "100" }}>
            <div className="row justify-content-end">
              <div className="col-12 col-md-3">

                <div className="bg-light p-3">

                  <div className="d-flex justify-content-center">
                    <div className="row">
                      <p style={{ textAlign: "center"}} >{profEmail}</p>

                      <a style={{ textAlign: "center", cursor: "pointer" }} onClick={() => {
                        document.cookie = "token=" + "; expires=Thu, 01 Jan 1970 00:00:01 GMT" + "; path=/";
                        if (document.cookie.includes("token") == false) {
                          setLogout(true)
                          setSigninValidity(false)
                          router.push("/pages/signin");
                        }
                      }} className="mt-2">Logout</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </>
  )
}

export default Nav