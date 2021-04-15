<template>
  <div class="login">
    <el-container>
      <el-main>
        <el-form
          :label-position="labelPosition"
          label-width="80px"
          :model="loginForm"
        >
          <h2>通航用户登录</h2>
          <el-form-item label="用户名：">
            <el-input
              v-model="loginForm.userName"
              placeholder="请输入账号(手机号)"
            ></el-input>
          </el-form-item>
          <el-form-item label="密 码：">
            <el-input
              v-model="loginForm.password"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="login-btn" type="primary"> 登录 </el-button>
          </el-form-item>
          <el-button class="register-btn" type="text"> 注册 </el-button>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      labelPosition: 'left',
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
