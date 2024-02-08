"use client";
import React, { useState, useEffect } from "react";
import './loader.css';


const Loader = () => {
  useEffect(() => {
  }, []);
  return (
     <div className="d-flex align-items-center justify-content-center vh-100 bg-white">
      <figure>
      <div class="dot white"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      </figure>
    </div>
    
  );
};
export default Loader;
