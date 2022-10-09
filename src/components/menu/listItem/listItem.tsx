import { Dispatch, SetStateAction } from 'react'
import { useNavigate } from 'react-router-dom'
import { BASE_URL, User, userApi } from '../../../store/api/user.api'
import { FriendApply } from '../../../store/list'
import style from './listItem.module.css'

export const ListItem=(props:{
  active?:boolean,
  user?:User,
  setFlag?:Dispatch<SetStateAction<boolean>>,
  addFriend?:boolean,
  friend?:FriendApply,
  isFriend?:boolean
})=>{
  const navigate=useNavigate()
  console.log(props)

  const clickHandle=()=>{
    if(props.setFlag){
      props.setFlag(false)
    }
    if(props.isFriend){
      navigate('/main/chat',{
        state:{
          title:props.user?.username,
          user:props.user,
          friend:props.friend
        }
      })
    }else if(props.addFriend){
      navigate('/main/my',{
        state:{
          title:props.user?.username,
          user:props.user,
          addFriend:true
        }
      })
    }else if(props.friend){
      navigate('/main/my',{
        state:{
          title:props.user?.username ?? 'IKUN交流群',
          friend:props.friend
        }
      })
    }else if(props.user){
      navigate('/main/chat',{
        state:{
          title:props.user?.username,
          user:props.user
        }
      })
    }else{
      navigate('/main/chat',{
        state:{
          title:'IKUN交流群',
        }
      })
    }

  }

  return <li onClick={clickHandle} className={`${style.box} ${props.active?style.active:''}`}>
      <div className={style.avatar}>
        <img src={props?.user?.avatar ? `${BASE_URL}${props?.user?.avatar}`:'/src/assets/1000.webp'}/>
      </div>
      <div className={style.content}>
        <p>{props?.user?.username ?? 'IKUN交流群'}</p>
        <p>{props?.user?.description ?? '真爱粉聚集地'} </p>
      </div>
  </li>
}