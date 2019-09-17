

/**
 * @event 传入的事件名称
 * @type 参数的名称
 * @fields form表单
 * @inputType 输入框的类型
 * @arr 当inputType为select类型的时候，需要添加数组
 *  */
function valueChange (event, type, fields, inputType = 'input', arr = [], key = 'name') { // 当form表单数据改变的时候，进行参数赋值
  // form表单数据绑定
  if (inputType === 'select') {
    fields[type] = arr[event.target.value][key]
  } else if (inputType === 'time' || inputType === 'checkBox') {
    fields[type] = event.target.value
  } else {
    fields[type] = event.mp.detail.value
  }
  return fields
}


export default {
  // Vue.js的插件应当有一个公开方法 install。这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象。
  install: function (Vue) {
    // Vue.prototype.check_login = (callback) => checkLogin(callback)
    Vue.prototype.value_change = (event, type, fields, inputType, arr, key) => valueChange(event, type, fields, inputType, arr, key)
  }
}
