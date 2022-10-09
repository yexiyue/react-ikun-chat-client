import { friendApi } from './api/friend.api';
import { listSlice } from './list';
import { allMessageSlice } from './allMessage';
import { userApi } from './api/user.api';
import { userSlice } from './user';
import {configureStore} from '@reduxjs/toolkit'

export const store=configureStore({
  reducer:{
    user:userSlice.reducer,
    [userApi.reducerPath]:userApi.reducer,
    allMessage:allMessageSlice.reducer,
    list:listSlice.reducer,
    [friendApi.reducerPath]:friendApi.reducer
  },
  middleware:(defaultMiddleware)=>defaultMiddleware()
    .concat(userApi.middleware)
    .concat(friendApi.middleware)
})

export type RootState=ReturnType<typeof store.getState>