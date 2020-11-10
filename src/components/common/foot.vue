<template>
  <div class="foot flex flex-direction align-center justify-center">
    <ul class="category flex  align-center ">
        <li v-for="(item,index) in tabList" :key="index" >
            {{item.name}}
        </li>
    </ul>
    <p class="createdBy">created by 羞耻疯</p>
  </div>
</template>

<script>
export default {
    name:"foot",
    data(){
        return{
            tabList:[
                {
                    name:"Home",
                    url:""
                },
                 {
                    name:"News",
                    url:""
                },
                 {
                    name:"Feedback",
                    url:""
                },
                 {
                    name:"Products",
                    url:""
                },
            ]
        }
    }

}
</script>

<style lang="less" scoped>
    .foot{
        // position: absolute;
        margin-top: 30px;
        // bottom: 0;
        background-color: #000000;
        width: 100%;
        height: @footHeight;
        color: #fff;
        .category{
            // width: 30%;
            font-size: 18px;
            height: 50px;
            line-height: 50px;
            // padding: 0 0 10px 0;
            margin-bottom: 10px;
            li{
                margin: 0 20px;
            }
        }
        .createdBy{
            height: 30px;
            line-height: 30px;
            font-size: 16px;
        }
    }
</style>