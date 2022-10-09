import { useLocation, useNavigate } from 'react-router-dom'
import style from './headBack.module.css'
export const HeadBack=(props:{
  className?:string,
  to:string,
  state?:any
})=>{
  
  const navigate=useNavigate()
  return <div className={`${style.box} ${props.className}`}>
    <p onClick={()=>navigate(props.to,{state:props.state})}><span className="iconfont icon-fanhui"></span></p>
  </div>
}