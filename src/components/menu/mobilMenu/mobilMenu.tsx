import { PropsWithChildren } from "react"
import ReactDOM from "react-dom"
import style from './mobileMenu.module.css'
export const MobilMenu=(props:PropsWithChildren)=>{
  return ReactDOM.createPortal(<div className={style.box}>
    <div className={style.content}>
      <div className={style.title}>好友列表</div>
      <div className={style.body}>
        {props.children}
      </div>
    </div>
  </div>,document.getElementById('mobile')as HTMLElement)
}