const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
var env=process.env
// console.log("env是什么",env)
// env.publicUrl="这是基础地址"
// console.log("env是什么",env)
module.exports = {
  publicPath:"/", //这是默认的地址路径
  // baseUrl:"基础地址",
  productionSourceMap: false,
  chainWebpack: (config) => {
    config.resolve.alias
      .set("@", resolve("/"))
      .set("src", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("components", resolve("src/components"))
     
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: "less",
      patterns: [
        // 这个是加上自己的路径,不能使用(如下:alias)中配置的别名路径
        path.resolve(__dirname, "./src/assets/css/config.less"),
      ],
    }
    
  },
};
// console.log("现在的env是什么",env)