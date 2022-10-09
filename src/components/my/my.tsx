import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../../store'
import style from './my.module.css'
export const My=()=>{
  const navigate=useNavigate()
  const user=useSelector((state:RootState)=>state.user.user)
  return <div className={style.box} onClick={()=>navigate('/main/my',{replace:true,state:{title:'我的信息',user}})}>
    <span className='iconfont icon-wode'></span>
  </div>
}