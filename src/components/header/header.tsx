import { useLocation } from 'react-router-dom'
import { My } from '../my/my'
import { HeadBack } from '../ui/headBack/headBack'
import style from './header.module.css'
export const Header=()=>{
  const location=useLocation()
  return <div className={style.box}>
    {location.pathname=='/main/chat'||<HeadBack className={style.back} to={'/main/chat'} state={{title:"IKUN交流群"}}></HeadBack>}
    <My></My>
    <div className={style.title}>{location.state.title}</div>
  </div>
}