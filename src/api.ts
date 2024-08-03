import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:24552/api/',
    timeout: 1000,

  });


export async function getUserInfo(token:string) {
   return await instance.post("info",{
        token:token
    })
}



export function saveUser(){
    
}

export function login(userName:string,passWord:string){
    instance.post("login",{
        username:userName,
        password:passWord
    }).then(response=>{
        
        document.cookie = `token=${response.data.token}`
    })
}

