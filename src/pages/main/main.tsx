import { Menu } from "../../components/menu/menu"
import { Header } from "../../components/header/header"
import { Content } from "../../components/content/content"
import style from './main.module.css'
import { wsContext } from "../../store/context/ctx"
import { WS } from "../../store/ws"
export const MainPage=()=>{
  return (
    <wsContext.Provider value={{ws:new WS}}>
      <div className={style.box}>
        <Menu></Menu>
        <div className={style.content}>
          <Header></Header>
          <Content></Content>
        </div>
      </div>
    </wsContext.Provider>
  )
}