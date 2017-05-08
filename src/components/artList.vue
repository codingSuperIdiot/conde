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
              <!--<span>{{article.author.loginname}}</span>-->
            </div>
            <div class="title_wrapper contRight">
              <h3><span class="tab" :class="article.tab | getTabClass(article.good,article.top)">{{article.tab | getTab(article.good, article.top) }}</span>{{article.title}}</h3>
              <p>
                <span class="time">发布于：{{article.last_reply_at | time}}</span>
                <span class="review"><img src="../assets/review.png" alt="">{{article.reply_count}}</span>
                <span class="visit"><img src="../assets/visit.png">{{article.visit_count}}</span>
              </p>
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
      getArtList: function(ms){
      	return new Promise((resolve)=>{
           this.axios.get("https://cnodejs.org/api/v1/topics",{params : this.req})
             .then((res)=>{
               if(res.data.success)
                 this.artList =res.data.data;
                 setTimeout(function () {
                   resolve();
                 },ms)
             })
             .catch((err)=>{
               resolve(err);
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
          this.getArtList(1000).then(function () {
          	done()
          })
      },
      infinite: function (done) {
      	this.req.limit+=20;
      	this.getArtList(1000).then(function () {
          done()
        })
      }
    },
    mounted:function () {
      this.getArtList();
    }
  }
</script>

<style lang="scss" scoped="" type="text/css">
  .tabList{
    background-color: #999;
    padding: 0.3rem 0.4rem;
    display: flex;
    li{
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
  }

  .tabList li.active{
    background-color: #7fd07f;
    color: #fff;
  }
  .content li{
    width: 100%;
    font-size: 0;
    padding: 0.5rem 0;
    border-bottom: 1px solid #ddd;
  }
  .contLeft{
    display: inline-block;
    width: 15%;
    margin-right: 5%;
  }
  .contRight{
    display: inline-block;
    width: 80%;
    font-size: 0.55rem;
  }
  .userInfo{
    vertical-align: top;
    text-align: center;
    overflow: hidden;
    img{
      width: 1.71rem;
      height: 1.71rem;
      border-radius: 50%;
    }
  }
  .tab{
    padding: 0 8px;
    margin-right: 0.2rem;
    display: inline-block;
    color: #fff;
  }
  .top{
    background-color: #f70008;
  }
  .good{
    background-color: #20d724;
  }
  .share{
    background-color: deeppink;
  }
  .ask{
    background-color: darkmagenta;
  }
  .job{
    background-color: #101cff;
  }
  .default{
    background-color: #aaa;
  }
  .time{
    position: relative;
    top: 0.2rem;
  }
  .visit,.review{
    float: right;
  }
  .visit img,.review img{
    width: 0.8rem;
    position: relative;
    top: 0.2rem;
  }
</style>
