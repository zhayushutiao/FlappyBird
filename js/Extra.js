// 额外的一些功能

import { DataStore } from "./base/DataStore"

export class Extra{
	constructor(){
	}
	/* 背景音乐 */
	bgm(){
		const ctx = wx.createInnerAudioContext()
		ctx.autoplay = true
		ctx.loop = true
		ctx.volume = 0.3
		ctx.src = './audio/bgm.mp3'
		ctx.onError((res) => {
			console.log(res)
		})
	}
	/* 爆炸音乐 */
	boom(){
		const ctx = wx.createInnerAudioContext()
		ctx.autoplay = true
		ctx.src = './audio/boom.mp3'
	}
	/* 穿过水管的声音 */
	through(){
		const ctx = wx.createInnerAudioContext()
		ctx.autoplay = true
		ctx.src = './audio/bullet.mp3'
	}

	/* 获取用户信息按钮 */
	userButton(){
		let button = wx.createUserInfoButton({
			type: 'text',
			text: '获取用户信息',
			style: {
				left: DataStore.getInstance().canvas.width/2-100,
				top: 76,
				width: 200,
				height: 40,
				lineHeight: 40,
				backgroundColor: '#ff0000',
				color: '#ffffff',
				textAlign: 'center',
				fontSize: 16,
				borderRadius: 4
			}
		})
		button.onTap((res) => {
			// console.log(res)
			if(res.userInfo){
				// 授权
				button.destroy();
			}else{
				// 没授权
			}
		})
	}

	/* 获取用户信息(微信信息) */
	getUser(callback){
		// 该方法需要先授权才能使用
		wx.getUserInfo({
			success(res){
				callback(null,res);
			},
			fail(err){
				callback(err,null);
			}
		})
	}
	/* 获取手机系统信息 */
	getTelInfo(){
		wx.getSystemInfo({
			success: (result) => {
				console.log(result);
				
			},
		})
	}

	/* 下载文件 */
	download(){
		wx.downloadFile({
			url: 'http://mp3.9ku.com/hot/2004/09-11/59930.mp3',
			success:res=>{
				console.log(res);	
				wx.saveImageToPhotosAlbum({
					filePath: res.tempFilePath,
					success:res=>{
						console.log(res);						
					}
				})			
			},
			fail:err=>{
				console.log(err);
			}
		})
	}

	/* 上传文件 */
	upload(){
		wx.chooseImage({
			success(res){
				wx.uploadFile({
					filePath: res.tempFilePaths[0],
					name: 'name',
					url: 'http://localhost:4000/upload',
					success(res){
						console.log(res);				
					},
					fail(err){
						console.log(err);				
					}
				})
			}
		})
	}

	/* 发送http请求 */
	send(){
		wx.request({
			url:'http://39.102.34.126:4000',
			success(res){
				console.log(res);
			},
			fail(err){
				console.log(err);				
			}
		})
	}

	/* socket连接 */
	socket(){
		// 连接socket服务器
		wx.connectSocket({
			url: 'ws://localhost:4000',
			success(res){
				console.log('连接成功');
			},
			fail(err){
				console.log(err);
			}
		})
		// 连接成功后
		wx.onSocketOpen(() => {
			wx.sendSocketMessage({
				data: '微信小游戏发送的数据',
				success(res){
					console.log(res);					
				},
				fail(err){
					console.log('失败');					
				}
			})

			wx.onSocketMessage((data) => {
				console.log(data);				
			})
		})
	}
}