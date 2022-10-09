import { ChangeEventHandler } from "react"
import style from './input.module.css'
interface IProps{
  type:'text'|'email'|'password',
  onChange?:ChangeEventHandler<HTMLInputElement>,
  placeholder?:string,
  value?:any,
  className?:string,
  id?:any
}
export const MyInput=(props:IProps)=>{
  return (
    <input {...props} className={`${style.myinput} ${props.className}`}/>
  )
}