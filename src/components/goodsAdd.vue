<template>
  <div>
    <!-- 提示信息 -->
    <el-alert title="添加商品信息" type="info" show-icon center></el-alert>
    <!-- 上面步骤条 -->
    <el-steps  :space="200" :active="parseInt(active)" finish-status="success">
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
    </el-steps>
    <!-- 下面tab栏 -->
    <el-tabs v-model="active" tab-position="left" style="height: 200px;">
      <el-tab-pane label="基本信息" name="1">基本信息</el-tab-pane>
      <el-tab-pane label="商品参数" name="2">商品参数</el-tab-pane>
      <el-tab-pane label="商品属性" name="3">角色管理</el-tab-pane>
      <el-tab-pane label="商品图片" name="4">商品图片</el-tab-pane>
      <el-tab-pane label="商品内容" name="5">商品内容</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "goodsAdd",
  data() {
    return {
      active:'1'
    };
  },
  methods: {}
};
</script>

<style>
</style>
