import axios from "axios";
import type {UserType} from "@/common";

const instance = axios.create({
    baseURL: 'http://localhost:24552/api/',
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
         form:form.value
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


export async function submitReport(token:string,doctor:string,file:string) {
    return await instance.post("submitReport",{
        token:token,
        doctor:doctor,
        fileId:file
    })
    
}


export async function getReports(token:string){
    return await instance.post("getReports",{
        token:token,
    })
    
}