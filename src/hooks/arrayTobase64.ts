export const useArrToBase64=()=>{
  return (data:ArrayBuffer|undefined)=>{
    if(data){
      let binary=''
      let bytes=new Uint8Array(data)
      let len=bytes.byteLength
      for(let i=0;i<len;i++){
        binary+=String.fromCharCode(bytes[i])
      }
      return `data:image/png;base64,${window.btoa(binary)}`
    }else{
      return undefined
    }
  }
}