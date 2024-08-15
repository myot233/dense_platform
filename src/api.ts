import axios from "axios";
import {API_ADDRESS, ImageType, type UserType} from "@/common";

const instance = axios.create({
    baseURL: API_ADDRESS + '/api/',
    timeout: 1000,

  });


export async function getUserInfo(token:string) {
   return await instance.post("info",{
        token:token
    })
}

export async function submitUserInfo(token:string,form:any) {
    return await instance.post("submitInfo",{
         token:token,
         form:form
     })
 }

export async function getAvatar(token:string) {
    return await instance.post("avatar",{
        token:token
    },{responseType: 'blob'})
}

export async function uploadAvatar(token:string,image:number) {
    return instance.post("submitAvatar",{
        token:token,
        id:image
    })
}

export function saveUser(){
    
}

export async function login(userName:string,passWord:string){
    return await instance.post("login",{
        username:userName,
        password:passWord
    })
}



export async function register(userName:string,passWord:string,type:UserType){
    return await instance.post("register",{
        username:userName,
        password:passWord,
        type:type,
    })
}


export async function submitReport(token:string,doctor:string,file:number[]) {
    return await instance.post("submitReport",{
        token:token,
        doctor:doctor,
        images:file
    })
    
}

export async function getDoctors(token:string){
    return await instance.post("doctors",{
        token:token
    })
}

export async function getReports(token:string){
    return await instance.post("getReports",{
        token:token,
    })
    
}

export async function getUserSimpleInfo(token:string){
    return await instance.post("user",{
        token:token,
    })
}

export async function getImagesOfReport(token:string,id:number,type:ImageType){
    return await instance.post("report/images",{
        token:token,
        id:id,
        type:ImageType
    })
    
    
}