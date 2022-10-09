import { io, Socket } from 'socket.io-client';
import { User } from '../api/user.api';

class WS{
  public socket:Socket
  public callbacks=new Map<string,((...args:any[])=>any)[]>()
  constructor(){
    this.socket=io('ws://10.44.18.71:3558',{
      transports:['websocket']
    })
    //获取用户列表
    this.socket.on('id_user',(data: any)=>{
      const callbacks=[...this.callbacks.get('id_user')!]
      callbacks.forEach(cb=>cb(data))
    })

    //获取群聊消息
    this.socket.on('message_all',(data: any)=>{
      const callbacks=[...this.callbacks.get('message_all')!]
      callbacks.forEach(cb=>cb(data))
    })
  
    //获取消息对应的用户
    this.socket.on('message_user',(data)=>{
      const callbacks=[...this.callbacks.get('message_user')!]
      callbacks.forEach(cb=>cb(data))
    })

    //获取好友请求
    this.socket.on('friend_applications',(data)=>{
      const callbacks=[...this.callbacks.get('friend_applications')!]
      callbacks.forEach(cb=>cb(data))
    })

    this.socket.on('refuse_friend_record',(data)=>{
      const callbacks=[...this.callbacks.get('refuse_friend_record')!]
      callbacks.forEach(cb=>cb(data))
    })

    this.socket.on('get_friend_list',(data)=>{
      const callbacks=[...this.callbacks.get('get_friend_list')!]
      callbacks.forEach(cb=>cb(data))
    })
  }

  use(key:string,cb:(...args:any[])=>any){
    if(!this.callbacks.has(key)){
      this.callbacks.set(key,[])
    }
    if(!this.callbacks.get(key)?.includes(cb)){
      this.callbacks.get(key)?.push(cb)
    }
  }

  sendUser(user:User){
    this.socket.emit('id_map_user',user)
  }
  sendMessage(data:{userId:number,content:string}){
    this.socket.emit('all_text_message',data)
  }

  //发送好友申请
  sendFriendApply(id:number){
    this.socket.emit('send_friend_apply',id)
  }
  
  //发送拒绝好友
  sendRefuseFriend(id:number){
    this.socket.emit('refuse_friend_apply',id)
  }
  /* disPatch(){
    this.socket.emit()
  } */

  //发送添加好友列表
  sendPrivateMessage(data:{friendId:number,content:string}){
    console.log(data)
    this.socket.emit('send_private_message',data)
  }

  //发送单聊
  sendGetFriendList(id:number){
    this.socket.emit('get_friend_list',id)
  }
  getFriendList(cb:(...args:any[])=>any){
    this.use('get_friend_list',cb)
  }

  getUsers(cb:(...args:any[])=>any){
    this.use('id_user',cb)
  }

  getAllMessage(cb:(...args:any[])=>any){
    this.use('message_all',cb)
  }

  getMessageUser(cb:(...args:any[])=>any){
    this.use('message_user',cb)
  }

  getFriendApply(cb:(...args:any[])=>any){
    this.use('friend_applications',cb)
  }

  getRefuseRecord(cb:(...args:any[])=>any){
    this.use('refuse_friend_record',cb)
  }
}

//不可取
/* class WS{
  public socket=io('ws://10.44.18.71:3558',{
    transports:['websocket']
  })
  
  sendUser(user:User){
    this.socket.emit('id_map_user',user)
  }
  sendMessage(data:{userId:number,content:string}){
    this.socket.emit('all_text_message',data)
  }

  async getUsers():Promise<Record<number,User>>{
    return new Promise((resolve,reject)=>{
        //获取用户列表
      this.socket.on('id_user',(data:Record<number,User>)=>{
        resolve(data)
      })
    })
  }

  async getAllMessage():Promise<Messages[]>{
    return new Promise((resolve)=>{
      //获取群聊消息
      this.socket.on('message_all',(data:Messages[])=>{
        resolve(data)
      })
    })
  }

  
} */
/* const ws=new WS()
export {ws} */

export {WS}
