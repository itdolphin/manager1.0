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
          <div class="grid-content bg-purple-light" id="title">Apple Background monitoring center</div>
        </el-col>
        <el-col :span="1">
          <div class="grid-content bg-purple">
            <el-button type="primary" id="quit">QUIT</el-button>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="index_aside" width="200px" >Aside</el-aside>
      <el-main class="index_main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "index"
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
      #quit{
          margin-top: 10px;
      }
    }
    .index_aside {
      background-color: #444444;
      color: white;
    }
    .index_main {
      background-color: #fafafa;
    }
  }
}
</style>
