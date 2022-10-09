import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { MyButton } from '../../components/ui/myButton/button'
import { RootState } from '../../store'
import { useUserCountQuery } from '../../store/api/user.api'
import style from './home.module.css'

export const HomePage=()=>{
  const navigator=useNavigate()
  const isLogin=useSelector((state:RootState)=>state.user.isLogin)
  const {data,isError,isSuccess}=useUserCountQuery('')

  useEffect(()=>{
    if(isLogin){
      navigator('/main/chat',{
        replace:true,
        state:{
          title:'IKUN交流群'
        }
      })
    }
  },[isLogin])
  return <div className={style.box}>
    <div className={style.content}>
      <h2 className={style.title}>IKUN Chat Room</h2>
      <p className={style.contentP}>我是练习时长两年半的个人练习生蔡徐坤，喜欢唱跳rap,篮球</p>
      <p className={style.contentP}> 赶快开始和真爱粉的聊天之旅吧</p>
      {isSuccess && <p className={style.all}> 当前注册用户{data.data}人</p>}
      <div className={style.btn}>
        <MyButton origin onClick={()=>navigator('/login')}>登录</MyButton>
        <MyButton blue onClick={()=>navigator('/register')}>注册</MyButton>
      </div>
    </div>
  </div>
}