import { ItemMessageBox } from "../../../components/itemMessageBox/itemMessageBox"
import { SendTabBar } from "../../../components/sendTabBar/sendTabBar"
import style from './chat.module.css'
/* import { ws } from "../../../store/ws" */
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../store"
import {  useContext, useEffect } from "react"
import { Messages, setMessages, setMessageUsers, setUsers } from "../../../store/allMessage"
import { User } from "../../../store/api/user.api"
import { useLocation } from "react-router-dom"
import { addApplyFriend,  FriendApply ,addSendApplyFriend,addFriendList} from "../../../store/list"
import React from 'react'
import { wsContext } from "../../../store/context/ctx"

export const Chat=React.memo(()=>{
  const user=useSelector((state:RootState)=>state.user.user)
  const allMsg=useSelector((state:RootState)=>state.allMessage)
  const dispatch=useDispatch()

  const {ws}=useContext(wsContext)

  //把当前用户发送到服务端
  const location=useLocation()
  
  console.log(location)
  ws.sendGetFriendList(user!.id!)
  useEffect(()=>{
    
    //获取服务器数据
    ws.getUsers((data:User[])=>{
      dispatch(setUsers(data))
    })
    ws.getAllMessage((data:Messages[])=>{
      dispatch(setMessages(data))
    })
    ws.getMessageUser((data:User[])=>{
      dispatch(setMessageUsers(data))
    })
    ws.getFriendApply((data:FriendApply[])=>{
      console.log(1111,data)
      dispatch(addApplyFriend(data))
    })
    ws.getRefuseRecord((data:FriendApply[])=>{
      console.log(2222,data)
      dispatch(addSendApplyFriend(data))
    })

    ws.getFriendList((data:FriendApply[])=>{
      console.log(2222,data)
      dispatch(addFriendList(data))
    })

    if(user?.token){
      ws.sendUser(user!)
    }
  },[])

  return <div className={style.box}>
    {<ItemMessageBox messages={location.state?.friend?.messages ?? allMsg.messages}></ItemMessageBox>}
    <SendTabBar ws={ws}></SendTabBar>
  </div>
})