<template>
  <div class="login">
    <div class="center-box">
      <el-form label-position="top" label-width="80px" :model="loginForm" :rules="loginRules" ref="loginForm">
        <h2>用户登录</h2>
        <el-form-item label="用户名" prop="username" >
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" type='password'></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="my_login" type="primary" @click="submitForm('loginForm')">登陆</el-button>
          <!-- <el-button class="my_reset" type="info" @click="resetForm('loginForm')">重置</el-button> -->
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  // 表单数据验证
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      loginRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "change" },
          { min: 4, max: 8, message: "长度在 4 到 8 个字符", trigger: "change" }
        ],
        password: [
          { required: true, message: "请输入用户密码", trigger: "change" },
          { min: 6, max: 12, message: "长度在 6 到 12 个字符", trigger: "change" }
        ]
      }
    };
  },
  // 生命周期钩子
  created() {
    // this.$request.sayHi();
  },
   methods: {
    //  提交表单
      submitForm(loginForm) {
        this.$refs[loginForm].validate((valid) => {
          if (valid) {
            // alert('submit!');
            this.$request.login(this.loginForm).then(res=>{
               console.log(res);
              if(res.data.meta.status==200){
                // 登录成功
                this.$message.success(res.data.meta.msg)
                window.sessionStorage.setItem('token',res.data.data.token)
                // 编程式跳转
                this.$router.push("/")
              }else{
                // 登录失败
                this.$message.warning(res.data.meta.msg)
              }
            })
          } else {
            this.$message.warning('八嘎呀路')
            return false;
          }
        });
      },
      resetForm(loginForm) {
        this.$refs[loginForm].resetFields();
      }
    }
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
      h2 {
        text-align: center;
      }
      .my_login {
        width: 100%;
      }
    }
  }
}
</style>
