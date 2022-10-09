import { Outlet } from 'react-router-dom'
import style from './content.module.css'
export const Content=()=>{
  return <div className={style.box}>
    <Outlet></Outlet>
  </div>
}