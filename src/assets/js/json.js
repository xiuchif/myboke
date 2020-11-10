import { resolve } from "path";

const homeNav = [
  {
    name: "首页",
    content:[],
    url:"/",
    id: 0,
  },
  {
    name: "博客",
    content:[
      {
        name:"标题1",
        url:""
      },
      {
        name:"标题2",
        url:""
      },
      {
        name:"标题3",
        url:""
      },
      {
        name:"标题4",
        url:""
      },
      {
        name:"标题5",
        url:""
      },
      {
        name:"标题6",
        url:""
      },
    ],
    id:1,
  },
  {
    name: "留言",
    content:[
      
    ],
    url:"/message",
    id:2,
  },
  {
    name: "关于",
    content:[
      {
        name:"标题1",
        url:""
      },
      {
        name:"标题2",
        url:""
      },
    ],
    id: 3,
  },
 
];
const homeLeftShow=[
  {
    title:"羞耻疯",
    nav:{},
   
    detail:{
      avatar:require("assets/img/avatar.jpg"),
      name:"羞耻疯",
      sign:"我的个签",
      gitUrl:"",
      address:"江苏-苏州",
    }
  },
  {
    title:"阿里云推广",
    nav:{
      name:"[了解详情]",
      url:"",
    },
    detail:[
      {
        name:"云服务器 精选特惠",
        url:"https://promotion.aliyun.com/ntms/yunparter/invite.html?userCode=8vcliarq"
      },
      {
        name:"上云必抢你先知,最新活动优惠",
        url:"https://www.aliyun.com/activity?userCode=8vcliarq"
      },
      [
        {
          name:"新用户享好礼",
          url:"https://www.aliyun.com/1111/new?userCode=8vcliarq"
        },
        {
          name:"云服务器一折起",
          url:"https://promotion.aliyun.com/ntms/yunparter/invite.html?userCode=8vcliarq",
        }
      ],
    ]
  },
  {
    title:"热门文章",
    nav:{},
    detail:[
      {
        name:"这是第一个列表要拉长一点这样方便看有多少长度能写几行",
        url:"",
        views:3248
      },
      {
        name:"这是第一个列到有多少长",
        url:"",
        views:3248
      },
      {
        name:"这是第一个列表能写几行",
        url:"",
        views:3248
      },
      {
        name:"这是第一个列表要拉长一方便看到底有多少长度能写几行",
        url:"",
        views:3248
      },
      {
        name:"这是第一个列表要方便看到底有多少长度能写几行",
        url:"",
        views:3248
      },
    ]
  }
]
const bokeList=[
  {
    url:"这是链接地址",
    title:"修改mysql数据库字符集：从utf8转为utf8mb4",
    username:"我的名字",
    date:"10-30 04:18",
    context:"        数据库不支持emoji的原因是编码问题，因为我Mysql数据库里的默认字符集是utf8，utf8最多支持存储3字节的字符，存个字母、普通的汉字都是没问题的，但是存emoji表情字符需要占用4个字节，所以utf8编码就处理不了了。mysql扩展了一个新的字符集utf8mb4来解决这个问题，utf8mb4是utf8的超集，最长可以用4个字节来存储一个字符，当然也可以存emoji表情，以及一些不常用的汉字等。",
    views:24,
    likes:2,
    commenets:1,
  },
  {
    url:"这是链接地址",
    title:"修改mysql数据库字符集：从utf8转为utf8mb4",
    username:"我的名字",
    date:"10-30 04:18",
    context:"        数据库不支持emoji的原因是编码问题，因为我Mysql数据库里的默认字符集是utf8，utf8最多支持存储3字节的字符，存个字母、普通的汉字都是没问题的，但是存emoji表情字符需要占用4个字节，所以utf8编码就处理不了了。mysql扩展了一个新的字符集utf8mb4来解决这个问题，utf8mb4是utf8的超集，最长可以用4个字节来存储一个字符，当然也可以存emoji表情，以及一些不常用的汉字等。",
    views:24,
    likes:2,
    commenets:1,
  },
  {
    url:"这是链接地址",
    title:"修改mysql数据库字符集：从utf8转为utf8mb4",
    username:"我的名字",
    date:"10-30 04:18",
    context:"        数据库不支持emoji的原因是编码问题，因为我Mysql数据库里的默认字符集是utf8，utf8最多支持存储3字节的字符，存个字母、普通的汉字都是没问题的，但是存emoji表情字符需要占用4个字节，所以utf8编码就处理不了了。mysql扩展了一个新的字符集utf8mb4来解决这个问题，utf8mb4是utf8的超集，最长可以用4个字节来存储一个字符，当然也可以存emoji表情，以及一些不常用的汉字等。",
    views:24,
    likes:2,
    commenets:1,
  },
  {
    url:"这是链接地址",
    title:"修改mysql数据库字符集：从utf8转为utf8mb4",
    username:"我的名字",
    date:"10-30 04:18",
    context:"        数据库不支持emoji的原因是编码问题，因为我Mysql数据库里的默认字符集是utf8，utf8最多支持存储3字节的字符，存个字母、普通的汉字都是没问题的，但是存emoji表情字符需要占用4个字节，所以utf8编码就处理不了了。mysql扩展了一个新的字符集utf8mb4来解决这个问题，utf8mb4是utf8的超集，最长可以用4个字节来存储一个字符，当然也可以存emoji表情，以及一些不常用的汉字等。",
    views:24,
    likes:2,
    comments:1,
  },
  {
    url:"这是链接地址",
    title:"修改mysql数据库字符集：从utf8转为utf8mb4",
    username:"我的名字",
    date:"10-30 04:18",
    context:"        数据库不支持emoji的原因是编码问题，因为我Mysql数据库里的默认字符集是utf8，utf8最多支持存储3字节的字符，存个字母、普通的汉字都是没问题的，但是存emoji表情字符需要占用4个字节，所以utf8编码就处理不了了。mysql扩展了一个新的字符集utf8mb4来解决这个问题，utf8mb4是utf8的超集，最长可以用4个字节来存储一个字符，当然也可以存emoji表情，以及一些不常用的汉字等。",
    views:24,
    likes:2,
    commenets:1,
  },
  {
    url:"这是链接地址",
    title:"修改mysql数据库字符集：从utf8转为utf8mb4",
    username:"我的名字",
    date:"10-30 04:18",
    context:"        数据库不支持emoji的原因是编码问题，因为我Mysql数据库里的默认字符集是utf8，utf8最多支持存储3字节的字符，存个字母、普通的汉字都是没问题的，但是存emoji表情字符需要占用4个字节，所以utf8编码就处理不了了。mysql扩展了一个新的字符集utf8mb4来解决这个问题，utf8mb4是utf8的超集，最长可以用4个字节来存储一个字符，当然也可以存emoji表情，以及一些不常用的汉字等。",
    views:24,
    likes:2,
    comments:1,
  },
]

export default {
  homeNav,
  homeLeftShow,
  bokeList,
  
};
