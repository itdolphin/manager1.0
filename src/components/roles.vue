<template>
  <div>
    <!-- 面包屑结构 -->
    <el-breadcrumb class="my_breadcrumb" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--(栅格) 输入框/按钮 -->
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-light">
          <el-button type="warning" plain @click="addRoleFormVisible = true">添加角色</el-button>
        </div>
      </el-col>
    </el-row>
    <!-- 主体角色列表 & 角色权限 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-row v-for="(level1,index) in props.row._children" :key="index">
            <el-col :span="6">
              <!-- 第一级tag -->
              <el-tag
                type="primary"
                :key="level1.id"
                closable
                @close="deleteRights(props.row,level1.id)"
              >{{level1.authName}}</el-tag>
              <span class="el-icon-arrow-right"></span>
            </el-col>
            <el-col :span="18">
              <el-row v-for="(level2,index2) in level1.children" :key="index2">
                <el-col :span="6">
                  <!-- 第二级tag -->
                  <el-tag
                    type="success"
                    :key="level2.id"
                    closable
                    @close="deleteRights(props.row,level2.id)"
                  >{{level2.authName}}</el-tag>
                  <span class="el-icon-arrow-right"></span>
                </el-col>
                <el-col :span="18">
                  <!-- 第三级tag -->
                  <el-tag
                    class="my_tag"
                    v-for="(level3) in level2.children"
                    type="warning"
                    :key="level3.id"
                    closable
                    @close="deleteRights(props.row,level3.id)"
                  >{{level3.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column prop="index" label="#" width="50" type="index"></el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="260"></el-table-column>
      <el-table-column prop="roleDesc" label="角色描述" width="400"></el-table-column>
      <el-table-column prop="run" label="操作" width="300">
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
            @click="handleCheck(scope.row)"
            plain
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 点击添加角色 对话框 -->
    <el-dialog title="添加角色" :visible.sync="addRoleFormVisible">
      <el-form :model="addRoleForm" :rules="addRoleRule" ref="addRoleForm">
        <el-form-item label="角色名称" prop="roleName" label-width="120px">
          <el-input v-model="addRoleForm.roleName" autocomplete="on"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc" label-width="120px">
          <el-input v-model="addRoleForm.roleDesc" autocomplete="on"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addRoleFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('addRoleForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 点击修改角色 对话框 -->
    <el-dialog title="编辑角色" :visible.sync="editRoleFormVisible">
      <el-form :model="editRoleForm" :rules="editRoleRule" ref="editRoleForm">
        <el-form-item label="角色名称" prop="roleName" label-width="120px">
          <el-input v-model="editRoleForm.roleName" autocomplete="on"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" label-width="120px">
          <el-input v-model="editRoleForm.roleDesc" autocomplete="on"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editRoleFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('editRoleForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 点击修改角色权限 对话框 -->
    <el-dialog title="权限分配" :visible.sync="updateRightsVisible">
      <el-tree :data="rightsData" :props="rightsProps" ref="tree" node-key='id' :default-checked-keys="defaultCheckedKeys"  show-checkbox default-expand-all></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateRightsVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateRolesRights">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑 -->
  </div>
</template>

<script>
export default {
  name: "roles",
  data() {
    return {
      tableData: [],
      // 添加角色显示&隐藏
      addRoleFormVisible: false,
      addRoleForm: {
        roleName: "",
        roleDesc: ""
      },
      // 3.规则
      addRoleRule: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "change"
          }
        ],
        roleDesc: [
          { required: true, message: "请输入角色描述", trigger: "blur" },
          {
            min: 5,
            max: 100,
            message: "长度在 5 到 100 个字符",
            trigger: "change"
          }
        ]
      },
      // 编辑角色数据
      editRoleFormVisible: false,
      editRoleForm: {
        roleName: "",
        roleDesc: ""
      },
      // 3.规则
      editRoleRule: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "change"
          }
        ]
      },
      // 修改角色权限
      updateRightsVisible: false,

      // 选中的角色权限
      rightsForm:{},
      // 所有的权限列表
      rightsData: [],
      // 权限对应关系
      rightsProps: {
        children: "children",
        label: "authName"
      },
      // 默认选中的角色权限
      defaultCheckedKeys:[]
    };
  },
  // 所有方法
  methods: {
    // 点击编辑角色名
    handleEdit(index, row) {
      //  console.log(row);
      // 发请求获得角色信息
      this.$request.queryRoleById(row.id).then(res => {
        console.log(res);
        if (res.data.meta.status == 200) {
          // 添加到对话框中
          this.editRoleForm = res.data.data;
          this.editRoleFormVisible = true;
        }
      });
    },
    // 点击删除
    handleDelete(index, row) {
      this.$confirm("陛下,,,,您准备永久删除该角色?", "提示", {
        confirmButtonText: "当然!!",
        cancelButtonText: "此话怎讲?",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.$request.deleteRole(row.id).then(res => {
            console.log(res);
            if (res.data.meta.status == 200) {
              this.getAllRoles();
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
    // 点击修改角色的权限
    handleCheck(row) {
      console.log(row);
      // 让对话框显示
      this.updateRightsVisible = true;
      this.rightsForm=row
      // 获取所有权限选项
      this.$request.treeRights().then(res=>{
        //  console.log(res);
         this.rightsData=res.data.data
      })
      // 选中对应角色的权限

      // 获取所有的权限id
      let checkedIds=[]
       // 三级嵌套的v都是根据其上下文确定的,不会相互影响
      // row._children.forEach(v1=>{
      //   checkedIds.push(v1.id)
      //   v1.children.forEach(v2=>{
      //     checkedIds.push(v2.id)
      //     v2.children.forEach(v3=>{
      //       checkedIds.push(v3.id)
           
      //     })
      //   })
      // })
      // function getRightsList(item){
      //   item._children.forEach(v=>{
      //     checkedIds.push(v.id)
      //     if(v.children){
      //       v._children=v.children
      //       getRightsList(v)
      //     }
      //   })
      // }
      function getRightsList(item){
        item._children.forEach(v=>{
          if(v.children){
            v._children=v.children
            getRightsList(v)
          } else{
            checkedIds.push(v.id)
          }
        })
      }
      getRightsList(row)
      this.defaultCheckedKeys=checkedIds
      
    },

    // 确认添加 角色
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //  console.log(this.editRoleForm);
          // 判断
          if (formName == "addRoleForm") {
            this.$request.addRole(this.addRoleForm).then(res => {
              console.log(res);
              this.addRoleFormVisible = false;
              this.getAllRoles();
            });
          } else {
            // {id:this.editRoleForm.roleId,roleName:this.editRoleForm.roleName,roleDesc:this.editRoleForm.roleDesc}
            this.editRoleForm.id = this.editRoleForm.roleId;
            this.$request.editRoles(this.editRoleForm).then(res => {
              console.log(res);
              if (res.data.meta.status == 200) {
                this.editRoleFormVisible = false;
                this.getAllRoles();
              }
            });
          }
        } else {
          this.$message.error("请注意信息的完整~~");
          return false;
        }
      });
    },
    // resetForm(formName) {
    //   this.$refs[formName].resetFields();
    // },
    // 获取所有角色
    getAllRoles() {
      this.$request.rolesList().then(res => {
        let data = res.data.data;
        data.forEach(v => {
          v._children = v.children;
          delete v.children;
        });
        //  console.log(data);
        this.tableData = data;
      });
    },
    // 删除指定权限
    deleteRights(row, rightId) {
      this.$request
        .deleteSpecRights({
          roleId: row.id,
          rightId
        })
        .then(res => {
          console.log(res);
          row._children = res.data.data;
        });
    },
    // 修改角色权限
    
    updateRolesRights(){
      // console.log(this.$refs.tree.getCheckedKeys());
      const rids=this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys()).join(',')
       console.log(rids);
        // console.log(this.$refs.tree.getHalfCheckedKeys());
      this.$request.setRolesRights({ roleId:this.rightsForm.id,  rids 
        }) 
        .then(res =>{
        // console.log(res)
        if(res.data.meta.status == 200){
          this.updateRightsVisible = false
          this.getAllRoles()
          // window.location.reload()
           
        }
        this.$request.getMenusRights().then(res=>{
           console.log(res);
           // 提交数据到仓库
           this.$store.commit('changeMenusList',res.data.data)
         })
        
      })
    },
    
  },

  // 页面创建开始
  created() {
    this.getAllRoles();
  }
};
</script>

<style lang='scss'>
.my_breadcrumb {
  height: 40px;
  line-height: 40px;
  background-color: #d3dce6;
}
.my_tag {
  margin-bottom: 5px;
  margin-right: 5px;
}
</style>
