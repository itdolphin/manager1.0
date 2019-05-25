<template>
  <div>
    <!-- 面包屑结构 -->
    <el-breadcrumb class="my_breadcrumb" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 订单 表格结构 -->
    <el-table :data="orderListData" border style="width: 100%">
      <el-table-column prop="#" type="index"></el-table-column>
      <el-table-column prop="order_number" label="订单编号" width="280"></el-table-column>
      <el-table-column prop="order_price" label="订单价格" width="80"></el-table-column>
      <el-table-column  label="是否付款" width="100">
        <!-- 自定义模板 -->
        <template slot-scope="scope">
          <el-button type="danger" v-if="scope.row.pay_status==0" plain>未付款</el-button>
          <el-button type="success" v-else plain>已付款</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="is_send" label="是否发货" width="100"></el-table-column>
      <el-table-column label="下单时间" width="180">
        <template slot-scope="xiadan">{{xiadan.row.create_time|formatTime}}</template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="editOrderVisible=true"
            plain
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页/选页容量 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageData.pagenum"
      :page-sizes="[3, 6, 9, 12]"
      :page-size="pageData.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 点击修改地址 对话框 -->
    <el-dialog title="修改订单地址" :visible.sync="editOrderVisible">
      <el-form :model="editOrderForm" ref="editOrderForm" >
        <el-form-item label="省市区/县" prop="roleName" label-width="120px">
        <!-- 饿了么ui级联 -->
          <el-cascader
            expand-trigger="hover"
            :options="options"
            v-model="selectedOptions2"
            @change="handleChange"
          ></el-cascader>

          <!-- v-distpicker插件 -->
          <v-distpicker province="广东省" city="深圳市" area="宝安区" @selected='selected'></v-distpicker>
        </el-form-item>
        <el-form-item label="详细地址" prop="roleDesc" label-width="120px">
          <el-input v-model="editOrderForm.roleDesc" autocomplete="on"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editOrderVisible = false">取 消</el-button>
        <el-button type="primary" @click="editOrderVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 导入moment包
import moment from "moment";
// 导入省市区数据
import ssq from '../assets/city_data2018_element.js'
// 导入第三方插件 v-distpicker
import VDistpicker from 'v-distpicker'
export default {
  name: "orders",
  components: { VDistpicker },
  data() {
    return {
      orderListData: [],
      // 订单数据
      pageData: {
        pagenum: 1,
        pagesize: 9
      },
      // 订单总数
      total: 0,
      // 修改订单
      editOrderVisible: false,
      editOrderForm: {},
      // 级联选择器
      selectedOptions2: [],
      options:ssq
    };
  },
  // 过滤函数
  filters: {
    formatTime(value) {
      return moment(value).format("YYYY-MM-DD HH:mm:ss");
    }
  },
  methods: {
    // 切换页容量
    handleSizeChange(size) {
      this.pageData.pagesize = size;
      this.getOrderList();
    },
    // 跳转到特定页面
    handleCurrentChange(current) {
      this.pageData.pagenum = current;
      this.getOrderList();
    },
    // 获取订单列表
    getOrderList() {
      this.$request.getAllOrders(this.pageData).then(res => {
        // console.log(res);
        if (!res.data.data) {
          return;
        }
        this.orderListData = res.data.data.goods;
        this.total = res.data.data.total;
      });
    },
    // 饿了么ui级联选择器
    handleChange(value){
         console.log(value);
    },
    // 第三方省市区
    selected(ssq){
       console.log(ssq);
    }
  },
  created() {
    this.getOrderList();
  }
};
</script>

<style lang='scss'>
.my_breadcrumb {
  height: 40px;
  line-height: 40px;
  background-color: #d3dce6;
}
</style>
