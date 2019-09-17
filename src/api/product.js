import {
	config,
	request
} from '@/util'
const {
	api
} = config;
let {
	product
} = api

export async function factoryList(params) {
	return request({
		url: product.factoryList,
		method: 'get',
		data: params,
	})
}

export async function goodsList(params) {
	return request({
		url: product.goodsList,
		method: 'get',
		data: params,
	})
}

