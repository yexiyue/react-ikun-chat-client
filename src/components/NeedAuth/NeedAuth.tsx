import { PropsWithChildren } from "react"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { RootState } from "../../store"

export const NeedAuth=(props:PropsWithChildren)=>{
  const userStore=useSelector((state:RootState)=>state.user)
  return <>
    {userStore.isLogin ? props.children:<Navigate to={'/login'} replace></Navigate>}
  </>
}