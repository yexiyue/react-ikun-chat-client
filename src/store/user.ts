import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { User } from './api/user.api'

export const userSlice=createSlice({
  name:'user',
  initialState:{
    user:JSON.parse(localStorage.getItem('user') || '{}') as User|null,
    isLogin:(JSON.parse(localStorage.getItem('user') || '{}') as User).token?true:false
  },
  reducers:{
    setUser:(state,action:PayloadAction<User>)=>{
      state.user=action.payload
      state.isLogin=true
      localStorage.setItem('user',JSON.stringify(state.user))
    },
    logout:(state)=>{
      state.user=null
      state.isLogin=false
      localStorage.removeItem('user')
    }
  }
})

export const {setUser,logout}=userSlice.actions