import Vue from "vue"
import Vuex from 'vuex'
import { getItem, setItem} from '@/utils/storage'

Vue.use(Vuex)

const TOKEN_KEY = 'TOUTIAO_USER'

export default new Vuex.Store({
    state: {
        //存储当前登陆的用户信息 包含token
        user: getItem(TOKEN_KEY)
    },
    mutations: {
        setUser (state, data) {
            state.user = data//容器里面数据
            //本地持久化
            setItem(TOKEN_KEY,state.user)
        }
    },
    actions: {
    },
    modules: {
    }
})