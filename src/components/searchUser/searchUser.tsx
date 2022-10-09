import { useCallback, useState } from "react"
import { useUserSearchMutation } from "../../store/api/user.api"
import { MyButton } from "../ui/myButton/button"
import { MyInput } from "../ui/myInput/input"
import style from './searchUser.module.css'
import {Mask} from '../mask/mask'
import { useDispatch } from "react-redux"
import { addSearch } from "../../store/list"
export const SearchUser=()=>{

  const [username,setUsername]=useState('')
  const [searchUser,{isError,isLoading}]=useUserSearchMutation()
  const [isFlag,setFlag]=useState(false)

  const dispatch=useDispatch()

  const clickHandle=useCallback(async()=>{
    
    const res=await searchUser(username) as any
    setUsername('')
    console.log(res)
    if(!res.data.data.length){
      setFlag(true)
      setTimeout(()=>{
        setFlag(false)
      },1500)
      return
    }
    dispatch(addSearch(res.data.data[0]))
  },[username])

  return <div className={style.search}>
    {isError&&<Mask error title="服务器异常"></Mask>}
    {isLoading&&<Mask></Mask>}
    {isFlag&&<Mask title="该用户不存在"></Mask>}
    <span className={`iconfont icon-sousuo ${style.span}`}></span>
    <MyInput value={username} onChange={(e)=>setUsername(e.target.value)} type="text" className={style.input} placeholder='请输入要查找的用户名'></MyInput>
    <MyButton onClick={clickHandle} className={style.button}>查找</MyButton>
  </div>
}