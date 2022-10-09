import { ChangeEventHandler, useId, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { HeadBack } from '../../components/ui/headBack/headBack'
import { Message } from '../../components/ui/message/message'
import { MyButton } from '../../components/ui/myButton/button'
import { MyInput } from '../../components/ui/myInput/input'
import { useUserRegisterMutation } from '../../store/api/user.api'
import { setUser } from '../../store/user'
import style from './register.module.css'
export const RegisterPage = () => {
  const [flag, setFlag] = useState(true)
  const navigator = useNavigate()
  const id1 = useId()
  const id2 = useId()
  const id3 = useId()

  const dispatch=useDispatch()

  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    password: '',
  })

  //发送注册请求
  const [registerUser, registerData] = useUserRegisterMutation()

  //注册成功跳转
  const registerHandler = async () => {
    if(!flag)return
    const res = (await registerUser(userInfo)) as any
    if (res.data.meta.status == 201) {
      dispatch(setUser(res.data.data))
      setTimeout(() => {
        setUserInfo({
          username: '',
          email: '',
          password: '',
        })
        navigator('/main/chat', { replace: true ,state:{title:'IKUN交流群'}})
      }, 1500)
    }
  }

  const changeHandler = (
    attr: keyof typeof userInfo
  ): ChangeEventHandler<HTMLInputElement> => {
    const newInfo = { ...userInfo }
    return (e) => {
      newInfo[attr] = e.target.value
      setUserInfo(newInfo)
      if(attr=='email'){
        const regExp=/^[0-9A-z_-]+@[0-9A-z\-\.]+\.[A-z]{2,4}$/g
        setFlag(regExp.test(e.target.value))
      }
      if(e.target.value.trim().length===0){
        setFlag(true)
      }
    }
  }

  return (
    <div className={style.box}>
      <HeadBack to="/"></HeadBack>
      {registerData.isError && (
        <Message
          danger
          message={(registerData.error as any).data.meta.msg}
        ></Message>
      )}
      {registerData.isSuccess && (
        <Message message={registerData.data.meta.msg}></Message>
      )}
      <div className={style.content}>
        <h2 className={style.title}>注册</h2>
        <div className={style.inputBox}>
          <p>
            <label htmlFor={id3}>昵称</label>
          </p>
          <MyInput
            onChange={changeHandler('username')}
            value={userInfo.username}
            type="text"
            placeholder="请输入昵称"
            id={id3}
          ></MyInput>
          <p>
            <label htmlFor={id1}>邮箱</label>
          </p>
          <MyInput
            onChange={changeHandler('email')}
            value={userInfo.email}
            type="email"
            placeholder="请输入邮箱"
            id={id1}
          ></MyInput>
          {flag || <p className={style.error}>请输入正确的邮箱</p>}
          <p>
            <label htmlFor={id2}>密码</label>
          </p>
          <MyInput
            onChange={changeHandler('password')}
            value={userInfo.password}
            type="password"
            placeholder="请输入密码"
            id={id2}
          ></MyInput>
        </div>
        <div className={style.btn}>
          <MyButton blue onClick={registerHandler}>
            注册
          </MyButton>
          
        </div>
      </div>
    </div>
  )
}
