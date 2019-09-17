import {
	config,
	request
} from '@/util'
const {
	api
} = config;
let {
	user
} = api

export async function checkAccount(params) {
	return request({
		url: user.checkAccount,
		method: 'post',
		data: params,
	})
}

export async function saveAppid(params) {
	return request({
		url: user.saveAppid,
		method: 'post',
		data: params,
	})
}

export async function loginByAccount(params) {
	return request({
		url: user.loginByAccount,
		method: 'post',
		// data: params
		data: {
            ...params,
            clientType: "employee",
            validType:"sim"
        }
	})
}

export async function resetPassword(params) {
	return request({
		url: user.resetPassword,
		method: 'post',
		// data: params,
		data: {
            ...params,
            clientType: "employee",
            validType:"sim"
        }
	})
}

export async function loginByMobile(params) {
	return request({
		url: user.loginByMobile,
		method: 'post',
		data: {
            ...params,
            clientType: "employee",
            validType:"sim"
        }
	})
}
export async function register(params) {
	return request({
		url: user.registe,
		method: 'post',
		// data: params,
		data: {
            ...params,
            clientType: "employee",
            validType:"sim"
        }
	})
}

export async function getSim(params) {
	return request({
		url: user.getSim,
		method: 'post',
		data: params,
	})
}
