import {createContext} from 'react'
import { WS } from '../ws'

export const wsContext=createContext<{
  ws:WS
}>({
  ws:new WS
})