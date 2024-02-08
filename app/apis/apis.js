import axios from 'axios';
import { useSignin } from '../context/signin';
const BASE_URL = process.env.NEXT_PUBLIC_API


const getToken = () => {
    let tempCookie = document.cookie.split(';')
    let token = ""
    tempCookie.forEach((cookie, i) => {
        if (cookie.includes("token")) {
            token = cookie.split("=")[1]
        }
    })
    return token
}

export const registerUser = async (data) => {
    let userData = {}
    try {
        await axios.post(`${BASE_URL}/auth/signup`,
            data
        )
            .then((response) => {

                userData = response?.data?.savedUserData

            })
    }
    catch (error) {
        console.log("err", error);
        userData = undefined

    }
    finally {
        return userData
    }
}

export const userSignIn = async (data) => {
    let result={
        token:"",
        email:""
    }
    try {
        await axios.post(`${BASE_URL}/auth/signin`,
            data
        )
            .then((response) => {
                result.token = response?.data?.token
                result.email = response?.data?.user?.email
            })
    }
    catch (error) {
        console.log(error);
        if (error.response.data?.error == "Password not matched") {
            result.token = error?.response?.data?.error
            result.email=undefined
        } else {
            result.token = undefined
            result.email=undefined
        }
    }
    finally {
        return result
    }
}

export const createShortUrl = async (data) => {
    let shortUrlData = {}
    const token = getToken()
    try {
        await axios.post(`${BASE_URL}/url/short-url`,
            data,
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        )
            .then((response) => {
                shortUrlData = response?.data?.urlData
            })
    }
    catch (error) {
        console.log(error);
        shortUrlData=undefined
    }
    finally {
        return shortUrlData
    }
}

export const getAllUrls = async () => {

    let allData = []
    const token = getToken()
    try {
        await axios.get(`${BASE_URL}/url/getAll`,

            {
                headers: { Authorization: `Bearer ${token}` }
            }
        )
            .then((response) => {
                allData = response?.data?.allData
            })
    }
    catch (error) {
        console.log(error);
        allData=undefined
    }
    finally {

        return allData
    }
}

export const updateUrls = async (data) => {

    let updatedData = {}
    const token = getToken()
    try {
        await axios.put(`${BASE_URL}/url/`, data,

            {
                headers: { Authorization: `Bearer ${token}` }
            }
        )
            .then((response) => {
                updatedData = response?.data?.updatedData
            })
    }
    catch (error) {
        console.log(error);
        updatedData=undefined
    }
    finally {

        return updatedData
    }
}

export const deleteUrls = async (data) => {

    let deletedData = {}
    const token = getToken()
    try {
        await axios.delete(`${BASE_URL}/url/`, {
            data: data,


            headers: { Authorization: `Bearer ${token}` }
        }
        )
            .then((response) => {
                deletedData = response?.data?.deletedData
            })
    }
    catch (error) {
        console.log(error);
        deletedData=undefined
    }
    finally {

        return deletedData
    }
}

export const allUsers = async () => {

    let allUsersData = {}
    const token = getToken()
    try {
        await axios.get(`${BASE_URL}/auth/`, {


            headers: { Authorization: `Bearer ${token}` }
        }
        )
            .then((response) => {
                allUsersData = response?.data?.allUserData
            })
    }
    catch (error) {
        console.log(error);
        allUsersData=undefined
    }
    finally {

        return allUsersData
    }
}

export const verifyToken=async()=>{
    let token=getToken()
    let result={
        email:"",
        verified:false
    }
   
    
try{
await axios.get(`${BASE_URL}/auth/verifyToken`,{


    headers: { Authorization: `Bearer ${token}` }
}).then((response) => {
   result.verified=response?.data?.success
   result.email=response?.data?.authData?.email 
})

}catch(error){
console.log(error)
result.verified=false
result.email=undefined
}finally{
return result
}
}