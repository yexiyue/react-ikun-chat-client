import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from './api/user.api'

export type FriendApply = {
  createAt: string
  id: number
  isFriend: boolean
  otherId: number
  isRefuse:boolean
  userId: number
  follower?:User
  following?:User
}

export const listSlice = createSlice({
  name: 'list',
  initialState: {
    searchList: <User[]>[],
    friendList: <FriendApply[]>[],
    applyFriend: <FriendApply[]>[],
    sendApplyList:<FriendApply[]>[]
  },
  
  reducers: {
    addSearch: (state, action: PayloadAction<User>) => {
      state.searchList.unshift(action.payload)
    },
    removeSearch: (state, action: PayloadAction<number>) => {
      const index = state.searchList.findIndex(
        (user) => user.id === action.payload
      )
      state.searchList.splice(index, 1)
    },
    //好友列表
    addFriendList: (state, action: PayloadAction<FriendApply[]>) => {
      if(action.payload.length>=0){
        state.friendList.splice(0,state.friendList.length,...action.payload)
      }
    },
    removeFriendList: (state, action: PayloadAction<number>) => {
      const index = state.friendList.findIndex(
        (user) => user.id === action.payload
      )
      state.friendList.splice(index, 1)
    },
    //接收的好友列表
    addApplyFriend(state, action: PayloadAction<FriendApply[]>){
      if(action.payload.length>=0){
        state.applyFriend.splice(0,state.applyFriend.length,...action.payload)
      }
    },
    
    removeApplyFriend: (state, action: PayloadAction<number>) => {
      const index = state.applyFriend.findIndex(
        (item) => item.id===action.payload
      )
      console.log(index)
      state.applyFriend.splice(index, 1)
    },

    //发送的好友列表
    addSendApplyFriend(state, action: PayloadAction<FriendApply[]>){
      if(action.payload.length>=0){
        state.sendApplyList.splice(0,state.sendApplyList.length,...action.payload)
      }
    },

    removeSendApplyFriend: (state, action: PayloadAction<number>) => {
      const index = state.sendApplyList.findIndex(
        (item) => item.id===action.payload
      )
      state.sendApplyList.splice(index, 1)
    },
  },
})

export const {
  addSearch,
  removeSearch,
  addFriendList,
  removeFriendList,
  addApplyFriend,
  removeApplyFriend,
  addSendApplyFriend,
  removeSendApplyFriend
} = listSlice.actions
