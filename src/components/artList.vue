<template>
    <scroller :on-refresh="refresh" :on-infinite="infinite">
      <div>
        <ul class="tabList">
          <li v-for="(tab,index) in tabList" @click="changeTab(index)" :class="{active : activeIndex == index}">{{tab.name}}</li>
        </ul>
        <ul class="content">
          <router-link tag="li" v-for="article in artList" :key="article.id" :to="{name: 'article',params:{id: article.id}}">
            <div class="userInfo contLeft">
              <img :src="article.author.avatar_url" alt="">
              <span>{{article.author.loginname}}</span>
            </div>
            <div class="title_wrapper contRight">
              <h3><span :class="article.good | getTabClass(article.top)">{{article.tab | getArticleTab(article.good, article.top) }}</span>{{article.title}}</h3>
              <span>发布于：{{article.last_reply_at | time}}</span>
              <span>浏览量：{{article.visit_count}}</span>
            </div>
          </router-link>
        </ul>
      </div>
    </scroller>
</template>

<script>
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
      getArtList: function(){
      	return new Promise((resolve)=>{
          this.axios.get("https://cnodejs.org/api/v1/topics",{params : this.req})
            .then((res)=>{
              if(res.data.success)
                this.artList =res.data.data;
            })
            .catch((err)=>{
              console.log(err);
            })
        })
      },
      changeTab:function(index){
      	this.activeIndex = index;
      	this.req.tab = this.tabList[index].type;
      	console.log(this.req.tab);
      	this.req.limit = 20;
      	this.getArtList();
      },
      refresh: function (done) {
          this.getArtList()
            .then(done())
      },
      infinite: function () {
      }
    },
    mounted:function () {
      this.getArtList();
    }
  }
</script>

<style>
  .tabList{
    background-color: #999;
    padding: 0.3rem 0.4rem;
    display: flex;
  }
  .tabList li{
    display: table-cell;
    width: 1.8rem;
    height: 1rem;
    line-height: 1rem;
    color: #afa;
    font-size: 0.55rem;
    border-radius: 4px;
    text-align: center;
    margin: 0 0.2rem;
  }
  .tabList li.active{
    background-color: #7fd07f;
    color: #fff;
  }
  .content li{
    width: 100%;
    font-size: 0.55rem;
    padding: 0.5rem 5%;
    border-bottom: 1px solid #ddd;
  }
  .contLeft{
    display: inline-block;
    width: 15%;
  }
  .contRight{
    display: inline-block;
    width: 75%;
  }
  .userInfo{
    vertical-align: top;
    text-align: center;
    overflow: hidden;;
  }
  .userInfo img{
    width: 1.71rem;
    height: 1.71rem;
    border-radius: 50%;
  }
</style>
