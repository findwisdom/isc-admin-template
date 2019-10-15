# isc-work-order-ui

## 运维工单系统

### 相关人员

* 前端： 何苗,罗旭廷
* 后端： 孙越
* 产品:  郑乾文
* 运维： 张瑾
* sso单点登录相关： 赵粤

### 相关文档地址

蓝湖-》 运维工单


### 环境地址

测试环境： http://192.168.9.9:8099

### 依赖服务

公共上传服务：'http://10.30.30.241:8600/common/api/file/uploadOSS'
sso单点登录： 'http://10.30.30.241:8091/qrcode?site=wo'

* 如需修改单点登录重定向地址请进入`src/services/login.js` 修改`redirect`函数地址即可
* 目前访问运维工单系统需要配置host: 10.30.30.241 operation-test.isyscore.com

### 注意事项

因为目前没有sso相应开发环境

前端本地调试需要扫码登入`http://192.168.9.9:8099`环境 复制`loacalStroage`中的`userInfo`到本地对应域名

复制前需要进入`src/views/App.vue`注释掉重定向代码段

```js
    if (!userInfo && !str.userInfo) {
        redirect();
    }
```

### Compiles and hot-reloads for development
```
cnpm -i
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

