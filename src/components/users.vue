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
      <el-table-column prop="index" label="#" width="30" type="index"></el-table-column>
      <el-table-column prop="username" label="姓名" width="160"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="300"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="300"></el-table-column>
      <el-table-column prop="mg_state" label="用户状态" width="80">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state" active-color="green" inactive-color="deeppink"></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="run" label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)" plain></el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(scope.$index, scope.row)" plain></el-button>
          <el-button size="mini" type="warning" icon="el-icon-check" @click="handleCheck(scope.$index, scope.row)" plain></el-button>
        </template>
      </el-table-column>
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
  methods: {
    handleEdit(index,row) {
       console.log(index);
       console.log(row);
    },
    handleDelete(index,row) {
       console.log(index);
        console.log(row);
    },
    handleCheck(row,index) {
      console.log(row);
        console.log(index);
        
    }
  },
  data() {
    return {
      value1: true,
      value2: true,
      tableData: [],
      // 增加提交的数据
      userData: {
        query: "",
        pagenum: 1,
        pagesize: 10
      }
    };
  },
  // 调用接口
  created() {
    this.$request.getUsers(this.userData).then(res => {
      console.log(res);
      this.tableData = res.data.data.users;
    });
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
