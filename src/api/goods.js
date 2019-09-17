import {
	config,
	request
} from '@/util'
const {
	api
} = config;
let {
	goods
} = api



// 严选验货 —— 获取详情  
export async function getParts(params) {
	return request({
		url: goods.getParts,
		method: 'get',
		data: params,
	})
}

// 严选验货 —— 验货提交
export async function staff(params) {
	return request({
		url: goods.staff,
		method: 'post',
		data: params,
	})
}



// 严选入库 —— 仓位
export async function tree(params) {
	return request({
		url: goods.tree,
		method: 'get',
		data: params,
	})
}

// 严选入库 —— 入库
export async function stock(params) {
	return request({
		url: goods.stock,
		method: 'post',
		data: params,
	})
}

//  严选入库 —— 列表 
export async function partsList(params) {
	return request({
		url: goods.partsList,
		method: 'get',
		data: params,
	})
}






// 获取统货验货详情   的接口 
export async function getShipment(params) {
	return request({
		url: goods.getShipment,
		method: 'get',
		data: params,
	})
}

// 统货验货 确认接口 
export async function unify(params) {
	return request({
		url: goods.unify,
		method: 'post',
		data: params,
	})
}


// 统货  零件录入时，验证二维码的接口
export async function check(params) {
	return request({
		url: goods.check,
		method: 'get',
		data: params,
	})
}

// 获取统货下拉菜单的接口
export async function selectList(data) {
	return request({
		url: goods.selectList+'/'+data,
		method: 'get',
	})
}


// 货品录入  确认接口
export async function save(params) {
	return request({
		url: goods.save,
		method: 'post',
		data: params,
	})
}

// 统货 零件列表
export async function shipmentList(params) {
	return request({
		url: goods.shipmentList,
		method: 'get',
		data: params,
	})
}


// 统货库存展示 的接口
// export async function stockunify(params) {
// 	return request({
// 		url: goods.stockunify,
// 		method: 'get',
// 		data: params,
// 	})
// }






// 排产 

// 排产获取数据
export async function padDetail(data) {
	return request({
		url: goods.padDetail+'/'+data,
		method: 'get',
	})
}

// 排产确认的接口
export async function taskUpdate(params) {
	return request({
		url: goods.taskUpdate,
		method: 'post',
		data: params,
	})
}



// 分类总数  接口 
export async function count(params) {
	return request({
		url: goods.count,
		method: 'get',
		data: params,
	})
}


// 废发动机列表接口
export async function engineList(params) {
	return request({
		url: goods.engineList,
		method: 'get',
		data: params,
	})
}





