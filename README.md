## Googbuild-WIFI插件说明
集成 ESPTouch 和 AirKiss 配网协议，帮助物联网设备连接Wi-Fi网络, 快捷简单。
本插件持续开发中，目前仅支持 Android & IOS

## 版本说明
当前版本： 0.0.4		
更新时间： 2020-05-20
更新内容： 更新安卓部分机型无法获取SSID问题

--
版本： 0.0.3  
更新时间： 2019-08-29
更新内容： 增加IOS平台

--
版本： 0.0.2		
更新时间： 2019-05-31	
更新内容： 配网成功信息返回原始数据

--
版本： 0.0.1  
更新时间： 2019-05-23	
更新内容： 初版基本功能
作者： whc	

## 引用方式
``````
const gbWiFi = uni.requireNativePlugin('Googbuild-WIFI'); 
``````

## 功能列表
|名称|接口名|平台支持||
|---|---|---|---|
|获取WiFi名称|getWiFiName|Andorid||
|获取网络类型|getNetWorkType|Andorid||
|获取BSSID|getBSSID|Andorid||
|AirKiss配网|linkAirKiss|Andorid|IOS|
|取消AirKiss配网|cancelAirKiss|Andorid|IOS|
|EspTouch配网|linkEsptouch|Andorid|IOS|
|取消EspTouch配网|cancelEsptouch|Andorid|IOS|


## API Demo
### 获取WiFi名称
`gbWiFi.getWiFiName(callback)`
#### 参数
无
#### 返回
```
{	
    ssid 	//Wifi 名称	
}
```
示例:

```javascript
gbWiFi.getWiFiName(result => {
	console.log(result.ssid);
});

```

### 获取网络类型
`gbWiFi.getNetWorkType(callback)`
#### 参数
无
#### 返回
```
{	
    type 	// 网络类型
}
```
示例:

```javascript
gbWiFi.getNetWorkType(result => {
	switch(result.type) {
	    case 1:
	        console.log('wap网络');
	        break;
	    case 2:
	        console.log('2G网络');
	        break;
	    case 3:
	        console.log('3G网络');
	        break;
	    case 4:
	        console.log('4G网络');
	        break;
	    case 5:
	        console.log('5G网络'); // 预留值
	        break;
	    case 6:
	        console.log('WiFi 2.4G网段');
	        break;
	    case 7:
	        console.log('5G WiFi');
	        break;
	    default:
	        console.log('没有网络'); 
	        break;
	}
});
```



### 获取 BSSID
`gbWiFi.getBSSID(callback)`
#### 参数
无
#### 返回
```
{	
    bssid 	// BSSID	
}
```
示例:

```javascript
gbWiFi.getBSSID(result => {
	console.log(result.bssid);
});

```



### 使用 AirKiss 协议进行配网
`gbWiFi.linkAirKiss(option, callback)`
#### 参数
```
{	
	ssid, //wifi名称（必填）
	pwd // wifi密码（必填）
}
```
#### 返回
```
{	
    code: 0, 	//状态码： 0-失败 1-成功 2-特殊情况导致失败
    massage: 'xxx', //返回消息
}
```
```
备注： IOS airkiss 配网成功无回调
```
示例:

```javascript
gbWiFi.linkAirKiss({
		ssid: 'wifiName',
		pwd: '12345678'
	},
	result => {
		switch(result.code) {
			case 1:
				console.log('连接成功'); break;
			case 0:
			case 2:
				console.log('连接失败', result.massage); break;
			default:
				break;		
		}
});

```


### 取消 AirKiss 配网
`gbWiFi.cancelAirKiss(callback)`
#### 参数
无
#### 返回
```
{	
    code: 0, 	//状态码： 0-失败 1-成功
    massage: 'xxx', //返回消息
}
```
示例:

```javascript
gbWiFi.cancelAirKiss(result => {
	if (result.code) {
		console.log('取消成功');
	} else {
		console.log('取消失败');
	}
});

```

### 使用 Esptouch 协议进行配网
`gbWiFi.linkEsptouch(option, callback)`
#### 参数
```
{	
	ssid, //wifi名称（必填）
	pwd,  // wifi密码（必填）
	mode // 配网模式 （可选）： 'Broadcast'（默认）, 'Multicast'
}
```
#### 返回
```
{	
    code: 0, 	 //状态码： 0-失败 1-成功 2-特殊情况导致失败
    massage: 'xxx'  //返回消息
}
```
示例:

```javascript
gbWiFi.linkEsptouch({
		ssid: 'wifiName',
		pwd: '12345678',
		model: 'Broadcast'
	},
	result => {
		switch(result.code) {
			case 1:
				console.log('连接成功'); break;
			case 0:
			case 2:
				console.log('连接失败', result.massage); break;
			default:
				break;		
		}
});

```


