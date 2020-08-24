<template>
  <el-container class="dashboard">
    <!-- Header -->
    <el-header>
      <div class="head-container">
        <img src="../assets/SHU_logo.png" class="logo" />
        <div class="header-container" style="font-size: 20px">
          <span class="titlename">汽车管理系统</span>
          <div v-if="role === 'worker'">
            <el-menu class="el-menu-demo" mode="horizontal" router>
              <el-menu-item index="/repair">
                <i class="el-icon-document"></i>
                <span slot="title">维修单填写</span>
              </el-menu-item>
              <el-menu-item index="/usage">
                <i class="el-icon-document"></i>
                <span slot="title">零件领用</span>
              </el-menu-item>
              <el-menu-item index="/carpart">
                <i class="el-icon-document"></i>
                <span slot="title">零件信息</span>
              </el-menu-item>
            </el-menu>
          </div>
          <div v-if="role === 'admin'">
            <el-menu class="el-menu-demo" mode="horizontal" router>
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-document"></i>
                  <span>信息管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/carpart_manage">
                    <i class="el-icon-document"></i>
                    <span slot="title">零件管理</span>
                  </el-menu-item>
                  <el-menu-item index="/mechanic_manage">
                    <i class="el-icon-document"></i>
                    <span slot="title">员工管理</span>
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-document"></i>
                  <span>信息查看</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/carpart">
                    <i class="el-icon-document"></i>
                    <span slot="title">零件信息</span>
                  </el-menu-item>
                  <el-menu-item index="/mechanic">
                    <i class="el-icon-document"></i>
                    <span slot="title">员工信息</span>
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-menu-item index="/register">
                <i class="el-icon-document"></i>
                <span slot="title">登记单填写</span>
              </el-menu-item>
            </el-menu>
          </div>
        </div>
      </div>
      <el-button @click="logout()" class="logoutbtn">登出</el-button>
    </el-header>
    <el-container>
      <!-- Aside -->
      <!-- Container -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      role: '',
      isCollapse: false
    }
  },
  created: function() {
    this.setRole()
  },
  methods: {
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    setRole() {
      this.role = window.sessionStorage.getItem('role')
      console.log(this.role)
    },
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>

<style lang='less' scoped>
.head-container {
  .logo {
    transform: translate(-49%, -47%) scale(0.05, 0.05);
    position: absolute;
    top: 0;
  }

  .titlename {
    position: absolute;
    top: 15px;
    left: 70px;
  }

  .header-container {
    font-family: '微软雅黑';
    color: #000;
  }

  .el-menu-demo {
    position: absolute;
    top: 0;
    left: 200px;
  }
}

.logoutbtn {
  float: right;
  margin: 10px;
}

.dashboard {
  height: 100%;
}

.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}

.el-container {
  background-color: #eaedf2;
}

.el-header {
  background-color: #fff;
}

.el-aside {
  background-color: #323744;
  .el-menu {
    border-right: none;
  }
}
</style>
