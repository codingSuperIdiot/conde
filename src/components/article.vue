<template>
  <div class="content">
    <h3>{{article.title}}</h3>
    <div>发布于{{article.createTime | time}}·作者 {{article.author}}·{{article.visit_count}} 次浏览·{{article.reply_count}} 次回复·来自 {{article.tab}}</div>
    <div v-html="article.content"></div>
    <div>
      <ul>
        <li v-for="(reply, index) in replies" :key="reply.create_at">
          <div>
            <img :src="reply.author.avatar_url" alt="">
          </div>
          <div>
            <p>{{reply.author.loginname}} <span><i ></i>{{reply.ups.length}}</span></p>
            <div v-html="reply.content"></div>
            {{reply.create_at | time}}

          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
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
      this.axios.get("https://cnodejs.org/api/v1/topic/"+artid)
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
<style>
  .content{
    font-size: 0.55rem;
  }
</style>
