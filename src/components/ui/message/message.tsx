import style from './message.module.css'
export const Message=(props:{
  message:string,
  warn?:boolean,
  danger?:boolean,
  success?:boolean
})=>{
  return <div className={`${style.box} ${props.warn?style.warn:props.danger?style.danger:style.success}`}>
    {props.message}
  </div>
}