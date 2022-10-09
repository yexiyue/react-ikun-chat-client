import { RootState } from './../index';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { FriendApply } from '../list';


export const friendApi=createApi({
  reducerPath:'friendApi',
  baseQuery:fetchBaseQuery({
    baseUrl:'http://10.44.18.71:3557/api',
    prepareHeaders(header,api){
      const state=api.getState() as RootState
      header.append('Authorization',state.user.user?.token!)
      return header
    }
  }),
  endpoints:(build)=>{
    return {
      addFriend:build.mutation({
        query(arg:{userId:number,otherId:number}) {
          return {
            url:'/friend/add',
            body:{
              userId:arg.userId,
              otherId:arg.otherId,
            },
            method:'post'
          }
        },
      }),
      friendApplications:build.query({
        query:(id)=>`/friend/friend/${id}`,
      }),
      findSendApply:build.query({
        query:(id)=>`/friend/apply/${id}`,
      }),
      findSendApplyByUnique:build.mutation({
        query:(id)=>({
          url:`/friend/apply`,
          method:'post',
          body:id
        }),
      }),
      updateFriendApply:build.mutation({
        query(arg:Pick<FriendApply,'id'|'isFriend'|'isRefuse'>) {
          return {
            method:'post',
            body:arg,
            url:'/friend/update'
          }
        },
      })
    }
  }
})


export const {
  useAddFriendMutation,
  useFindSendApplyQuery,
  useFriendApplicationsQuery,
  useFindSendApplyByUniqueMutation,
  useUpdateFriendApplyMutation
}=friendApi
