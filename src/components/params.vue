<template>
  <div>
    <!-- 面包屑结构 -->
    <el-breadcrumb class="my_breadcrumb" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- Alert警告 -->
    <el-alert class="my_alert el-icon-warning" title="注意: 只允许为第三级分类设置相关参数!" type="warning"></el-alert>
    <!-- 级联结构 -->
    <div class="my_cates">
      <span>请选择商品分类:</span>
      <el-cascader
        :props="props"
        expand-trigger="hover"
        @change="searchSpecGoods"
        :options="options"
        class="my_cascader"
        placeholder="请选择商品分类"
      ></el-cascader>
    </div>
    <!-- tabs设置 -->
    <el-tabs v-model="activeName" class="my_tabs">
      <el-tab-pane label="动态参数" name="first">
        <div>
          <el-button type="primary" size="small" :disabled="!isOk">添加动态参数</el-button>
          <el-table :data="dynamicTable" border style="width: 100%" class="tabs_content">
            <el-table-column prop="date" label width="50" type="expand">
              <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item >
                  <el-button v-for="(row, index) in props" :key="index" type="primary" 
                  plain size="small">{{row}}</el-button>
                </el-form-item>
              </el-form>
            </template>
            </el-table-column>
            <el-table-column prop="index" label="#" width="50" type="index"></el-table-column>
            <el-table-column prop="attr_name" label="商品参数" width="180"></el-table-column>
            <el-table-column prop="address" label="操作">
              <template>
              <el-button type="primary" icon="el-icon-edit" plain size="small"></el-button>
              <el-button type="danger" icon="el-icon-delete" plain size="small"></el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="静态参数" name="second">
        <div>
          <el-button type="primary" size="small" :disabled="!isOk">添加静态参数</el-button>
          <el-table :data="staticTable" border style="width: 100%" class="tabs_content">
            <el-table-column prop="date" label="#" width="50" type="index"></el-table-column>
            <el-table-column prop="attr_name" label="属性名称" width="250"></el-table-column>
            <el-table-column prop="attr_vals" label="属性值" width="280"></el-table-column>
            <el-table-column prop="address" label="操作">
              <!-- <template> -->
              <el-button type="primary" icon="el-icon-edit" plain size="small"></el-button>
              <el-button type="danger" icon="el-icon-delete" plain size="small"></el-button>
              <!-- </template> -->
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "params",
  data() {
    // 级联数据
    return {
      options: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则",
              children: [
                {
                  value: "yizhi",
                  label: "一致"
                },
                {
                  value: "fankui",
                  label: "反馈"
                },
                {
                  value: "xiaolv",
                  label: "效率"
                },
                {
                  value: "kekong",
                  label: "可控"
                }
              ]
            },
            {
              value: "daohang",
              label: "导航",
              children: [
                {
                  value: "cexiangdaohang",
                  label: "侧向导航"
                },
                {
                  value: "dingbudaohang",
                  label: "顶部导航"
                }
              ]
            }
          ]
        },
        {
          value: "zujian",
          label: "组件",
          children: [
            {
              value: "basic",
              label: "Basic",
              children: [
                {
                  value: "layout",
                  label: "Layout 布局"
                },
                {
                  value: "color",
                  label: "Color 色彩"
                },
                {
                  value: "typography",
                  label: "Typography 字体"
                },
                {
                  value: "icon",
                  label: "Icon 图标"
                },
                {
                  value: "button",
                  label: "Button 按钮"
                }
              ]
            },
            {
              value: "form",
              label: "Form",
              children: [
                {
                  value: "radio",
                  label: "Radio 单选框"
                },
                {
                  value: "checkbox",
                  label: "Checkbox 多选框"
                },
                {
                  value: "input",
                  label: "Input 输入框"
                },
                {
                  value: "input-number",
                  label: "InputNumber 计数器"
                },
                {
                  value: "select",
                  label: "Select 选择器"
                },
                {
                  value: "cascader",
                  label: "Cascader 级联选择器"
                },
                {
                  value: "switch",
                  label: "Switch 开关"
                },
                {
                  value: "slider",
                  label: "Slider 滑块"
                },
                {
                  value: "time-picker",
                  label: "TimePicker 时间选择器"
                },
                {
                  value: "date-picker",
                  label: "DatePicker 日期选择器"
                },
                {
                  value: "datetime-picker",
                  label: "DateTimePicker 日期时间选择器"
                },
                {
                  value: "upload",
                  label: "Upload 上传"
                },
                {
                  value: "rate",
                  label: "Rate 评分"
                },
                {
                  value: "form",
                  label: "Form 表单"
                }
              ]
            },
            {
              value: "data",
              label: "Data",
              children: [
                {
                  value: "table",
                  label: "Table 表格"
                },
                {
                  value: "tag",
                  label: "Tag 标签"
                },
                {
                  value: "progress",
                  label: "Progress 进度条"
                },
                {
                  value: "tree",
                  label: "Tree 树形控件"
                },
                {
                  value: "pagination",
                  label: "Pagination 分页"
                },
                {
                  value: "badge",
                  label: "Badge 标记"
                }
              ]
            },
            {
              value: "notice",
              label: "Notice",
              children: [
                {
                  value: "alert",
                  label: "Alert 警告"
                },
                {
                  value: "loading",
                  label: "Loading 加载"
                },
                {
                  value: "message",
                  label: "Message 消息提示"
                },
                {
                  value: "message-box",
                  label: "MessageBox 弹框"
                },
                {
                  value: "notification",
                  label: "Notification 通知"
                }
              ]
            },
            {
              value: "navigation",
              label: "Navigation",
              children: [
                {
                  value: "menu",
                  label: "NavMenu 导航菜单"
                },
                {
                  value: "tabs",
                  label: "Tabs 标签页"
                },
                {
                  value: "breadcrumb",
                  label: "Breadcrumb 面包屑"
                },
                {
                  value: "dropdown",
                  label: "Dropdown 下拉菜单"
                },
                {
                  value: "steps",
                  label: "Steps 步骤条"
                }
              ]
            },
            {
              value: "others",
              label: "Others",
              children: [
                {
                  value: "dialog",
                  label: "Dialog 对话框"
                },
                {
                  value: "tooltip",
                  label: "Tooltip 文字提示"
                },
                {
                  value: "popover",
                  label: "Popover 弹出框"
                },
                {
                  value: "card",
                  label: "Card 卡片"
                },
                {
                  value: "carousel",
                  label: "Carousel 走马灯"
                },
                {
                  value: "collapse",
                  label: "Collapse 折叠面板"
                }
              ]
            }
          ]
        },
        {
          value: "ziyuan",
          label: "资源",
          children: [
            {
              value: "axure",
              label: "Axure Components"
            },
            {
              value: "sketch",
              label: "Sketch Templates"
            },
            {
              value: "jiaohu",
              label: "组件交互文档"
            }
          ]
        }
      ],
      // 级联选择器的对应关系
      props: {
        value: "cat_id",
        label: "cat_name",
        children: "children"
      },
      activeName: "first",
      // 静态数据
      staticTable: [],
      // 动态数据
      dynamicTable: [],
      // 是否符合
      isOk: false
    };
  },
  methods: {
    // 选中某个商品
    searchSpecGoods(value) {
      console.log(value);
      if (value.length == 3) {
        this.isOk = true;
        this.$request.dynamicGoodsParams(value[2]).then(res => {
          this.dynamicTable = res.data.data;
          console.log(res);
        });
        this.$request.staticGoodsParams(value[2]).then(res => {
          this.staticTable = res.data.data;
          console.log(res);
        });
      } else {
        this.isOk = false;
        this.dynamicTable = [];
        this.staticTable = [];
      }
    }
  },
  created() {
    this.$request.getAllGoodsCate().then(res => {
      console.log(res);
      this.options = res.data.data;
    });
  }
};
</script>

<style lang='scss'>
// 面包屑
.my_breadcrumb {
  height: 40px;
  line-height: 40px;
  padding-left: 10px;
  background-color: #d3dce6;
}
// alert警告
.my_alert {
  margin: 20px 0;
}
// 商品分类选择
.my_cates {
  margin-bottom: 20px;
  .my_cascader {
    margin-left: 20px;
  }
}
// 动静参数tabs
.my_tabs {
  .tabs_content {
    margin-top: 20px;
  }
}

</style>
