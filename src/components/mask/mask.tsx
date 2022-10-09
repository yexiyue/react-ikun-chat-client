import ReactDOM from "react-dom"
import style from './mask.module.css'

export const Mask=(props:{
  title?:string,
  error?:boolean
})=>{
  return ReactDOM.createPortal(<div className={style.box}>
    <div className={style.content}>
      <p><span className={`iconfont icon-icon- ${props.error?style.error:''}`}></span></p>
      <p className={`${props.error?style.error:''}`}>{props.title??'正在加载...'}</p>
    </div>
  </div>,document.getElementById('mask') as HTMLElement)
}