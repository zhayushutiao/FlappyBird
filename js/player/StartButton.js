// 游戏结束时，显示在屏幕中央的的图标

import { Sprite } from "../base/Sprite";
import { DataStore } from "../base/DataStore";

export class StartButton extends Sprite{
	constructor(){
		const img = Sprite.getImg('startButton');
		const width = DataStore.getInstance().canvas.width;
		const x = width/2 - img.width/2;
		const height = DataStore.getInstance().canvas.height;
		const y = height/2 - img.height/2;
		super(img,0,0,img.width,img.height,x,y,img.width,img.height);
	}
}