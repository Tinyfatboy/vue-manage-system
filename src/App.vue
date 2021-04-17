<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import 'normalize.css'
import _ from 'lodash'
import * as types from '@/store/types.js'

export default {
  name: 'app',
  created () {
    const userInfo = JSON.parse(localStorage.getItem('userInfo')) || {}
    const { date = '', user = {} } = userInfo || {}
    const expireTime = 10 * 24 * 3600 * 1000
    if (_.isEmpty(userInfo)) {
      this.$store.commit(types.LOGOUT)
    } else if ((new Date().getTime()) - date > expireTime) {
      this.$store.commit(types.LOGOUT)
    } else {
      this.$store.commit(types.LOGIN, user)
      this.$route.path === '/login' && this.$router.push('/')
    }
  }
}
</script>
