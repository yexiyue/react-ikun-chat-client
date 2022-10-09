import { ChangeEventHandler, useId, useState } from 'react'
import { useDispatch } from 'react-redux'
import {  useNavigate } from 'react-router-dom'
import { HeadBack } from '../../components/ui/headBack/headBack'
import { Message } from '../../components/ui/message/message'
import { MyButton } from '../../components/ui/myButton/button'
import { MyInput } from '../../components/ui/myInput/input'
import { useUserLoginMutation } from '../../store/api/user.api'
import { setUser } from '../../store/user'
import style from './login.module.css'

export const LoginPage=()=>{
  const navigator=useNavigate()
  const id1=useId()
  const id2=useId()

  const [userInfo,setUserInfo]=useState({
    email:'',
    password:''
  })

  const dispatch=useDispatch()

  const [userLogin,userLoginData]=useUserLoginMutation()
  const loginHandel=async ()=>{
    const res=await userLogin(userInfo) as any
    if(res.data.meta.status==200){
      dispatch(setUser(res.data.data))
      setTimeout(()=>{
        setUserInfo({
          email:'',
          password:''
        })
        navigator('/main/chat',{replace:true,state:{
          title:'IKUN交流群'
        }})
      },1500)
    }
  }

  const changeHandler=(attr:keyof typeof userInfo):ChangeEventHandler<HTMLInputElement>=>{
    const newInfo={...userInfo}
    return (e)=>{
      newInfo[attr]=e.target.value
      setUserInfo(newInfo)
    }
  }
  
  return <div className={style.box}>
    <HeadBack to='/'></HeadBack>
    {userLoginData.isError && <Message danger message={(userLoginData.error as any).data.meta.msg}></Message>}
    {userLoginData.isSuccess && <Message message={userLoginData.data.meta.msg}></Message>}
    <div className={style.content}>
      <h2 className={style.title}>登录</h2>
      <div className={style.inputBox}>
        <p><label htmlFor={id1}>邮箱</label></p>
        <MyInput onChange={changeHandler('email')} value={userInfo.email} type='email' placeholder='请输入邮箱' id={id1}></MyInput>
        <p><label htmlFor={id2}>密码</label></p>
        <MyInput onChange={changeHandler('password')} value={userInfo.password} type='password' placeholder='请输入密码' id={id2}></MyInput>
      </div>
      <div className={style.btn}>
        <MyButton origin onClick={loginHandel}>登录</MyButton>
      </div>
    </div>
  </div>
}