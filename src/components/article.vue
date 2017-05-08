<template>
  <div class="content">
    <h2 class="title">{{article.title}}</h2>
    <div class="artInfo">发布于{{article.createTime | time}}·作者 {{article.author}}·{{article.visit_count}} 次浏览·{{article.reply_count}} 次回复·来自 {{article.tab| getTab}}</div>
    <div class="artContent" v-html="article.content"></div>
    <div>
      <ul class="replysList">
        <li v-for="(reply, index) in replies" :key="reply.create_at">
          <div class="replyAuthor">
            <span>{{index+1}}楼</span>
            <!--<img :src="reply.author.avatar_url" alt="">-->
            <span>{{reply.author.loginname}}</span>
            <span class="replyTime">{{reply.create_at | time}}</span>
          </div>
          <div>
            <div v-html="reply.content" class="replyContent"></div>
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
<style lang="scss" type="text/css">
  .content{
    font-size: 0.55rem;
    padding: 0 5%;
    line-height: 1.5;
    .artInfo{
      font-size: 0.45rem;
    }
  }
  .title{
    font-size: 0.85rem;
  }
  .artContent{
    width: 100%;
    line-height: 1.5;
    img{
      width: 100%;
    }
  }
  .replysList li{
      padding: 0.5rem;
      border-bottom: 1px solid #ddd;
  }
  .replyAuthor{
    color: #999;
    img{
      width: 1.5rem;
      height: 1.5rem;
      vertical-align: middle;
    }
    .replyTime{
      float: right;
    }
  }
  code{
    white-space: pre-wrap;
    word-break: break-all;
  }
</style>
