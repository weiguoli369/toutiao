import moment from 'moment'
import Vue from 'vue'

moment.locale('zh-cn')


Vue.filter('relativeTime', val => {
    return moment(val).fromNow()
})