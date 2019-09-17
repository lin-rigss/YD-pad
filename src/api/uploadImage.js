import axios from 'axios'
import { config } from "@/util";
export async function uploadImager(file,url=config.api.upload.img, name = 'file') {
  let params = new FormData()
  params.append(name, file);
  return axios({
    method: 'post',
    url: url,
    headers: {
      'Content-Type': "multipart/form-data"
    },
    data: params,
  }).then(res => {
    let response = res.data
    if(response.code == 0){
      return {
        success: true,
        data:response.data,
        message:"",
      } 
    }else{
      return {
        success: false,
        message:response.message
      }
    }
  }).catch(err => {
    return {
      success:false,
      message: err
    }
  })
}

export async function uploadgetVinByPic(file,url=config.api.upload.getVinByPic, name = 'file') {
  let params = new FormData()
  params.append(name, file);
  return axios({
    method: 'post',
    url: url,
    headers: {
      'Content-Type': "multipart/form-data"
    },
    data: params,
  }).then(res => {
    let response = res.data
    if(response.code == 0){
      return {
        success: true,
        data:response.data,
        message:"",
      } 
    }else{
      return {
        success: false,
        message:response.message
      }
    }
  }).catch(err => {
    return {
      success:false,
      message: err
    }
  })
}