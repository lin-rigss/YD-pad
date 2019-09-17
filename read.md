https://fengshunyx.com/shop-car/#/cart
[](https://www.html5plus.org/doc/zh_cn/oauth.html)

#原型图地址
https://www.xiaopiu.com/user?uid=5cf0edca324ee91e5bcf878d&libPop=project&libId=5ce7d8aaf057f00e643d6d3d 


#HbulderX 打包流程
  一、首先在hbulderx中生成webApp项目
  二、填写包名 可以在flutter项目中获取一个
  三、在jre的bin目录下面执行下面代码，生产安卓的签名   ceshi.demo.keystore 表示别名   keytool -genkey -alias com.business.keystore -keyalg RSA -validity 20000 -keystore android.keystore    
