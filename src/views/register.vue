<template>
  <div class="register">
    <el-container>
      <el-header>
        <h2>注册</h2>
      </el-header>
      <el-main>
        <el-form
          :label-position="labelPosition"
          label-width="100px"
          :model="signUpForm"
        >
          <el-form-item label="账号：">
            <el-input
              size="small"
              v-model="loginForm.userName"
              placeholder="请输入您的手机号"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码：">
            <el-input
              size="small"
              v-model="loginForm.password"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码重复：">
            <el-input
              size="small"
              v-model="loginForm.userName"
              placeholder="请再次输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱：">
            <el-input
              size="small"
              v-model="loginForm.userName"
              placeholder="请输入您的邮箱"
            ></el-input>
          </el-form-item>
          <el-form-item label="姓名：">
            <el-input
              v-model="loginForm.userName"
              placeholder="请输入您的姓名"
            ></el-input>
          </el-form-item>
          <el-form-item label="身份证号：">
            <el-input
              size="small"
              v-model="loginForm.userName"
              placeholder="请输入您的身份证号"
            ></el-input>
          </el-form-item>
          <el-form-item label="所属公司：">
            <el-input
              size="small"
              v-model="loginForm.userName"
              placeholder="请输入您所属的公司"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="register-btn" type="primary"> 注册 </el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'register',
  data () {
    return {
      labelPosition: 'right',
      loginForm: {
        userName: '',
        password: ''
      },
      loading: false
    }
  }
}
</script>

<style scoped>
.el-container {
  height: 100vh;
}
.el-header > h2 {
  padding-left: 60px;
}
.el-main {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -60px;
}
.el-form {
  width: 400px;
}
.el-form-item {
  margin-bottom: 10px;
}
.register-btn {
  margin-top: 10px;
  margin-left: 40px;
  width: 140px;
}
</style>
