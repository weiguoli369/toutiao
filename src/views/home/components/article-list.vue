<template>
  <div class="article-container">
    <van-pull-refresh 
        v-model="isRefreshLoading" 
        :success-text="refreshSuccessText"
        success-duration="1500"
        @refresh="onRefresh">
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            :error.sync="error"
            error-text="请求失败，点击重新加载"
            >
            <ArticleItem v-for="(article,idx) in list" :key="idx" :article="article">
            </ArticleItem>
            
        </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import { getArticlesAPI } from '@/api'
import ArticleItem from '@/components/article-item'
export default {
  name: 'articleList',
  components: {
    ArticleItem
  },
  data() {
    return {
        list: [],
        loading: false,
        finished: false,
        timestamp: null,
        error: false,
        isRefreshLoading:false,
        refreshSuccessText:'刷新成功'
    }
  },
  computed: {},
  watch: {},
  props: {
    channel: {
        type: Object,
        required: true
    }
  },
  methods: {
    async onLoad() {
      // 1. 请求获取数据
      try {
        const { data } = await getArticlesAPI({
            channel_id: this.channel.id,
            timestamp: this.timestamp || Date.now(),
            with_top:1 //1 包含置顶 0 不包含置顶
        })
        const { results,pre_timestamp} = data.data
        this.list.push(...results)
        this.timestamp = pre_timestamp
        this.loading = false
        if(this.timestamp === null){
            this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    },
    async onRefresh() {
      //将数据放到列表顶部
      try {
        const { data } = await getArticlesAPI({
            channel_id: this.channel.id,
            timestamp: Date.now(),
            with_top:1 //1 包含置顶 0 不包含置顶
        })
        const { results} = data.data
        this.list.unshift(...results)
        this.isRefreshLoading = false

        //更新成功提示文本
        this.refreshSuccessText = `刷新成功，更新了${results.length}条`
      } catch (err) {
        this.refreshSuccessText = '刷新失败，请重试'
        this.isRefreshLoading = false
      }
      
    },
  },
  created() {},
}
</script>

<style scoped lang="less">
.article-container{
  height: 83vh;
  overflow-y: auto;
}
</style>
