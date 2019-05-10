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
          <el-input
            placeholder="请输入内容"
            v-model="userData.query"
            @keyup.enter.native="getUsers"
            class="input-with-select"
          >
            <el-button slot="append" icon="el-icon-search" @click="getUsers"></el-button>
          </el-input>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple-light">
          <el-button type="success" plain class="add_user" @click="addFormVisible = true">添加用户</el-button>
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
          <el-switch
            v-model="scope.row.mg_state"
            @change="stateChange(scope.row)"
            active-color="green"
            inactive-color="deeppink"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="run" label="操作" width="200">
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
          <el-button
            size="mini"
            type="warning"
            icon="el-icon-check"
            @click="handleCheck(scope.$index, scope.row)"
            plain
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页/选页容量 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="userData.pagenum"
      :page-sizes="[3, 6, 9, 12]"
      :page-size="userData.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 添加用户表单 -->
    <el-dialog title="添加用户" :visible.sync="addFormVisible">
      <el-form :model="addForm" :rules="addRules" ref="addForm">
        <el-form-item label="用户名" prop="username" label-width="120px">
          <el-input v-model="addForm.username" autocomplete="on"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" label-width="120px">
          <el-input v-model="addForm.password" autocomplete="on"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="120px">
          <el-input v-model="addForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="120px">
          <el-input v-model="addForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('addForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改用户表单 -->
    <el-dialog title="修改用户" :visible.sync="editFormVisible">
      <el-form :model="editForm" :rules="editRules" ref="editForm">
        <el-form-item label="用户名" prop="username" label-width="120px" >
          <el-input v-model="editForm.username" autocomplete="on" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="120px">
          <el-input v-model="editForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="120px">
          <el-input v-model="editForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('editForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配角色表单 -->
    <el-dialog title="分配角色" :visible.sync="rolesVisible">
      <el-form :model="sRolesForm"  ref="sRolesForm">
        <el-form-item label="当前用户" prop="username" label-width="120px" >
          <el-input v-model="sRolesForm.username" autocomplete="on"></el-input>
        </el-form-item>
        <el-form-item label="请选择角色"  label-width="120px" >
          <el-select v-model="roleValue" placeholder="请选择角色">
            <el-option label='未分配角色' :value='-1'></el-option>
            <el-option
              v-for="item in roles"
              :key="item.value"
              :label="item.roleName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="rolesVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('sRolesForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "users",
  data() {
    return {
      tableData: [],
      // 用户总数
      total: 0,
      // 增加提交的数据
      userData: {
        query: "",
        pagenum: 1,
        pagesize: 9
      },
      // 1.添加用户表单
      addFormVisible: false,
      // 2.数据
      addForm: {
        username: "",
        password: "",
        email: "",
        phone: ""
      },
      // 3.规则
      addRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 5, max: 8, message: "长度在 5 到 8 个字符", trigger: "change" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 12,
            message: "长度在 6 到 12 个字符",
            trigger: "change"
          }
        ]
      },
      // 编辑用户数据和规则
      editFormVisible:false,
      editForm:{
        username:'',
        email:'',
        mobile:''
      },
      editRules:{
      },
      // 分配角色数据
      rolesVisible:false,
      sRolesForm:{},
      roles: [],
      roleValue: ''
    };
  },
  methods: {
    // 编辑某个用户
    handleEdit(index, row) {
      //  console.log(index);
      //  console.log(row);
      this.$request.queryUserById(row.id).then(res=>{
        //  console.log(res);
            // this.editForm.username=res.data.data.username
            // this.editForm.email=res.data.data.email
            // this.editForm.phone=res.data.data.mobile
            this.editForm=res.data.data
            this.editFormVisible=true
      })
      
    },
    // 删除某个用户
    handleDelete(index, row) {
      //  console.log(index);
      // console.log(row);
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.$request.deleteUser(row.id).then(res => {
            console.log(res);
            if (res.data.meta.status == 200) {
              this.getUsers();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 分配角色
    handleCheck(index, row) {
      // console.log(row);
      // 获取当前用户名
      this.$request.queryUserById(row.id).then(res=>{
        //  console.log(res);
        //  获取当前id的用户名
         this.sRolesForm=res.data.data
        //  获取角色列表
        this.$request.rolesList().then(res=>{
          //  console.log(res);
           this.roles=res.data.data
          this.roleValue=this.sRolesForm.rid
          
          //  弹框
          this.rolesVisible=true
        })
      })
      
    },
    // 点击页容量改变
    handleSizeChange(size) {
      this.userData.pagesize = size;
      this.getUsers();
    },
    // 跳转到不同分页
    handleCurrentChange(current) {
      this.userData.pagenum = current;
      this.getUsers();
    },
    // 获取用户列表
    getUsers() {
      this.$request.getUsers(this.userData).then(res => {
        // console.log(res);
        this.tableData = res.data.data.users;
        this.total = res.data.data.total;
      });
    },
    // 用户状态改变时
    stateChange(row) {
      //  console.log(row);
      this.$request
        .changeUserState({ id: row.id, type: row.mg_state })
        .then(res => {
          console.log(res);
        });
    },
    // 添加用户 & 编辑用户
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 判断
          if(formName==='editForm'){
            // 编辑用户
            //  console.log(this.editForm);
             this.$request.editUsers(this.editForm).then(res => {
            if(res.data.meta.status==200){
              this.editFormVisible=false
              this.getUsers()
            } else{
              this.$message.error(res.data.meta.msg)
            }
          });
          }else if(formName==='addForm'){
            // 增加用户
          this.$request.addUsers(this.addForm).then(res => {
            console.log(res);
            // 添加成功
            if(res.data.meta.status==201){
                this.addFormVisible=false
                this.getUsers()
                // this.$message.warning(res.data.meta.msg)
                this.$refs[formName].resetFields();
            }else{
              this.$message.warning(res.data.meta.msg)
            }
          });
          } else{
            // 修改用户角色
            //  console.log(this.sRolesForm);
            this.$request.updateRoles({
              id:this.sRolesForm.id,
              rid:this.roleValue
            }).then(res=>{
            console.log(res);
            if(res.data.meta.status===200){
                  this.rolesVisible=false
                  this.getUsers()
            }
            
          })
          }
        } else {
          this.$message.error("数据格式有问题~~~~");
          return false;
        }
      });
    },
    // 修改用户角色
    // updateRoles(){
      
    // }
   
  },

  // 调用接口
  created() {
    this.getUsers();
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
