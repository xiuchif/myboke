<template>
  <!-- 留言 -->
  <div class="messageRoot flex align-center flex-wrap">
    <div class="top">
      <img :src="detail.avatar" alt="" />
      <span>{{ detail.username }}</span>
    </div>
    <div class="bottom">
      <p class="messageContext">{{ detail.context }}</p>
      <div class="messageDate">
        <span class="pointer" @click="replyMessage(details)">回复</span>
        <span class="line"></span>
        <span> {{ detail.date }}</span>
      </div>
      <div class="reply" v-if="details.isReply">
        <textarea
          v-model="message"
          :placeholder="'回复' + ` ${detail.username}`"
          id=""
          cols="30"
          rows="10"
        ></textarea>
        <div class="replyButton">
          <button class="confirm">确定</button>
          <button class="cancle" @click="details.isReply=false">取消</button>
        </div>
      </div>
    </div>
  </div>
  <!-- 回复 -->
  <div
    class="messageChildren flex align-center flex-wrap"
    v-for="(item, index) in detail.replyList"
    :key="index"
  >
    <div class="top">
      <img :src="item.avatar" alt="" />
      <span>{{ item.username }}</span>
    </div>
    <div class="bottom">
      <p class="messageContext">{{ item.context }}</p>
      <div class="messageDate">
        <span class="pointer" @click="replyMessage(item)">回复</span>
        <span class="line"></span>
        <span> {{ item.date }}</span>
      </div>
      <div class="reply" v-if="item.isReply">
        <textarea
          v-model="message"
          :placeholder="'回复' + ` ${item.username}`"
          id=""
          cols="30"
          rows="10"
        ></textarea>
        <div class="replyButton">
          <button class="confirm">确定</button>
          <button class="cancle" @click="item.isReply=false">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {ref, toRefs} from 'vue'
export default {
  name: "messageItem",
  props:{
      detail:{
          type:Object,
          default(){
              return {}
          }
      }
  },
//   setup(props,context){
     
//       const {detail}=toRefs(props)
//        console.log("setup参数",detail.value)
//        console.log("第二个参数",context)
//        let details=detail.value
//       return    details
//   },
  data() {
    return {
      message: "",
      details:{}
    };
  },
  watch:{
      detail:function(data){
        //   this.details=data
      }
  },
  created(){
    //   this.details=this.detail
  },
  methods: {
    //   回复留言
    replyMessage(item) {
        item.isReply=true
      this.$emit("reply");
      console.log("回复留言");
    },
  },
};
</script>

<style lang="less" scoped>
p {
  text-align: start;
}
.top {
  width: 100%;
  display: flex;
  align-items: center;
  // height: 36px;
  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }
  span {
    padding: 0 4px;
    color: #4791ff;
    font-size: 14px;
    font-weight: 700;
  }
}
.bottom {
  width: 100%;
  // height: 2px;
  // display: block;
  padding-left: 40px;
  .messageContext {
    padding: 4px 0;
    padding-bottom: 0;
    font-size: 16px;
  }
  .messageDate {
    
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    text-align: start;
    width: 100%;
    color: #aaa;
    span {
      font-size: 14px;
    }
    .line {
      box-sizing: border-box;
      margin: 0 4px;
      border: 2px solid #ccc;
      border-radius: 50%;
    }
  }
}
.reply {
    margin-top: 5px;
  width: 100%;
  // padding-left: 30px;
  textarea {
    width: 100%;
    height: 52px;
    min-height: 52px;
    max-height: 136px;
    padding:4px 7px;
    overflow-y: hidden;
    font-size: 14px;
    border: 1px solid #dcdee2;
    border-radius: 4px;
    cursor: text;
    transition: border 0.2s ease-in-out, background 0.2s ease-in-out,
      box-shadow 0.2s ease-in-out;
     
  }
  .replyButton{
      text-align: start;
      button{
          margin-right: 10px;
          padding: 1px 7px 2px;
    font-size: 12px;
    border-radius: 3px;
    vertical-align: middle;
    line-height: 1.5;
    border: 1px solid #dcdee2;
    color: #fff;
      }
      .confirm{
          
    background-color: #2d8cf0;
    border-color: #2d8cf0;
      }
      .cancle{
          background-color: #f90;
    border-color: #f90;
      }
  }
}
.messageChildren {
  margin-top: 10px;
  padding-left: 40px;
}
</style>
