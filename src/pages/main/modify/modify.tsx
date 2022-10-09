import { ChangeEventHandler, MutableRefObject, useCallback, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Mask } from '../../../components/mask/mask'
import { MyButton } from '../../../components/ui/myButton/button'
import { useArrToBase64 } from '../../../hooks/arrayTobase64'
import { RootState } from '../../../store'
import { BASE_URL, UserData, useUserModifyMutation } from '../../../store/api/user.api'
import { setUser } from '../../../store/user'
import style from './modify.module.css'

const formData=new FormData()
export const Modify=()=>{
  const user=useSelector((state:RootState)=>state.user.user)
  const ref=useRef() as MutableRefObject<HTMLImageElement>
  const time=new Date(user!.creadeAt!)
  const navigate=useNavigate()

  //发送修改请求
  const [modify,modifyData]=useUserModifyMutation()
  const [userDescription,setDescription]=useState(user?.description)

  //获取图片
  const imageHandle:ChangeEventHandler<HTMLInputElement>=async(e)=>{
    const file=e.target.files![0]
    //添加进表单
    formData.set('file',file)
    console.log(formData.get('file'))
    //预览头像
    const fileReader=new FileReader()
    fileReader.readAsArrayBuffer(file)
    fileReader.onload=(e)=>{
      const blob=new Blob([e.target?.result!])
      //转换成链接
      ref.current.src=URL.createObjectURL(blob)
    }
  }

  //顺便修改redux的数据
  const dispatch=useDispatch()

  //修改主逻辑
  const modifyBtnHandle=async ()=>{
    //发送请求
    formData.set('description',userDescription!)
    console.log(formData.get('description'))
    console.log(formData.get('file'))
    const res=await modify({
      id:user?.id!,
      data:formData
    }) as {data:UserData}
    //成功就跳回主页
    setTimeout(()=>{
      if(res.data.meta.status==201){
        dispatch(setUser(res.data.data))
        navigate('/main/my',{replace:true,state:{
          title:'我的信息'
        }})
      }
    },1000)
  }

  return <div className={style.box}>
    {(modifyData.isLoading || modifyData.isUninitialized) || <Mask></Mask>}
    {modifyData.isError &&<Mask error title='修改失败，请刷新重新修改'></Mask> }
    <div className={style.avatar}>
      <label htmlFor="chooseFile"><img ref={ref} src={user?.avatar ? `${BASE_URL}${user?.avatar}`:'/src/assets/1000.webp'} alt="头像" /></label>
      <input type="file" id='chooseFile' onChange={imageHandle}/>
    </div>
    <div className={style.message}>
      <p>用户名：</p>
        <p>{user!.username}</p>
      <p>邮箱：</p>
        <p>{user!.email}</p>
      <p>创建时间：</p>
        <p>{time.toLocaleString('zh-CN',{month:'long',year:'2-digit',day:'numeric'})}</p>
      <div>
        <p>个人介绍：<textarea placeholder='请输入个人介绍' onChange={(e)=>setDescription(e.target.value)} value={userDescription}/></p>
      </div>
    </div>
    <div>
      <MyButton className={style.button} onClick={modifyBtnHandle}>保存</MyButton>
    </div>
  </div>
}