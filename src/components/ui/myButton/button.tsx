import { MouseEventHandler, PropsWithChildren } from "react"
import style from './button.module.css'
interface IProps extends PropsWithChildren{
  onClick?:MouseEventHandler,
  blue?:boolean,
  origin?:boolean,
  className?:string
}

export const MyButton=(props:IProps)=>{
  return (<button onClick={props.onClick} className={`${style.mybtn} ${props.className} ${props.blue?style.blue:''} ${props.origin?style.origin:''}`}>{props.children}</button>)
}