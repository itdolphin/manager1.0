<template>
    <div>
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
          <el-button type="primary" plain @click="$router.push('goods/add')">添加商品 </el-button>
        </div>
      </el-col>
    </el-row>
    <!-- 表格结构 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" label="#" width='50px'></el-table-column>
      <el-table-column prop="goods_name" label="商品名称" ></el-table-column>
      <el-table-column prop="goods_price" label="商品价格(元)" width="80"></el-table-column>
      <el-table-column prop="goods_weight" label="商品重量" width="80"></el-table-column>
      <el-table-column prop="add_time" label="创建时间" width="180"></el-table-column>
      <el-table-column  label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="handleEdit(scope.$index, scope.row)"
            plain
          ></el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="handleDelete(scope.$index, scope.row)"
            plain
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="orderSetting.pagenum"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="orderSetting.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

    </div>
</template>

<script>
export default {
    name:'goodsList',
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
      orderSetting:{
        query:'',
        pagenum:1,
        pagesize:10,
      },
      // 商品总数
      total:0,
    };
  },
  methods:{
    handleSizeChange(size){
      this.orderSetting.pagesize=size
      this.getAllGoods()
    },
    handleCurrentChange(current){
      this.orderSetting.pagenum=current
      this.getAllGoods()
    },
    // 获取所有的商品
    getAllGoods(){
      this.$request.getGoodsList(this.orderSetting).then(res=>{
       console.log(res);
       this.tableData=res.data.data.goods
       this.total=res.data.data.total
    })
    },
    // 编辑某个商品
    handleEdit(index,row){
       console.log(index);
       console.log(row);
    },
    // 删除某个商品前 判断
    handleDelete(index,row){
      //  console.log(index);
      //  console.log(row);
      this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.deleteThisGoods(row.goods_id)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    // 确定删除某个商品
    deleteThisGoods(id){
      this.$request.deleteSpecGoods(id).then(res=>{
         console.log(res);
         this.getAllGoods()
      })
    },
    // 页面跳转
    // addGoods(){
    //     this.$router.push('goods/add')
    // }
  },
  created() {
    this.getAllGoods()
  },
}
</script>

<style>

</style>
