<template>
  <div class="home-container">
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button slot="title"
        type="info"
        icon="search"
        round
        class="search-btn"
      >
      <span>搜索</span>
      </van-button>
    </van-nav-bar>
    <!-- 
      通过 animated 属性可以开启切换标签内容时的转场动画。
      通过 swipeable 属性可以开启滑动切换标签页。
     -->
    <van-tabs v-model="active" animated swipeable class="channel-tabs" >
      <van-tab :title="tab.name" v-for="tab in tabList" :key="tab.id">
        <ArticleList :channel="tab"></ArticleList>
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburger-btn">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
  </div>
</template>

<script>
  import {getUserChannelsAPI} from '@/api'
  import ArticleList from './components/article-list.vue'
export default {
  components:{
    ArticleList
  },
  data(){
    return {
      active:0,
      tabList:[],

    }
  },
 created(){
    this.loadChannels()
  },
  methods:{
    async loadChannels(){
      try {
        const { data } = await getUserChannelsAPI()
        this.tabList = data.data.channels
      } catch (err) {
        this.$toast('获取用户频道失败')  
      }
    }
  }
}
</script>

<style scoped lang="less">
  .home-container {
    padding-top: 174px;
    padding-bottom: 100px;
    /deep/ .van-nav-bar__title {
      max-width: unset;
    }
    .search-btn {
      width: 555px;
      height: 64px;
      background-color: #5babfb;
      border: none;
      font-size: 28px;
      .van-icon {
        font-size: 32px;
      }
    }
    /deep/ .channel-tabs{
      .van-tabs_content{
        min-height: 79vh;
      }
      .van-tab {
        border-right: 1px solid #edeff3;
        min-width: 200px;
        .van-tab_text{
          font-size: 30px;
        }
        
      }
     .van-tabs__wrap{
        position: fixed;
        top: 92px;
        z-index: 1;
        left: 0;
        right: 0;
        height: 82px;
      }
  
      .van-tab--active {
        color: #333333;
      }
  
      .van-tabs__nav {
        padding-bottom: 0;
      }
  
      .van-tabs__line {
        bottom: 8px;
        width: 31px !important;
        height: 6px;
        background-color: #3296fa;
      }

      .placeholder {
        flex-shrink: 0;
        width: 66px;
        height: 82px;
      }

      .hamburger-btn {
        position: fixed;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 66px;
        height: 82px;
        background-color: #fff;
        opacity: 0.902;
        i.toutiao {
          font-size: 33px;
        }
        &:before {
          content: "";
          position: absolute;
          left: 0;
          width: 1px;
          height: 100%;
          background-image: url(~@/assets/gradient-gray-line.png);
          background-size: contain;
        }
      }
    }
  }

  // .home-container {
  //   padding-top: 100px;
  //   padding-bottom: 100px;
  //   /deep/ .van-nav-bar__title {
  //     max-width: unset;
  //   }
  //   .search-btn {
  //     width: 555px;
  //     height: 64px;
  //     background-color: #5babfb;
  //     border: none;
  //     font-size: 28px;
  //     .van-icon {
  //       font-size: 32px;
  //     }
  //   }
  
  //   /deep/ .channel-tabs {
  //     .van-tab {
  //       border-right: 1px solid #edeff3;
  //       min-width: 200px;
  //       font-size: 30px;
  //       color: #777777;
  //     }
  //    .van-tabs_wrap{
  //       position: fixed;
  //       top: 50px;
  //       z-index: 1;
  //       left: 0;
  //       right: 0;
  //       // height: 82px;
  //     }
  
  //     .van-tab--active {
  //       color: #333333;
  //     }
  
  //     .van-tabs__nav {
  //       padding-bottom: 0;
  //     }
  
  //     .van-tabs__line {
  //       bottom: 8px;
  //       width: 31px !important;
  //       height: 6px;
  //       background-color: #3296fa;
  //     }
  
  //     .placeholder {
  //       flex-shrink: 0;
  //       width: 66px;
  //       height: 82px;
  //     }
  
  //     .hamburger-btn {
  //       position: fixed;
  //       right: 0;
  //       display: flex;
  //       justify-content: center;
  //       align-items: center;
  //       width: 66px;
  //       height: 82px;
  //       background-color: #fff;
  //       background-color: rgba(255, 255, 255, 0.902);
  //       i.toutiao {
  //         font-size: 33px;
  //       }
  //       &:before {
  //         content: "";
  //         position: absolute;
  //         left: 0;
  //         width: 1px;
  //         height: 58px;
  //         background-image: url(~@/assets/gradient-gray-line.png);
  //         background-size: contain;
  //       }
  //     }
  //   }
  // }
  </style>
  