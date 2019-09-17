import axios from 'axios'
import lodash from 'lodash'
import { getUserInfor } from '@/util/dealStorage'
import { Toast } from 'vant';
import pathToRegexp from 'path-to-regexp'
import {router} from '../router.js';

// axios.defaults.withCredentials=true;
let token = ''
const fetch = (options) => {
  let {
    method = 'get',
    data,
    url
  } = options

  const cloneData = lodash.cloneDeep(data)

  if(!token){
    let user = getUserInfor()
    token = user.token
  }
  // console.log(token)
  try {
    let domin = ''
    if (url.match(/[a-zA-z]+:\/\/[^/]*/)) {
      domin = url.match(/[a-zA-z]+:\/\/[^/]*/)[0]
      url = url.slice(domin.length)
    }
    const match = pathToRegexp.parse(url)
    url = pathToRegexp.compile(url)(data)
    for (const item of match) {
      if (item instanceof Object && item.name in cloneData) {
        delete cloneData[item.name]
      }
    }
    url = domin + url
  } catch (e) {
    Toast(e.message)
  }

  switch (method.toLowerCase()) {
    case 'get':
      return axios.get(url, {
        params: cloneData,
        headers: {
          token: token
        }
      })
    case 'delete':
      return axios.delete(url, {
        data: cloneData
      })
    case 'post':
      return axios({
        method: 'post',
        url,
        data: cloneData,
        headers: {
          token: token
        }
      })
    case 'put':
      return axios({
        method: 'put',
        url,
        data: cloneData,
        headers: {
          token
        }
      })
    case 'patch':
      return axios.patch(url, cloneData)
    default:
      return axios(options)
  }
}

export default function request(options) {
  if (options.clearToken) {
    token = ''
    delete options.clearToken
  }

  return fetch(options).then((response) => {
    const {
      statusText,
      status
    } = response
    const {
      data
    } = response
    if (data.hasOwnProperty('code')) {
      if (data.code.toString() === '0' || data.code.toString() === '110') {
        // 成功
      } else if (data.code.toString() === '10002') {
        // 认证失效，跳回登录页
        // MessageBox.confirm(
        //   '您已被迫退出，请重新登录',
        //   '提示', {
        //     confirmButtonText: '重新登录',
        //     showCancelButton: false,
        //     type: 'warning',
        //     showClose: false,
        //     closeOnClickModal: false
        //   }
        // ).then(() => {
        //   store.dispatch('FedLogOut').then(() => {
        //     location.reload() // 为了重新实例化vue-router对象 避免bug
        //   })
        // })
        Toast.fail(data.message)
        return {
          success: false,
          statusCode: '403',
          message: data.message
        }
      } else if (data.code.toString() === '10005') { // 错误信息在data里面
        Toast(data.message)
        return {
          success: true,
          data: data.data,
          message: data.message
        }
      } else if (data.code.toString() === '403') { // 登录异常
        router.push('login')
        Toast('请先登录')
        return {
          success: true,
          data: data.data,
          message: data.message
        }
      } else {
        Toast(data.message)
        return {
          success: false,
          statusCode: 500,
          message: data.message
        }
      }
    }
    // eslint-disable-next-line no-unreachable
    return {
      success: true,
      message: statusText,
      statusCode: status,
      ...data
    }
  }).catch((error) => {
    const {
      response
    } = error
    let msg
    let statusCode
    if (response && response instanceof Object) {
      const {
        data,
        statusText
      } = response
      statusCode = response.status
      msg = data.message || statusText
    } else {
      statusCode = 600
      msg = error.message || 'Network Error'
    }
    return {
      success: false,
      statusCode,
      message: msg
    }
  })
}

export function clearToken() {
  if (token) {
    token = ''
  }
}
