import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './types.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      usersAccountAccount: '',
      usersAccountEmail: '',
      usersAccountId: '',
      usersAccountPassword: '',
      usersEssentialInformationId: ''
    },
    isLogin: false
  },
  mutations: {
    [types.LOGIN]: (state, data) => {
      state.user = data
      state.isLogin = true
    },
    [types.LOGOUT]: (state) => {
      localStorage.removeItem('userInfo')
      state.user = {
        usersAccountAccount: '',
        usersAccountEmail: '',
        usersAccountId: '',
        usersAccountPassword: '',
        usersEssentialInformationId: ''
      }
      state.isLogin = false
    }
  },
  actions: {
  },
  modules: {
  }
})
