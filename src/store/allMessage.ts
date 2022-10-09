import { User } from './api/user.api'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type Messages = {
  content: string
  createAt: string
  id: number
  image: null
  userId: number
}

export const allMessageSlice = createSlice({
  name: 'allMessage',
  initialState: {
    onlinePeople: 0,
    users: <Record<number,User>>{},
    messages: <Messages[]>[],
    messageUsers:<Record<number,User>>{}
  },
  reducers: {
    setUsers(state,action:PayloadAction<Record<number,User>>){
      state.onlinePeople=Object.entries(action.payload).length
      state.users=action.payload
    },
    setMessages(state,action:PayloadAction<Messages[]>){
      state.messages=action.payload
    },
    setMessageUsers(state,action:PayloadAction<Record<number,User>>){
      state.messageUsers=action.payload
      for(let i in state.users){
        state.messageUsers[i]=state.users[i]
      }
    }
  },
})

export const {setMessages,setUsers,setMessageUsers}=allMessageSlice.actions