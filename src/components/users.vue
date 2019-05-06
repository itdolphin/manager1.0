<template>
  <div>
    <!-- 面包屑结构 -->
    <el-breadcrumb class="my_breadcrumb" separator-class="el-icon-arrow-right">
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
          <el-button type="success" plain class="add_user">添加用户</el-button>
        </div>
      </el-col>
    </el-row>
    <!-- 表格结构 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="#" label="#" width="30"></el-table-column>
      <el-table-column prop="name" label="姓名" width="160"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="300"></el-table-column>
      <el-table-column prop="phone" label="电话" width="300"></el-table-column>
      <el-table-column prop="userstate" label="用户状态" width="80">
        <el-switch v-model="value2" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
      </el-table-column>
      <el-table-column prop="run" label="操作" width="200"></el-table-column>
    </el-table>
    <!-- 分页/选页容量 -->
    <el-pagination
      :current-page="1"
      :page-sizes="[3, 6, 9, 12]"
      :page-size="6"
      layout="total, sizes, prev, pager, next, jumper"
      :total="100"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "users",
  data() {
    return {
      value1: true,
        value2: true,
      tableData: [
        {
          bvf: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          bvf: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          bvf: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          bvf: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  }
};
</script>

<style lang='scss'>
.my_breadcrumb {
  height: 40px;
  line-height: 40px;
  background-color: #d3dce6;
}
.add_user {
  margin-left: 5px;
}
</style>
