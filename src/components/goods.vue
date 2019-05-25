<template>
  <div>
    <!-- 面包屑结构 -->
    <el-breadcrumb class="my_breadcrumb" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "goods",
  
};
</script>

<style lang='scss'>
    .my_breadcrumb{
        height: 40px;
        line-height: 40px;
        background-color: #d3dce6;
    }
</style>
