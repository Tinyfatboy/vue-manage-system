<template>
  <div>
    <div v-if="!isLogin">
      <el-button
        type="text"
        @click="goTo('login')"
      > 登录 </el-button>
      <el-button
        type="text"
        @click="goTo('register')"
      > 注册 </el-button>
    </div>
    <div v-else>
      <el-dropdown @command="handleCommand">
        <span
          class="el-dropdown-link"
          :title="user.usersAccountAccount"
        >
          {{ user.usersAccountAccount.substr(0, 6) + '...' }}<i
            class="el-icon-arrow-down el-icon--right"
          ></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="modifyPassword">修改密码</el-dropdown-item>
          <el-dropdown-item command="modifyEmail">修改邮箱</el-dropdown-item>
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import * as types from '@/store/types.js'

export default {
  name: 'userInfo',
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    },
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    handleCommand (command) {
      if (command === 'logout') {
        this.$store.commit(types.LOGOUT)
        this.$notify({
          title: '登出成功',
          message: '登出成功，正在跳转到登录页面...',
          type: 'success'
        })
        this.$nextTick(() => {
          this.$router.push('/login')
        })
      } else if (command === 'modifyPassword') {
        this.$emit('modifyPassword')
      } else if (command === 'modifyEmail') {
        this.$emit('modifyEmail')
      }
    },
    goTo (path) {
      this.$router.push('/' + path)
    },
    goToOrder () {
      this.$confirm('当前用户未登录，是否跳转到登录页面?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            instance.confirmButtonText = '跳转中...'
            setTimeout(() => {
              instance.confirmButtonLoading = false
              instance.confirmButtonText = '确定'
              done()
              this.$router.push('login')
            }, 1000)
          } else {
            done()
          }
        }
      })
    }
  }
}
</script>

<style scoped>
.el-dropdown {
  margin-right: 10px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
</style>
