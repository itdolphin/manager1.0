<template>
  <div>
    <!-- 面包屑结构 -->
    <el-breadcrumb class="my_breadcrumb" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!--(栅格) 输入框/按钮 -->
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-light">
          <el-button type="danger" plain>添加分类</el-button>
        </div>
      </el-col>
    </el-row>
    <!-- 表格结构 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="cat_name" label="分类名称" width="180"></el-table-column>
      <el-table-column prop="cat_level" label="级别" width="180"></el-table-column>
      <el-table-column prop="cat_deleted" label="是否有效" width="180"></el-table-column>
      <el-table-column label="操作" width="180"></el-table-column>
    </el-table>
    <!-- 分页/选页容量 -->
    <el-pagination
      :current-page="pageSet.pagenum"
      :page-size="pageSet.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "categories",
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      total:0,
      pageSet:{
        pagesize:5,
        pagenum:1,
      }
    };
  },
  created(){
    this.$request.goodsCategories(1).then(res=>{
       console.log(res);
       this.tableData=res.data.data
       this.total=res.data.data.length
    })
  }
};
</script>

<style lang='scss'>
    .my_breadcrumb{
        height: 40px;
        line-height: 40px;
        background-color: #d3dce6;
    }
</style>
