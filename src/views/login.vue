<template>
  <div class="login">
    <el-container>
      <el-main>
        <el-form
          ref="loginForm"
          :label-position="labelPosition"
          label-width="80px"
          :model="loginForm"
          :rules="rules"
          status-icon
        >
          <h2>通航用户登录</h2>
          <el-form-item
            label="用户名："
            prop="usersAccountAccount"
          >
            <el-input
              v-model="loginForm.usersAccountAccount"
              placeholder="请输入账号(手机号)"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="密 码："
            prop="usersAccountPassword"
          >
            <el-input
              v-model="loginForm.usersAccountPassword"
              type="password"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              class="login-btn"
              type="primary"
              @click="submitForm"
              :loading="loading"
            > 登录 </el-button>
          </el-form-item>
          <el-button
            class="register-btn"
            type="text"
            @click="goToRegister"
          > 注册 </el-button>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import * as types from '@/store/types.js'
import axiosHttp from '../utils/create-api.js'

export default {
  name: 'login',
  data () {
    const regMobile = /^1[3-9]\d{9}$/

    const validateMobile = (rule, value, callback) => {
      if (!regMobile.test(value)) {
        callback(new Error('手机号格式不正确'))
      } else {
        callback()
      }
    }

    return {
      labelPosition: 'left',
      loginForm: {
        usersAccountAccount: '',
        usersAccountPassword: ''
      },
      rules: {
        usersAccountAccount: [
          {
            required: true,
            message: '请输入手机号',
            trigger: 'blur'
          },
          {
            validator: validateMobile,
            trigger: 'blur'
          }
        ],
        usersAccountPassword: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ]
      },
      loading: false
    }
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    }
  },
  mounted () {
    if (this.isLogin) {
      this.$router.push('/home')
    }
  },
  methods: {
    goToRegister () {
      this.$router.push('/register')
    },
    submitForm () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true

          const { usersAccountAccount, usersAccountPassword } = this.loginForm

          axiosHttp
            .login({
              usersAccountAccount,
              usersAccountPassword
            })
            .then(res => {
              this.loading = false

              const { code = null, description = '', data = {} } =
                (res && res.data) || {}

              if (code === 200) {
                const date = new Date().getTime()
                const userInfo = { date, user: data }
                localStorage.setItem('userInfo', JSON.stringify(userInfo))
                this.$store.commit(types.LOGIN, data)

                this.$notify({
                  title: '登录成功',
                  message: '登录成功，正在跳转到主页...',
                  type: 'success'
                })
                this.$nextTick(() => {
                  this.$router.push('/home')
                })
              } else {
                this.$notify({
                  title: '登录失败',
                  message: description,
                  type: 'error'
                })
              }
            })
            .catch(() => {
              this.loading = false
            })
        }
      })
    }
  }
}
</script>

<style scoped>
.el-container {
  height: 100vh;
}
.el-main {
  display: flex;
  align-items: center;
  justify-content: center;
}
.el-form {
  border: 1px solid black;
  padding: 25px;
  min-width: 400px;
  position: relative;
}
.el-form > h2 {
  width: 100%;
  text-align: center;
  margin-bottom: 40px;
}
.login-btn {
  width: 140px;
  margin-left: 60px;
  margin-top: 10px;
}
.register-btn {
  position: absolute;
  right: 25px;
  bottom: 85px;
}
</style>
