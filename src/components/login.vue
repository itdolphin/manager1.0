<template>
  <div class="login">
    <div class="center-box">
      <el-form label-position="top" label-width="80px">
        <h2>用户登录</h2>
        <el-form-item label="用户名">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="my_login" type="primary">登陆</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login"
};
</script>

<style lang="scss">
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
  .login {
    height: 100%;
    background-color: #324152;
    display: flex;
    justify-content: center;
    align-items: center;
    .center-box {
        width: 580px;
        height: 350px;
        border-radius: 5px;
        padding: 50px 35px;
        background-color: #fff;
        h2{
            text-align: center;
        }
        .my_login{
            width: 100%;
        }
    }
  }
}
</style>
