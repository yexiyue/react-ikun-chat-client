import { RootState } from './../index';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react'

export const BASE_URL='http://10.44.18.71:3557/'

export interface UserData {
  data: User;
  meta: Meta;
}


export interface User {
  avatar?:   string;
  creadeAt?: string;
  email:    string;
  id?:       number;
  password: string;
  token?:    string;
  username: string;
  description?:string;
  follower?:User
  following?:User
}

export interface Meta {
  msg:    string;
  status: number;
}

export const userApi=createApi({
  reducerPath:'userApi',
  baseQuery:fetchBaseQuery({
    baseUrl:'http://10.44.18.71:3557/api',
    prepareHeaders(headers, api) {
      if(api.endpoint!=='userRegister' && api.endpoint!=='userLogin'){
        const state=api.getState() as RootState
        headers.append('Authorization',state.user.user?.token!)
      }
      return headers
    },
  }),
  endpoints:(build)=>{
    return {
      userRegister:build.mutation<UserData,Pick<User,'email'|'password'|'username'>>({
        query(arg:Pick<User,'email'|'password'|'username'>) {
          return {
            url:'/user/register',
            method:'post',
            body:arg
          }
        },
        transformResponse(baseQueryReturnValue:UserData, meta, arg) {
          return baseQueryReturnValue
        },
      }),
      userLogin:build.mutation<UserData,Pick<User,'email'|'password'>>({
        query(arg) {
          return {
            url:'/user',
            method:'post',
            body:arg
          }
        },
      }),
      userModify:build.mutation({
        query(arg:{id:number,data:FormData}) {
          return {
            url:'/user/'+arg.id,
            method:'post',
            /* headers:{
              'Content-Type':'multipart/form-data'
            }, */
            body:arg.data,
            //这里添加token会卡，因为序列需要时间
            /* headers:{
              'Authorization':JSON.parse(localStorage.getItem('user')!).token
            } */
          }
        },
      }),
      userCount:build.query({
        query:()=>({
          method:'get',
          url:'/count'
        }),
        keepUnusedDataFor:0
      }),
      userSearch:build.mutation({
        query(arg:string) {
          return {
            url:'/search',
            method:'post',
            body:{
              username:arg
            }
          }
        },
      })
    }
  }
})

export const {
  useUserRegisterMutation,
  useUserLoginMutation,
  useUserModifyMutation,
  useUserCountQuery,
  useUserSearchMutation
}=userApi