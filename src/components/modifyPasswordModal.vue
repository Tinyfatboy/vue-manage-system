<template>
  <div>
    <el-dialog
      title="修改密码"
      :visible.sync="showModal"
      :close-on-click-modal="false"
      width="480px"
      show-close
      center
    >
      <div style="margin: 0 20px;">
        <el-form
          ref="formData"
          :model="formData"
          label-position="right"
          label-width="120px"
          :rules="rules"
        >
          <el-form-item
            label="旧密码："
            prop="oldPW"
          >
            <el-input
              size="small"
              v-model="formData.oldPW"
              type="password"
              placeholder="请输入旧密码"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="新密码："
            prop="newPW"
          >
            <el-input
              size="small"
              v-model="formData.newPW"
              type="password"
              placeholder="请输入新密码"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="新密码重复："
            prop="newPWRepeat"
          >
            <el-input
              size="small"
              v-model="formData.newPWRepeat"
              type="password"
              placeholder="请再次输入新密码"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>

      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          size="small"
          @click="closeDialog"
        >取 消</el-button>
        <el-button
          size="small"
          type="primary"
          :loading="loading"
          @click="submitForm"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axiosHttp from '../utils/create-api.js'

export default {
  props: {
    show: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  computed: {
    showModal: {
      get () {
        return this.show
      },

      set (val) {
        this.$emit('update:show', val)
      }
    },
    user () {
      return this.$store.state.user || {}
    }
  },
  data () {
    const validatePassword = (rule, value, callback) => {
      if (this.formData.newPWRepeat !== '') {
        this.$refs.formData.validateField('newPWRepeat')
      }
      callback()
    }

    const validatePasswordRepeat = (rule, value, callback) => {
      if (value !== this.formData.newPW) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }

    return {
      formData: {
        oldPW: '',
        newPW: '',
        newPWRepeat: ''
      },
      rules: {
        oldPW: [
          {
            required: true,
            message: '请输入旧密码',
            trigger: 'blur'
          }
        ],
        newPW: [
          {
            required: true,
            message: '请输入新密码',
            trigger: 'blur'
          },
          {
            validator: validatePassword,
            trigger: 'change'
          }
        ],
        newPWRepeat: [
          {
            required: true,
            message: '请再次输入新密码',
            trigger: 'blur'
          },
          {
            validator: validatePasswordRepeat,
            trigger: 'change'
          }
        ]
      },
      loading: false
    }
  },
  methods: {
    closeDialog () {
      this.formData = {
        oldPW: '',
        newPW: '',
        newPWRepeat: ''
      }
      this.showModal = false
      this.$nextTick(() => {
        this.$refs.formData.clearValidate()
      })
    },
    submitForm () {
      this.$refs.formData.validate(valid => {
        if (valid) {
          this.loading = true

          const { usersAccountId = '' } = this.user
          const { oldPW, newPW } = this.formData

          axiosHttp
            .modifyPassword({
              usersAccountId,
              oldPW,
              newPW
            })
            .then(res => {
              this.loading = false
              const { code = null } = (res && res.data) || {}

              if (code === 200) {
                this.$notify({
                  title: '成功',
                  message: '修改用户密码成功',
                  type: 'success'
                })
              } else {
                this.$notify({
                  title: '失败',
                  message: '修改用户密码失败',
                  type: 'error'
                })
              }
              this.closeDialog()
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
.el-dropdown {
  margin-right: 10px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
</style>