### 取消 EspTouch 配网
`gbWiFi.cancelEsptouch(callback)`
#### 参数
无
#### 返回
```
{	
    code: 0, 	//状态码： 0-失败 1-成功
    massage: 'xxxx'  //返回消息
}
```
示例:

```javascript
gbWiFi.cancelEsptouch(result => {
	if (result.code) {
		console.log('取消成功');
	} else {
		console.log('取消失败');
	}
});

```


## Demo
[github](https://github.com/goodbuildwhc/wifiDemo-dcloud)


## 常见问题
#### 安卓权限问题
```
必须请求GPS权限并打开GPS才可以正确获取到WIFI名称
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />    
<uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
9.0在8.0基础上新增权限
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
```
#### 第一次使用打包问题
	注意使用自定义基座模式

配网|linkAirKiss|Andorid|IOS|
|取消AirKiss配网|cancelAirKiss|Andorid|IOS|
|EspTouch配网|linkEsptouch|Andorid|IOS|
|取消EspTouch配网|cancelEsptouch|Andorid|IOS|


## API Demo
### 获取WiFi名称
`gbWiFi.getWiFiName(callback)`
#### 参数
无
#### 返回
```
{	
    ssid 	//Wifi 名称	
}
```
示例:

```javascript
gbWiFi.getWiFiName(result => {
	console.log(result.ssid);
});

```

### 获取网络类型
`gbWiFi.getNetWorkType(callback)`
#### 参数
无
#### 返回
```
{	
    type 	// 网络类型
}
```
示例:

```javascript
gbWiFi.getNetWorkType(result => {
	switch(result.type) {
	    case 1:
	        console.log('wap网络');
	        break;
	    case 2:
	        console.log('2G网络');
	        break;
	    case 3:
	        console.log('3G网络');
	        break;
	    case 4:
	        console.log('4G网络');
	        break;
	    case 5:
	        console.log('5G网络'); // 预留值
	        break;
	    case 6:
	        console.log('WiFi 2.4G网段');
	        break;
	    case 7:
	        console.log('5G WiFi');
	        break;
	    default:
	        console.log('没有网络'); 
	        break;
	}
});
```



### 获取 BSSID
`gbWiFi.getBSSID(callback)`
#### 参数
无
#### 返回
```
{	
    bssid 	// BSSID	
}
```
示例:

```javascript
gbWiFi.getBSSID(result => {
	console.log(result.bssid);
});

```



### 使用 AirKiss 协议进行配网
`gbWiFi.linkAirKiss(option, callback)`
#### 参数
```
{	
	ssid, //wifi名称（必填）
	pwd // wifi密码（必填）
}
```
#### 返回
```
{	
    code: 0, 	//状态码： 0-失败 1-成功 2-特殊情况导致失败
    massage: 'xxx', //返回消息
}
```
```
备注： IOS airkiss 配网成功无回调
```
示例:

```javascript
gbWiFi.linkAirKiss({
		ssid: 'wifiName',
		pwd: '12345678'
	},
	result => {
		switch(result.code) {
			case 1:
				console.log('连接成功'); break;
			case 0:
			case 2:
				console.log('连接失败', result.massage); break;
			default:
				break;		
		}
});

```


### 取消 AirKiss 配网
`gbWiFi.cancelAirKiss(callback)`
#### 参数
无
#### 返回
```
{	
    code: 0, 	//状态码： 0-失败 1-成功
    massage: 'xxx', //返回消息
}
```
示例:

```javascript
gbWiFi.cancelAirKiss(result => {
	if (result.code) {
		console.log('取消成功');
	} else {
		console.log('取消失败');
	}
});

```

### 使用 Esptouch 协议进行配网
`gbWiFi.linkEsptouch(option, callback)`
#### 参数
```
{	
	ssid, //wifi名称（必填）
	pwd,  // wifi密码（必填）
	mode // 配网模式 （可选）： 'Broadcast'（默认）, 'Multicast'
}
```
#### 返回
```
{	
    code: 0, 	 //状态码： 0-失败 1-成功 2-特殊情况导致失败
    massage: 'xxx'  //返回消息
}
```
示例:

```javascript
gbWiFi.linkEsptouch({
		ssid: 'wifiName',
		pwd: '12345678',
		model: 'Broadcast'
	},
	result => {
		switch(result.code) {
			case 1:
				console.log('连接成功'); break;
			case 0:
			case 2:
				console.log('连接失败', result.massage); break;
			default:
				break;		
		}
});

```


### 取消 EspTouch 配网
`gbWiFi.cancelEsptouch(callback)`
#### 参数
无
#### 返回
```
{	
    code: 0, 	//状态码： 0-失败 1-成功
    massage: 'xxxx'  //返回消息
}
```
示例:

```javascript
gbWiFi.cancelEsptouch(result => {
	if (result.code) {
		console.log('取消成功');
	} else {
		console.log('取消失败');
	}
});

```
