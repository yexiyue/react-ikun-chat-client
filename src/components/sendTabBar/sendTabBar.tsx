import { useCallback, useId, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { WS } from '../../store/ws'
import { MyButton } from '../ui/myButton/button'
import { MyInput } from '../ui/myInput/input'
import style from './sendTabBar.module.css'
import { useLocation } from "react-router-dom"
export const SendTabBar=(props:{
  ws:WS
})=>{
  const iptId=useId()
  const user=useSelector((state:RootState)=>state.user.user)
  const [text,setText]=useState('');

  const location=useLocation()

  const sendMessage=useCallback((text:string)=>{
    if(!location.state.friend){
      props.ws.sendMessage({
        userId:user?.id!,
        content:text
      })
    }else if(location.state.friend.id){
      console.log({friendId:location.state.friend.id,content:text})
      props.ws.sendPrivateMessage({friendId:location.state.friend.id,content:text,userId:user.id})
    }
    setText('')
  },[text])

  return <div className={style.box}>
    <div className={style.sendBar}>
      <p>
        <label htmlFor={iptId}><span className='iconfont icon-tupian'></span></label>
        <input type="file" id={iptId}/>
      </p>
      <MyInput type='text' value={text} onChange={(e)=>setText(e.target.value)} className={style.input}></MyInput>
    </div>
    <MyButton className={style.button} onClick={()=>sendMessage(text)}>发送</MyButton>
  </div>
}