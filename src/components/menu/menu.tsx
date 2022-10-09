import {  useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { RootState } from '../../store'
import { useFriendApplicationsQuery, useFindSendApplyQuery } from '../../store/api/friend.api'
import { addApplyFriend, addSendApplyFriend } from '../../store/list'
import { SearchUser } from '../searchUser/searchUser'
import { ListItem } from './listItem/listItem'
import style from './menu.module.css'
import { MobilMenu } from './mobilMenu/mobilMenu'
export const Menu=()=>{
  const [width,setWidth]=useState(document.documentElement.offsetWidth)
  //监听页面大小改变
  useEffect(()=>{
    window.onresize=()=>{
      setWidth(document.documentElement.offsetWidth)
    }
  },[])
  const location=useLocation()
  const [flag,setFlag]=useState(false)
  
  const dispatch=useDispatch()
  //请求服务器列表数据
  const user=useSelector((state:RootState)=>state.user.user)
  const data1=useFriendApplicationsQuery(user?.id)
  const data2=useFindSendApplyQuery(user?.id)
  useEffect(()=>{
    if(data1.isSuccess && data2.isSuccess){
      if(data1.data.data.length>=0){
        dispatch(addApplyFriend(data1.data.data))
      }
      if(data2.data.data.length>=0){
        dispatch(addSendApplyFriend(data2.data.data))
      }
    }
  })
  
  //处理移动端菜单
  const clickHandle=()=>{
    setFlag(preValue=>!preValue)
  }
  const searchList=useSelector((state:RootState)=>state.list.searchList)
  const friendList=useSelector((state:RootState)=>state.list.friendList)
  const applyList=useSelector((state:RootState)=>state.list.applyFriend)
  const sendApplyList=useSelector((state:RootState)=>state.list.sendApplyList)
  
  //设置选中状态
  const [active,setActive]=useState(true)
  const [isActive,setIsActive]=useState(!active)

  return <div className={style.box}>

    {width<=700?location.pathname=='/main/chat'?<span onClick={clickHandle} className='iconfont icon-liebiao'></span>:false:<div className={style.logo}>
      <img src="/src/assets/v2-5e2f211c42ab117e6e7848737b55b257_r.jpg" alt="" />
    </div>}
    
    {
      width>=700&&
      <>
        <SearchUser></SearchUser>
        <div className={style.content}>
          {searchList.length!==0 && <p className={style.search}>查找过的用户</p>}
          <ul>
            {searchList.map(user=><ListItem active={active} key={user.username} user={user} addFriend></ListItem>)}
          </ul>

          {sendApplyList.length!==0 && <p className={style.search}>发送的申请</p>}
          <ul>
            {sendApplyList.map(item=><ListItem key={item.id} friend={item} user={item.following}></ListItem>)}
          </ul>

          {applyList.length!==0 && <p className={style.search}>好友申请</p>}
          <ul>
            {applyList.map(item=><ListItem key={item.id} friend={item} user={item.follower }></ListItem>)}
          </ul>

          <p className={style.search}>好友列表</p>
          <ul>
            <ListItem active ></ListItem>
            {friendList.map((item,index)=><ListItem isFriend={item.isFriend}  key={item.id} user={item.follower ?? item.following} friend={item} ></ListItem>)}
          </ul>
        </div>
      </>
      
    }
    {
      flag && 
      <>
      
      <MobilMenu>
      <SearchUser></SearchUser>
        {searchList.length!==0 && <p className={style.search}>查找过的用户</p>}
        <ul>
          {searchList.map(user=><ListItem key={user.id} user={user} setFlag={setFlag} addFriend></ListItem>)}
        </ul>

        {sendApplyList.length!==0 && <p className={style.search}>发送的申请</p>}
          <ul>
            {sendApplyList.map(item=><ListItem key={item.id} friend={item} user={item.following} setFlag={setFlag}></ListItem>)}
          </ul>

          {applyList.length!==0 && <p className={style.search}>好友申请</p>}
          <ul>
            {applyList.map(item=><ListItem key={item.id} friend={item} user={item.follower} setFlag={setFlag}></ListItem>)}
          </ul>

        <p className={style.search}>好友列表</p>
        <ul>
          <ListItem active setFlag={setFlag}></ListItem>
          {friendList.map((item,index)=><ListItem  key={item.id} isFriend={item.isFriend} setFlag={setFlag} user={item.follower ?? item.following} friend={item} ></ListItem>)}
        </ul>
      </MobilMenu>
      </>
    }
  </div>
}