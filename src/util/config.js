let IP = ''
let env = 'http://192.168.2.3' // 苏
let pro = 'http://192.168.2.3';
if (process.env.NODE_ENV === 'development') {
  // IP = 'http://192.168.0.112:10021' // 王 192.168.0.112   192.168.2.186 测试http://192.168.0.199:8081

    //  IP = 'http://192.168.0.199:8081'
        IP = 'https://server.youdi.net/router'  // 线上
        
    //  IP1 = 'http://192.168.0.199:8182'
  // IP = 'http://47.92.102.124:8081'
} else {
  //  IP = 'http://47.92.102.124:8081' // 线上  http://47.95.11.24:8101
  IP = 'https://server.youdi.net/router'
}


const API0 = `${IP}/authority`
const API1 = `${IP}/upload`
const API2 = `${IP}/disassemele-order/enquiry`
const API3 = `${IP}/dictionary` //disassemele-order
const API4 = `${IP}/disassemele-order`
const API5 = `${IP}/ocr`
const logo = require('../assets/image/logo.png')
module.exports = {
	name: '拆车宝',
  logo: logo,
  clientType: 'sale',
	api: {
		user: {
			loginByAccount: `${API0}/user/login/account`, // 登录
			loginByMobile: `${API0}/user/login/mobile`, // 登录
      registe: `${API0}/user/registry`, //注册
      
			getSim: `${API0}/code/sim`, //获取验证码
      resetPassword: `${API0}/user/password/reset`, //重置密码
      
      checkAccount: `${API0}/user/exist/check`, //校验账号手机号是否注册
      saveAppid: `${API4}/user_app/saveAppId`, // 存储用户的appid
    },
    global:{ //字典
      carStyle:`${API3}/brand/list`,
      carType:`${API3}/brand/carType`,//定型
    },
    upload:{
      img:`${API1}/save/file`, //上传图片
      getVinByPic:`${API5}/valid/vin`, //图片识别
    },
    query:{
      save:`${API2}/save`,
      list:`${API2}/list`,
      noSubmitDetail:`${API2}/notQuotedDetail`,
      submitEnquryOrder:`${API2}/submitEnquiryOrder`,
      partsList:`${API2}/partsList`,
      confirmEnquiryOrder:`${API2}/confirmEnquiryOrder`,
      orderList:`${API2}/orderList`,
      orderDetail:`${API2}/orderDetail`,
      statistics:`${API2}/statistics`,
      partOrderList:`${API2}/partOrderList`,
      refusalReconfirm:`${API2}/refusalReconfirm`,
      uploadPartsImgList:`${API2}/uploadPartsImgList`,
      uploadPartsImg:`${API2}/uploadPartsImg`,
    },
    address:{
      add:`${API0}/user/exist/check`, //添加地址修改地址
      delete:`${API0}/user/exist/check`, // 删除地址
      list:`${API0}/user/exist/check`, // 获取地址列表
      detail:`${API0}/user/exist/check`, // 获取地址详情
    },
    goods:{
      // 关于件货验货
      // 1. 获取 件货详情信息 接口
      getParts:`${IP}/disassemele-order/staff/getPartsLogisticsInfo`, 
      // 2. 获取 件货仓位 接口
      tree:`${IP}/inventory/repository/tree`, 
      // 3. 件货验货 接口 
      staff:`${IP}/disassemele-order/staff/confirmReceived`, 
      // 4. 件货入库 接交
      stock:`${IP}/inventory/stock/bill/in/save`,  // 件货提交 入库接口
      // 5. 获取件货列表
      partsList:`${IP}/disassemele-order/operation/order/list`,
      


      // 关于统货验货 
      // 1. 获取 统货详情信息 接口         
      getShipment:`${IP}/disassemele-order/clue/order/confirmShipmentDetail`,  
      // 2. 统货验货 提交确认接口
      unify:`${IP}/inventory/unify/in/stock/save`,  


      // 关于统货-货品录入
      // 1. 验证二维码 接口， 
      check:`${IP}/service-coding/coding/check/th`, 
      // 2. 货品种类 下拉菜单接口 ( 要传orderId )
      selectList:`${IP}/inventory/unify/goods/select/list`,
      // 3. 货品录入后 提交确认接口
      save:`${IP}/inventory/disassembly/task/save`,


      // 统货-零件统计列表接口
      shipmentList:`${IP}/inventory/disassembly/task/list`, 


    
      // 统货库存展示   
      // stockunify:`${IP}/inventory/unify/goods/pad/list`,         


      // 关于排产
      // 1. 获取 二维码上的数据  详情接口
      padDetail:`${IP}/inventory/disassembly/task/detail/pad`, 
      // 2. 排产确认的接口
      taskUpdate:`${IP}/inventory/disassembly/task/update`,


      // -排产列表  list列表  数量展示
      count:`${IP}/inventory/disassembly/task/count/goodsname`,   
      // 废发动机接口
      engineList:`${IP}/inventory/disassembly/task/engine/list`, 
        
       
    },
    product:{
      factoryList:`${IP}/product/engine/factory/list`, //  品牌型号 
      goodsList:`${IP}/product/goods/list`, // 货品类型
    },
   
    
	}
}
