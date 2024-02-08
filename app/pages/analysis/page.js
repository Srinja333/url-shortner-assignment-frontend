"use client";
import Nav from "@/app/components/nav/nav";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { getAllUrls } from "@/app/apis/apis";
import Link from 'next/link'
import { useSignin } from "@/app/context/signin";
import NotFound from "@/app/not-found";
import Loader from "@/app/components/loader/loader";


function Analysis() {
    const [allUrlData, setAllUrlData] = useState([])
    const { signinValidity, setSigninValidity, logout,setLogout } = useSignin();
    
    useEffect(() => {
        require("bootstrap/dist/js/bootstrap.min.js");
        const fetcher = async () => {
            const tempAllUrlData = await getAllUrls()
            setAllUrlData([...tempAllUrlData])
        }
        fetcher()

    }, []);

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
            <Nav />
            <table className="table mt-5 p-4 w-70 text-center">
                <thead>
                    <tr className="table-primary table-striped">
                        <th scope="col">SN.</th>
                        <th scope="col">Shorted URL</th>
                        <th scope="col">Redirect URL</th>
                        <th scope="col">Clicked</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allUrlData.map((url, ind) => {
                            return (
                                <tr>
                                    <th scope="col">{ind + 1}</th>
                                    <th scope="col">
                                        <Link href={`${process.env.NEXT_PUBLIC_API}/url/${url?.shortId}`}>{url?.shortId}</Link>
                                    </th>
                                    <th scope="col">
                                        <p>{url?.redirectUrl}</p>
                                    </th>
                                    <th scope="col ">
                                        {url?.clickHistory.length} times
                                    </th>
                                </tr>
                            );

                        })}
                </tbody>
            </table>
        </>
    )
                    }
                }
}

export default Analysis