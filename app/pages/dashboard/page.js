"use client";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { useRouter } from "next/navigation";
import { createShortUrl, deleteUrls, getAllUrls, updateUrls, userSignIn } from "@/app/apis/apis";
import Link from 'next/link'
import Nav from "@/app/components/nav/nav";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Modal,
  Button,
  ModalHeader,
  ModalBody,
  ModalTitle,
} from "react-bootstrap";
import { toast, Toaster } from "react-hot-toast";
import { useSignin } from "@/app/context/signin";
import NotFound from "@/app/not-found";
import Loader from "@/app/components/loader/loader";

function Dashboard() {

  const[allUrlData,setAllUrlData]=useState([])
  const [showUpdateModal,setShowUpdateModal]=useState(false)
  const [showDeleteModal,setShowDeleteModal]=useState(false)
  const[redirectUrl,setRedirectUrl]=useState("")
  const[editShortId,setEditShortId]=useState("")
  const[deleteShortId,setDeleteShortId]=useState("")
  const [search, setSearch] = useState(false);
  const [searchedData, setSearchedData] = useState([]);
  const [searchedVal, setSearchedVal] = useState();
  const { signinValidity, setSigninValidity,logout,setLogout } = useSignin();


  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.min.js");
    const fetcher=async()=>{
      const tempAllUrlData=await getAllUrls()
      if(tempAllUrlData==undefined){
        
          toast.remove();
          toast.error("unexpected error !!! try again leter!!!");
        
      }
      else{
      setAllUrlData([...tempAllUrlData])
      }
    }
    fetcher()

  }, []);



  const handleUpdate=async(e)=>{
    e.preventDefault();
    const data={
      "redirectUrl":redirectUrl,
      "shortId":editShortId
    }
    const updatedData=await updateUrls(data)
    if(updatedData==undefined){
      toast.remove();
      toast.error("unexpected error !!! try again leter!!!");
    }else{
    const tempAllUrlData=allUrlData
    tempAllUrlData.forEach((taud)=>{
      if(taud?._id==updatedData?._id){
        taud.redirectUrl=updatedData?.redirectUrl
      }
    })
    setAllUrlData([...tempAllUrlData]) 
    setShowUpdateModal(false)
    toast.remove();
    toast.success("url updated successfully !!!");
  }
  }

  const handleDelete=async(e)=>{
    e.preventDefault();
    const data={
      "shortId":deleteShortId
    }
    const deletedData=await deleteUrls(data)
    if(deletedData==undefined){
      toast.remove();
      toast.error("unexpected error !!! try again leter!!!");
    }else{
    const tempAllUrlData=allUrlData
    tempAllUrlData.forEach((taud,ind)=>{
      if(taud?._id==deletedData?._id){
        tempAllUrlData.splice(ind,1)
      }
    })
    setAllUrlData([...tempAllUrlData]) 
    setShowDeleteModal(false)
    toast.remove();
    toast.success("url deleted successfully !!!");
  }
  }

  const handleSearch = (e) => {

    e.preventDefault();
    if (searchedVal === "") {
      setSearch(false);
    } else {
      setSearch(true);
      let searchedUrls = [];
      allUrlData.forEach((aud) => {
        if (aud?.shortId.includes(searchedVal)||aud?.redirectUrl.includes(searchedVal)) {
          searchedUrls.push(aud);
        }
      });
     
      setSearchedData([...searchedUrls]);
    }
  };

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
      <Nav />

          <div className="mt-5 ms-3 me-3">
      

      
          <div className="d-flex row">
            <div className="col fw-bold">Dashboard</div>
            <div className="col d-flex">
              <div class="input-group d-flex mb-3">
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    if (e.target.value === "") {
                      setSearch(false);
                    }
                    setSearchedVal(e.target.value);
                  }}
                  placeholder="Search"
                />
                <button
                  className="btn btn-outline-primary"
                  type="search"
                  id="button-addon2"
                  onClick={(e) => {
                    handleSearch(e);
                  }}
                >
                  Search
                </button>

              </div>
            </div>
          </div>

          
          <Modal
            show={showUpdateModal}
            onHide={() => {
              setShowUpdateModal(false);
            }}
            size="lg"
            centered
          >
            <Modal.Header
              className="border-0"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              closeButton
            >
              <Modal.Title>Update URL Data</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row gy-2">
                <div>
                  <div class="mb-2">
                    <label className="pb-1">Redirect Url</label>
                    <input
                      type="text"
                      className="form-control"
                      value={redirectUrl}
                      onChange={(e) => {
                        setRedirectUrl(e.target.value);
                      }}
                      placeholder="change redirect url"
                    />
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer
              className="border-0"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button variant="secondary" onClick={()=>{
                setShowUpdateModal(false)
              }}>
                Close
              </Button>
              <Button
                variant="primary"
                onClick={(e) => {
                  handleUpdate(e)
                }}
              >
                Update
              </Button>
            </Modal.Footer>
          </Modal>


          <Modal
            show={showDeleteModal}
            onHide={()=>{
              setShowDeleteModal(false)
            }}
            size="lg"
            centered
          >
            <ModalHeader
              className="border-0"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              closeButton
            >
              <ModalTitle>
                <h3>Delete Subcategory</h3>
              </ModalTitle>
            </ModalHeader>
            <ModalBody className="text-center">
              <h4>Are You sure delete this Subcategory?</h4>
              <span className="text-muted">
                You will not be able to revert this!
              </span>
            </ModalBody>
            <Modal.Footer
              className="border-0"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button variant="danger" onClick={()=>{
                setShowDeleteModal(false)
              }}>
                Close
              </Button>
              <Button
                variant="primary"
                onClick={(e) => {
                  handleDelete(e);
                }}
              >
                Yes, Delete it!
              </Button>
            </Modal.Footer>
          </Modal>

          <table className="table mt-5 p-4 w-70 text-center">
            <thead>
              <tr className="table-primary table-striped">
                <th scope="col">SN.</th>
                <th scope="col">Shorted URL</th>
                <th scope="col">Redirect URL</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
               {search && searchedData.length !== 0
                ? 
                searchedData.map((url, ind) => { 
                  return (
                  <tr>
                    <th scope="col">{ind+1}</th>
                    <th scope="col">
                      <Link href={`${process.env.NEXT_PUBLIC_API}/url/${url?.shortId}`}>{url?.shortId}</Link>
                    </th>
                    <th scope="col">
                      <p>{url?.redirectUrl}</p>
                    </th>
                    <th scope="col ">
                      <CreateIcon
                        className="text-primary border border-primary rounded me-2"
                        style={{ cursor: "pointer" }}
                        onClick={() => {

                          setShowUpdateModal(true)
                          setRedirectUrl(url?.redirectUrl)
                          setEditShortId(url?.shortId)
                        }}
                      />
                      <DeleteIcon
                        className="text-danger border border-danger cursor-pointer rounded"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                        setShowDeleteModal(true)
                        setDeleteShortId(url?.shortId)
                        }}
                      />
                    </th>
                  </tr>
                 );
                      
                  })
                :
              allUrlData.map((url, ind) => { 
              return (
              <tr>
                <th scope="col">{ind+1}</th>
                <th scope="col">
                  <Link href={`${process.env.NEXT_PUBLIC_API}/url/${url?.shortId}`}>{url?.shortId}</Link>
                </th>
                <th scope="col">
                  <p>{url?.redirectUrl}</p>
                </th>
                <th scope="col ">
                  <CreateIcon
                    className="text-primary border border-primary rounded me-2"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setRedirectUrl(url?.redirectUrl)
                      setShowUpdateModal(true)
                      setEditShortId(url?.shortId)
                    }}
                  />
                  <DeleteIcon
                    className="text-danger border border-danger cursor-pointer rounded"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                    setShowDeleteModal(true)
                    setDeleteShortId(url?.shortId)
                    }}
                  />
                </th>
              </tr>
             );
                  
              })}
            </tbody>
          </table>


          </div>
       

    </>
  )
            }
}

}

export default Dashboard