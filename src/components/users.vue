<template>
  <div>
    <!-- 面包屑结构 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--(栅格) 输入框/按钮 -->
    <el-row>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple-light">
            <el-button type="success" plain>添加用户</el-button>
        </div>
      </el-col>
    </el-row>
    <!-- 表格结构 -->

    <!-- 分页/选页容量 -->
  </div>
</template>

<script>
export default {
  name: "users"
};
</script>

<style>
</style>
