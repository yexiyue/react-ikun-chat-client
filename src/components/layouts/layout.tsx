import { PropsWithChildren } from "react"

import './layout.css'
export const Layout=(props:PropsWithChildren)=>{
  return <div>
    {props.children}
  </div>
}