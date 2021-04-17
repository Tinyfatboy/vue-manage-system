<template>
  <div class="register">
    <el-container>
      <el-header>
        <h2>通航用户注册</h2>
      </el-header>
      <el-main>
        <el-form
          ref="registerForm"
          :label-position="labelPosition"
          label-width="100px"
          :model="registerForm"
          :rules="rules"
          status-icon
        >
          <el-form-item
            label="账号："
            prop="usersAccountAccount"
          >
            <el-input
              size="small"
              v-model="registerForm.usersAccountAccount"
              placeholder="请输入您的手机号"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="密码："
            prop="usersAccountPassword"
          >
            <el-input
              size="small"
              v-model="registerForm.usersAccountPassword"
              type="password"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="密码重复："
            prop="usersAccountPasswordRepeat"
          >
            <el-input
              size="small"
              v-model="registerForm.usersAccountPasswordRepeat"
              type="password"
              placeholder="请再次输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="邮箱："
            prop="usersAccountEmail"
          >
            <el-input
              size="small"
              v-model="registerForm.usersAccountEmail"
              placeholder="请输入您的邮箱"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="姓名："
            prop="usersEssentialInformationName"
          >
            <el-input
              v-model="registerForm.usersEssentialInformationName"
              placeholder="请输入您的姓名"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="身份证号："
            prop="usersEssentialInformationIdNumber"
          >
            <el-input
              size="small"
              v-model="registerForm.usersEssentialInformationIdNumber"
              placeholder="请输入您的身份证号"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="所属公司："
            prop="usersEssentialInformationCompany"
          >
            <el-input
              size="small"
              v-model="registerForm.usersEssentialInformationCompany"
              placeholder="请输入您所属的公司"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              class="register-btn"
              type="primary"
              @click="submitForm"
              :loading="loading"
            > 注册 </el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import axiosHttp from '../utils/create-api.js'

export default {
  name: 'register',
  data () {
    const regMobile = /^1[3-9]\d{9}$/
    const regId = /\d{18}/

    const validateMobile = (rule, value, callback) => {
      if (!regMobile.test(value)) {
        callback(new Error('手机号格式不正确'))
      } else {
        callback()
      }
    }

    const validateId = (rule, value, callback) => {
      if (!regId.test(value)) {
        callback(new Error('身份证号格式不正确'))
      } else {
        callback()
      }
    }

    const validatePassword = (rule, value, callback) => {
      console.log(this.registerForm)
      if (this.registerForm.usersAccountPasswordRepeat !== '') {
        this.$refs.registerForm.validateField('usersAccountPasswordRepeat')
      }
      callback()
    }

    const validatePasswordRepeat = (rule, value, callback) => {
      if (value !== this.registerForm.usersAccountPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }

    return {
      labelPosition: 'right',
      registerForm: {
        usersAccountAccount: '',
        usersAccountPassword: '',
        usersAccountPasswordRepeat: '',
        usersAccountEmail: '',
        usersEssentialInformationName: '',
        usersEssentialInformationIdNumber: '',
        usersEssentialInformationCompany: ''
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
          },
          {
            validator: validatePassword,
            trigger: 'change'
          }
        ],
        usersAccountPasswordRepeat: [
          {
            required: true,
            message: '请再次输入密码',
            trigger: 'blur'
          },
          {
            validator: validatePasswordRepeat,
            trigger: 'change'
          }
        ],
        usersAccountEmail: [
          {
            required: true,
            message: '请输入邮箱',
            trigger: 'blur'
          },
          {
            type: 'email',
            message: '邮箱格式不正确',
            trigger: 'blur'
          }
        ],
        usersEssentialInformationName: [
          {
            required: true,
            message: '请输入姓名',
            trigger: 'blur'
          }
        ],
        usersEssentialInformationIdNumber: [
          {
            required: true,
            message: '请输入身份证号',
            trigger: 'blur'
          },
          {
            validator: validateId,
            trigger: 'blur'
          }
        ],
        usersEssentialInformationCompany: [
          {
            required: true,
            message: '请输入所属公司',
            trigger: 'blur'
          }
        ]
      },
      loading: false
    }
  },
  methods: {
    submitForm () {
      this.loading = true

      this.$refs.registerForm.validate(valid => {
        if (valid) {
          const {
            usersAccountAccount,
            usersAccountPassword,
            usersAccountEmail,
            usersEssentialInformationName,
            usersEssentialInformationIdNumber,
            usersEssentialInformationCompany
          } = this.registerForm
          const params = {
            usersAccountAccount,
            usersAccountPassword,
            usersAccountEmail,
            usersEssentialInformationName,
            usersEssentialInformationIdNumber,
            usersEssentialInformationCompany
          }

          axiosHttp
            .register(params)
            .then(res => {
              this.loading = false
              const { code = null, description = '' } = res.data || {}

              if (code === 200) {
                this.$notify({
                  title: '注册成功',
                  message: '注册成功，正在跳转到登录页面...',
                  type: 'success'
                })
                setTimeout(() => {
                  this.$router.push('/login')
                }, 2000)
              } else {
                this.$notify({
                  title: '注册失败',
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
  min-height: 100vh;
}
.el-header > h2 {
  padding-left: 60px;
}
.el-main {
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-form {
  width: 400px;
}
.register-btn {
  margin-top: 10px;
  margin-left: 40px;
  width: 140px;
}
</style>
