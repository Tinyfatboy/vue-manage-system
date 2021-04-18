<template>
  <div>
    <el-dialog
      title="修改邮箱"
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
          label-width="100px"
          :rules="rules"
        >
          <el-form-item
            label="密码："
            prop="pw"
          >
            <el-input
              size="small"
              v-model="formData.pw"
              type="password"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="新邮箱："
            prop="newEmail"
          >
            <el-input
              size="small"
              v-model="formData.newEmail"
              placeholder="请输入新邮箱"
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
    return {
      formData: {
        pw: '',
        newEmail: ''
      },
      rules: {
        pw: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ],
        newEmail: [
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
        ]
      },
      loading: false
    }
  },
  methods: {
    closeDialog () {
      this.formData = {
        pw: '',
        newEmail: ''
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
          const { pw, newEmail } = this.formData

          axiosHttp
            .modifyEmail({
              usersAccountId,
              pw,
              newEmail
            })
            .then(res => {
              this.loading = false
              const { code = null } = (res && res.data) || {}

              if (code === 200) {
                this.$notify({
                  title: '成功',
                  message: '修改用户邮箱成功',
                  type: 'success'
                })
              } else {
                this.$notify({
                  title: '失败',
                  message: '修改用户邮箱失败',
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
