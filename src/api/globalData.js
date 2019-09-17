import {
	config,
	request
} from '@/util'
const {
	api
} = config;
let {
	global
} = api

let carStyleList = null;
export async function carStyle() {
  if(!carStyleList){
    return request({
      url: global.carStyle,
      method: 'get',
      data: {},
    }).then(res => {
      if(res.success){
        carStyleList  = res.data
      }
      return res
    })
  }
  return Promise.resolve({
    success: true,
    data: carStyleList,
  })

}
export async function carType(data) {
    return request({
      url: global.carType+'/'+data,
      method: 'get',
    })

}
