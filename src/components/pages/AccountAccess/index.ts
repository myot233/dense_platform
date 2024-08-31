import type {UserType} from "@/common";


export type LoginForm = {
    account:string, 
    password:string
}

export type RegisterForm = {
    account:string, 
    type:UserType, 
    password:string,
    pssswordRepeat:string
}