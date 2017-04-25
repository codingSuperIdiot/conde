<template>
  <div>
    <h3>{{article.title}}</h3>
    <div>发布于{{article.createTime | time}}·作者 {{article.author}}·{{article.visit_count}} 次浏览·来自 {{article.tab}}</div>
    <div v-html="article.content"></div>
    <div>
      <ul>
        <li v-for="reply in replies" :key="reply.create_at">
          <img :src="reply.author.avatar_url" alt="">
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import {basePath} from '../js/index'
  export  default{
    data:function () {
      return{
      	article:{
      		title:'',
          content:'',
          author: '',
          tab: '',
          createTime: '',
          visit_count: 0,
          reply_count: 0
        },
        replies:[],
      }
    },
    mounted:function () {
      const artid = this.$route.params.id;
      this.axios.get(basePath+"topic/"+artid)
        .then((res)=>{
      	  if(res.data.success === true){
      	  	const D = res.data.data;
            this.article.title = D.title;
            this.article.content = D.content;
            this.article.author = D.author.loginname;
            this.article.tab = D.tab;
            this.article.createTime = D.create_at;
            this.article.visit_count = D.visit_count;
            this.article.reply_count = D.reply_count;
            this.replies = D.replies;
          }
        })
    }
  }
</script>
