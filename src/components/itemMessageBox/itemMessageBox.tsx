import { MutableRefObject, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { Messages } from '../../store/allMessage'
import { ItemMessage } from '../ItemMessage/ItemMessgae'
import style from './itemMessageBox.module.css'

export const ItemMessageBox=(props:{
  messages:Messages[],
})=>{
  const ref=useRef() as MutableRefObject<HTMLDivElement>
  const id=useSelector((state:RootState)=>state.user.user?.id)
  //设置自动滑到最底
  useEffect(()=>{
    ref.current.scrollTop=ref.current.scrollHeight
  })
  return <div ref={ref} className={style.box}>
    {props.messages.map((msg)=><ItemMessage key={msg.id} my={msg.userId===id} msg={msg}></ItemMessage>)}
  </div>
}