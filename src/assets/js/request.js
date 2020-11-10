// request.js
import qs from "qs"
import axios from "axios";
const baseUrl = "http://boke.xiuchif.cn/api/";
const testUrl = "localhost:8470/";
// post请求
function http(url, data = {}, method = "post") {
  return new Promise((resolve, reject) => {
    axios({
      url: baseUrl + url,
      method: method,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data:qs.stringify(data),
    })
      .then((res) => {
        //成功
        resolve(res.data);
      })
      .catch((res) => {
        //失败
        reject(res);
      });
  });
}
function nhttp(url, data = {}, method = "post") {
  return new Promise((resolve, reject) => {
    axios({
      url: testUrl + url,
      method: method,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data:qs.stringify(data),
    })
      .then((res) => {
        //成功
        resolve(res.data);
      })
      .catch((res) => {
        //失败
        reject(res);
      });
  });
}
export default {
  http,
  nhttp
};
