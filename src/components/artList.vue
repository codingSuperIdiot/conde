<template>
  <div>
    <div>
      <ul class="tabList">
        <li v-for="(tab,index) in tabList" @click="changeTab(index)" :class="{active : activeIndex == index}">{{tab.name}}</li>
      </ul>
      <ul class="content">
        <router-link tag="li" v-for="article in artList" :to="{name: 'article',params:{id: article.id}}">
          <div class="userInfo ">
            <img :src="article.author.avatar_url" alt="">
            <span>{{article.author.loginname}}</span>
          </div>
          <div class="title_wrapper">
            <h3>{{article.title}}</h3>
            <span>发布于：{{article.last_reply_at | time}}</span>
            <span>浏览量：{{article.visit_count}}</span>
          </div>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
  import {basePath} from '../js/index'
  export default {
    data () {
      return {
        tabList:[
          {name: '全部' , type: 'all'},
          {name: '精华' , type: 'good'},
          {name: '分享' , type: 'share'},
          {name: '问答' , type: 'ask'},
          {name: '招聘' , type: 'job'}
        ],
        req:{
          page: 1,
          tab: "all",
          limit: 20
        },
        artList:[],
        activeIndex: 0
      }
    },

    methods:{
      getArtList:function(){
        this.axios.get(basePath+"topics",this.req)
          .then((res)=>{
            if(res.data.success === true)
              this.artList =res.data.data;
          })
          .catch((err)=>{
            console.log(err);
          })
      },
      changeTab:function(){

      }
    },
    mounted:function () {
      this.getArtList();
    }
  }
</script>

<style >
  .tabList{
    background-color: #999;
    padding: 0.1rem;
  }
  .tabList li{
    display: inline-block;
    width: 1rem;
    height: 0.6rem;
    line-height: 0.6rem;
    color: #afa;
    font-size: 0.35rem;
    border-radius: 4px;
  }
  .tabList li.active{
    background-color: #7fd07f;
    color: #fff;
  }
</style>
