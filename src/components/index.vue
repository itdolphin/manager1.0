<template>
  <el-container class="index_container">
    <el-header class="index_header">
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <img class="logo_img" src="../assets/apple.png" alt>
          </div>
        </el-col>
        <el-col :span="19">
          <div class="grid-content bg-purple-light" id="title">Apple Inc. Background Monitoring Center</div>
        </el-col>
        <el-col :span="1">
          <div class="grid-content bg-purple">
            <el-button type="text" @click="logout" id="quit">QUIT </el-button>
              
          </div>
        </el-col>
      </el-row>
    </el-header>
    <!--左侧权限菜单 -->
    <el-container>
      <el-aside class="index_aside" width="200px">
        <el-menu router
          default-active="2"
          class="el-menu-vertical-demo"
        >
            <el-submenu :index="item.order+''" v-for="(item, index) in $store.state.menusList" :key="index">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item-group v-for="(item1, index1) in item.children" :key="index1">
              <el-menu-item :index="item1.path"><i class="el-icon-menu"></i>{{item1.authName}}</el-menu-item>
            </el-menu-item-group>
            </el-submenu> 

        </el-menu>
      </el-aside>
      <el-main class="index_main">
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>

export default {
  name: "index",

  data(){
    return {
      // 左侧权限菜单
    menusList:[]

    }
  },
  methods:{
    // 登出
     logout() {
        this.$confirm('真的要退出吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '退出成功!'
          });
         window.sessionStorage.removeItem('token') 
         // 编程式导航
      this.$router.push('/login')
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          });          
        });
      },
   
  },
  beforeCreate() {
    if(!window.sessionStorage.getItem('token')){
      this.$message.warning('请先登录~~~~')
      this.$router.push('/login')
    }
  },
  created(){
    this.$request.getMenusRights().then(res=>{
       console.log(res);
      //  赋值给权限菜单
      //  this.menusList=res.data.data
      //  保存到仓库中
      //  console.log(res.data.data);
       this.$store.commit('changeMenusList',res.data.data)
    })
  }
};
</script>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
  .index_container {
    height: 100%;
    .index_header {
      background-color: #313131;
      .logo_img {
        height: 60px;
      }
      #title {
        font-weight: bolder;
        text-align: center;
        line-height: 60px;
        font-size: 20px;
        color: #fff;
      }
      #quit {
        margin-top: 10px;
      }
    }
    .index_aside {
      background-color: #444444;
      color: white;
    }
    .index_main {
      background-color: #e9eef3;
      
    }
    .index_main .el-main{
        padding-top: 0;
      }
  }
}
</style>
