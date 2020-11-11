import Request from "./request.js"
import JSON from "./json"




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
	// 时间戳转时间
	timeToDate:(timestamp)=>{
        var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = date.getDate() + ' ';
        var h = date.getHours() + ':';
        var m = date.getMinutes()<10?'0'+date.getMinutes() + ':':date.getMinutes()+':';
        var s = date.getSeconds();
        return Y+M+D+h+m+s;
        // .replace(/\//g, "-") 
    },
	// requestData: async (url, data, type) => { //获取数据
	// 	let rtype = type || "post";
	// 	let result;
	// 	if (rtype == "get") {
	// 		result = await Vue.prototype.$nhttp.get(url, data);
	// 	} else {
	// 		result = await Vue.prototype.$nhttp.post(url, data);
	// 	}
	// 	if (result.data.status == 1) {
	// 		let data = result.data.data;
	// 		if(data!=[]){
	// 			return data
	// 		}else{
	// 			return {status:1}
	// 		}

	// 	} else {
	// 		return data
	// 		console.log(result);
	// 	}
	// },
	// 基础代码

}
export default api
