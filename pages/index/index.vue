<template>
	<view class="content">
		<text>支持 ESPTouch、AirKiss</text>
		<view>
			<input type="text" @input="onInput" data-id="name" :value="name" placeholder="WIFI名称" />
			<input type="text" @input="onInput" data-id="pwd" :value="pwd" placeholder="WIFI 密码" />
		</view>
		<view>
			<button @click="getWiFiName">获取WIFI 名称</button>
			<button @click="getNetWorkType">获取网络类型</button>
			<button @click="getBSSID">获取BSSID</button>
			<button @click="linkAirKiss">AirKiss配网</button>
			<button @click="cancelAirKiss">取消AirKiss配网</button>
			<button @click="linkEsptouchM">EspTouch Multicast配网</button>
			<button @click="linkEsptouchB">EspTouch Broadcast配网</button>
			<button @click="cancelEsptouch">取消EspTouch配网</button>
		</view>

		<view class="">
			{{result}}
		</view>
	</view>
</template>

<script>
	const gbWiFi = uni.requireNativePlugin('Googbuild-WIFI');
	const {
		inputData
	} = require('../../common/dataTool.js');
	export default {
		data() {
			return {
				result: '',
				pwd: '',
				name: ''
			}
		},
		onLoad() {

		},
		methods: {

			onInput(e) {
				inputData(e, this);
			},
			getWiFiName() {
				this.result = "命令已发送";
				gbWiFi.getWiFiName(callback => {
					this.name = callback.ssid.replace(new RegExp(/"\\/g), '"');
					this.result = JSON.stringify(callback);
				});
			},
			getNetWorkType() {
				this.result = "命令已发送";
				gbWiFi.getNetWorkType(callback => {
					switch (callback.type) {
						case 1:
							callback.type = 'wap网络';
							break;
						case 2:
							callback.type = '2G网络';
							break;
						case 3:
							callback.type = '3G网络';
							break;
						case 4:
							callback.type = '4G网络';
							break;
						case 5:
							callback.type = '5G网络'; // 预留值
							break;
						case 6:
							callback.type = 'WiFi 2.4G网段';
							break;
						case 7:
							callback.type = '5G WiFi';
							break;
						default:
							callback.type = '没有网络';
							break;
					}

					this.result = JSON.stringify(callback);
				});
			},
			getBSSID() {
				this.result = "命令已发送";
				gbWiFi.getBSSID(callback => {
					this.result = JSON.stringify(callback);
				});
			},
			linkAirKiss() {
				this.result = "命令已发送";
				gbWiFi.linkAirKiss({
						ssid: this.name,
						pwd: this.pwd
					},
					callback => {
						this.result = callback;
					});
			},
			cancelAirKiss() {
				this.result = "命令已发送";
				gbWiFi.cancelAirKiss(callback => {
					this.result = JSON.stringify(callback);
				});
			},
			linkEsptouchM() {
				this._linkEsptouch('Multicast');
			},
			linkEsptouchB() {
				this._linkEsptouch('Broadcast');
			},
			_linkEsptouch(mode) {
				this.result = "命令已发送";
				gbWiFi.linkEsptouch({
						ssid: this.name,
						pwd: this.pwd,
						model: mode
					},
					callback => {
						this.result = JSON.stringify(callback);
					});
			},
			cancelEsptouch() {
				this.result = "命令已发送";
				gbWiFi.cancelEsptouch(callback => {
					this.result = JSON.stringify(callback);
				});
			}
		}
	}
</script>

<style>
	.content {
		text-align: center;
		height: 400upx;
	}

	.logo {
		height: 200upx;
		width: 200upx;
		margin-top: 200upx;
	}

	.title {
		font-size: 36upx;
		color: #8f8f94;
	}
</style>
