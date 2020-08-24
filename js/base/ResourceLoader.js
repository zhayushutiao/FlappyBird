// 资源文件加载器，确保canvas在图片资源加载完成后才开始渲染
import {Resources} from './Resources.js';
export class ResourceLoader{
	constructor(){
		// 定义属性map，保存图片资源
		this.map = new Map(Resources);
		// 遍历map,将其中的字符串替换为图片对象
		for(let [key,val] of this.map){
			// 创建图片对象(wx中没有image对象)
			let img = wx.createImage();
			// 设置图片的资源路径
			img.src = val;
			// 用图片对象替换原来的字符串路径
			this.map.set(key,img);
		}
	}
	// 当所有图片加载完成后
	onloaded(callback){
		let count = 0;//计数器,计算加载完成的图片的数量
		for(let val of this.map.values()){
			val.onload = ()=>{
				count++;
				// 当计数器的值达到map的长度时
				if(count>=this.map.size){
					// 说明加载全部完成，返回数据
					callback(this.map)
				}
			}
		}
	}
}