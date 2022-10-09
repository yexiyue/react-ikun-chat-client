import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { RootState } from '../../store'
import { Messages } from '../../store/allMessage'
import { friendApi } from '../../store/api/friend.api'
import { BASE_URL } from '../../store/api/user.api'
import style from './itemMessage.module.css'

export const ItemMessage=(props:{
  my?:boolean,
  msg:Messages
})=>{
  const users=useSelector((state:RootState)=>state.allMessage.messageUsers)
  const userId=props.msg.userId
  const friendList=useSelector((state:RootState)=>state.list.friendList)
  let user=users[userId]
  const location=useLocation()
  if(!user){
    const friendId=location.state.friend.id
    const friend=friendList.filter(item=>item.id===friendId)
    if(friend.following){
      user=friend.following
    }else{
      user=friendApi.follower
    }
  }
  return <div className={`${style.box} ${props.my?style.my:''}`}>
    
    {!props.my && <div className={style.avatar}>
      <img src={user?.avatar ? `${BASE_URL}${user?.avatar}`:'/src/assets/1000.webp'}/>
    </div>}
    <div className={`${style.content} ${props.my?style.marginRight:''}`}>
      <p className={`${props.my?style.right:''}`}>{user.username ?? false}</p>
      <div className={style.message}>
        {props.msg.content ?? false}
      </div>
    </div>

    {props.my && <div className={style.avatar}>
      <img src={user?.avatar ? `${BASE_URL}${user?.avatar}`:'/src/assets/1000.webp'}/>
    </div>}
  </div>
}