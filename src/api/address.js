import {
	config,
	request
} from '@/util'
const {
	api
} = config;
let {
	address
} = api

export async function addressAdd(params) {
	return request({
		url: address.add,
		method: 'post',
		data: params,
	})
}
export async function addressDelete(params) {
	return request({
		url: address.delete,
		method: 'post',
		data: params,
	})
}
export async function addressList(params) {
	return request({
		url: address.list,
		method: 'post',
		data: params,
	})
}
export async function addressDetail(params) {
	return request({
		url: address.detail,
		method: 'post',
		data: params,
	})
}
