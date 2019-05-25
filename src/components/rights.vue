<template>
  <div>
    <!-- 面包屑结构 -->
    <el-breadcrumb class="my_breadcrumb" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    
    <!-- 表格结构 -->
    <el-table :data="tableData" border style="width: 100%" v-loading="loading">
      <el-table-column  label="#" type='index' ></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="200"></el-table-column>
      <el-table-column prop="path" label="路径" width="200"></el-table-column>
      <el-table-column prop="level" label="层级" width="200">
        <!-- 自定义模板 -->
        <template slot-scope="niubi">
            {{niubi.row.level==0?'第一级':''}}
            {{niubi.row.level==1?'第二级':''}}
            {{niubi.row.level==2?'第三级':''}}
        </template>
      </el-table-column>
    </el-table>
   
  </div>
</template>

<script>
export default {
  name: "rights",
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
      loading:true
    };
  },
  created(){
    // this.loading=true
    this.$request.rightsList().then(res=>{
       console.log(res);  
       this.tableData=res.data.data
        // setTimeout(function(){
          setTimeout(() => {
            // console.log(this);
            
            this.loading=false
          }, 1000);
        // },1000)
      //  this.tableData.forEach(v => {
      //    if(v.level==0){
      //      v.level='第一级'
      //    } else if(v.level==1){
      //       v.level='第二级'
      //    } else{
      //      v.level='第三级'
      //    }
      //  });
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
