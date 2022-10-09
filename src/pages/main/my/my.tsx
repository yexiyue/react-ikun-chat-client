import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { Mask } from '../../../components/mask/mask'
import { MyButton } from '../../../components/ui/myButton/button'
import { RootState } from '../../../store'
import { useAddFriendMutation, useFindSendApplyByUniqueMutation, useUpdateFriendApplyMutation } from '../../../store/api/friend.api'
import { BASE_URL } from '../../../store/api/user.api'
import { removeApplyFriend, addSendApplyFriend, removeSearch } from '../../../store/list'
import { logout } from '../../../store/user'
import { ws } from '../chat/chat'
import style from './my.module.css'


export const MyContent=()=>{
  let user=useSelector((state:RootState)=>state.user.user)
  //获取当前用户id
  const oldUserId=user?.id
  const time=new Date(user!.creadeAt!)
  const navigate=useNavigate()
  
  const dispatch=useDispatch()
  //退出操作
  const logoutHandle=()=>{
    dispatch(logout())
    navigate('/')
  }

  const location=useLocation()
  console.log(location)
  
  const sendApplyList=useSelector((state:RootState)=>state.list.sendApplyList)
  
  const [isRefuse,setRefuse]=useState(false)
  const [isFriend,setFriend]=useState(false)

  if(location.state.user){
    user=location.state.user
  }
  if(location.state.friend){
    user=location.state.friend.follower
  }
  //发送好友请求
  const [addFriend,{isError,isLoading,isUninitialized}]=useAddFriendMutation()
  //发送查找发送的好友请求
  const [findRecord,]=useFindSendApplyByUniqueMutation()
  //更新好友请求
  const [updateFriend]=useUpdateFriendApplyMutation()

  const sendAddFriend=async()=>{
    const userId=oldUserId!
    const otherId=location.state.user.id
    const res:any=await addFriend({userId,otherId})
    if(res.data.meta.status===201){
      const data=await findRecord(oldUserId) as any
      console.log(data)
      setTimeout(()=>{
        navigate('/main/chat',{state:location.state})
        //向对方发送好友请求
        
        ws.sendFriendApply(otherId)
        //存进redux中
        dispatch(addSendApplyFriend(data.data.data))
        dispatch(removeSearch(otherId))

      },1000)
    }
  }
  if(isError){
    setTimeout(()=>{
      navigate('/main/chat',{state:location.state})
    },1000)
  }

  //同意逻辑
  const agreementHandle=async()=>{
    const res=await updateFriend({
      id: location.state.friend.id,
      isFriend: true,
      isRefuse: false
    }) as any
    dispatch(removeApplyFriend(res.data.id))
    navigate('/main/chat',{state:location.state})
  }

  const refuseHandle=async()=>{
    const res=await updateFriend({
      id: location.state.friend.id,
      isFriend: false,
      isRefuse: true
    }) as any
    dispatch(removeApplyFriend(res.data.id))
    navigate('/',{replace:true})

    ws.sendRefuseFriend(location.state.friend.userId)
  }
  return <div className={style.box}>
    {isError ?  <Mask error title={'已经发送过申请'}></Mask>:((isLoading || isUninitialized) || <Mask title='正在发送'></Mask>)}
    
    <div className={style.avatar}>
      <img src={user?.avatar ? `${BASE_URL}${user?.avatar}`:'/src/assets/1000.webp'} alt="头像" />
    </div>
    <div className={style.message}>
      <p>用户名：{user!.username}</p>
      <p>邮箱：{user!.email}</p>
      <p>创建时间：{time.toLocaleString('zh-CN',{month:'long',year:'2-digit',day:'numeric'})}</p>
      <div>
        <p>个人介绍：</p>
        <p className={style.description}>{user?.description}</p>
      </div>
    </div>
    <div>
      {
      (location.state.addFriend)
      ?<MyButton onClick={sendAddFriend} className={style.button}>添加好友</MyButton>
      :(location.state.friend && location.state.friend.userId===oldUserId && location.state.friend.isFriend===false && location.state.friend.isRefuse===false)
      ?<MyButton  className={`${style.button} ${style.wait}`}>正在等待对方同意</MyButton>
      :(location.state.friend && location.state.friend.isFriend===false && location.state.friend.isRefuse===false)
      ?<><MyButton className={style.button} onClick={agreementHandle}>同意</MyButton>
      <MyButton className={style.logout} onClick={refuseHandle}>拒绝</MyButton></>
      :<><MyButton className={style.button} onClick={()=>navigate('/main/modify',{state:{title:'修改信息'}})}>修改</MyButton>
      <MyButton className={style.logout} onClick={logoutHandle}>退出</MyButton></>}
    </div>
  </div>
}