import Request from "./request.js"
import JSON from "./json"
Date.prototype.Format = function  (fmt) { //author: zhengsh 2016-9-5 
    var o = {
         "M+": this.getMonth() + 1, //月份 
       "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}




const api = {
	//调用node上自己写的接口
	requestNode:async(url,data,type="post")=>{
		let result;
		console.log("调用")
		if (type == "get") {
			result = await Request.http(url, data,"get");
		} else {
			result = await Request.http(url, data,"post");
		}
		return result.data
	},
	json: (type) => {
		
		return new Promise(resolve => {
			//模拟异步请求数据
			// setTimeout(() => {
			// 	resolve(JSON[type]);
			// }, 500)
			//同步获取数据
			resolve(JSON[type]);
		})
	},
	
	// 复制到剪切板
	copyWx: str => {
		console.log("收到的微信",str)
		var save = function(e) {
			e.clipboardData.setData('text/plain', str); //clipboardData对象
			e.preventDefault(); //阻止默认行为
		};
		document.addEventListener('copy', save);
		return document.execCommand("copy"); //使文档处于可编辑状态，否则无效
	},
	//生成随机密码
	creatPassword:(num)=>{
		let small="abcdefghijklmnopqrstuvwxyz".split("")
		let big="ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")
		let number="0123456789".split("")
		let result=""
		//随机字符库
		number.push(...small)
		number.push(...big)
		
		let length=number.length-1
	
		for (var i=0;i<num;i++){
			let a=parseInt(Math.random()*length) 
			result+=number[a]
		}
		return result
	},
	// 生成16位唯一id
	creatId: () => {
		return (Math.random() * 10000000).toString(16).substr(0, 4) + (new Date()).getTime() + Math.random().toString().substr(
			2, 4);
	},
	getDate: (date, slice = true) => {
		let data = new Date(date).Format("yyyy-MM-dd hh:mm");
		if (slice) {
			let year = new Date().getFullYear();
			if (data.slice(0, 4) == year) {
				data = data.slice(5);
			}
		}

		return data;
	},
	
	

}
export default api
