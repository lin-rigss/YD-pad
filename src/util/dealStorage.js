const userInfor = 'USER_INFOR'
const currentAddress = 'CURRENT_ADDRESS'
export function saveUserInfor(data) {
  let user = ''
  if (data) {
    user = JSON.stringify(data)
    localStorage.setItem(userInfor, user)
  }else{
    localStorage.setItem(userInfor, '')
  }
}

export function getUserInfor() {
  let user = localStorage.getItem(userInfor)
  if (user) {
    // console.log(user)
    return JSON.parse(user)    
  } else {
    return {}
  }
}

export function deletdUserInfor() {
  localStorage.setItem(userInfor, '')
}

// 当前地址管理
export function saveAddress(data) {
  let address = ''
  if (data) {
    address = JSON.stringify(data)
    localStorage.setItem(currentAddress, address)
  }else{
    localStorage.setItem(currentAddress, '')
  }
}

export function getAddress() {
  let address = localStorage.getItem(currentAddress)
  if (address) {
    return JSON.parse(address)
  } else {
    return {}
  }
}