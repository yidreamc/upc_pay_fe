<template>
    <el-row class="container">
        <el-col :span="24" class="header">
          <el-col :span="10" class='logo logo-width'>
              {{sysName}}
          </el-col>
          <el-col :span="4" class="userinfo">
            <el-dropdown trigger="hover">
              <span class="el-dropdown-link userinfo-inner">{{sysUserName}}</span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="handleLogout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-col>
        <el-col :span="24" class="main">
            <aside class='menu-expanded'>
                <!--导航菜单-->
                <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @close="handleclose"
                    @select="handleselect" unique-opened router>
                    <template v-for="(item,index) in $router.options.routes" v-if=" hasRole(item) ">
                        <el-submenu :index="index+''" v-if="!item.leaf" :key="item.key">
                            <template slot="title">{{item.name}}</template>
                            <el-menu-item v-for="child in item.children" :index="child.path" :key="child.key" v-if="hasRole(child)">{{child.name}}
                            </el-menu-item>
                        </el-submenu>
                        <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path" :key="item.key"><i
                                :class="item.iconCls"></i>{{item.children[0].name}}
                        </el-menu-item>
                    </template>
                </el-menu>
            </aside>
            <section class="content-container">
                <div class="grid-content bg-purple-light">
                    <el-col :span="24" class="breadcrumb-container">
                        <strong class="title">{{$route.name}}</strong>
                        <el-breadcrumb separator="/" class="breadcrumb-inner">
                            <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
                                {{ item.name }}
                            </el-breadcrumb-item>
                        </el-breadcrumb>
                    </el-col>
                    <el-col :span="24" class="content-wrapper">
                        <transition name="fade" mode="out-in">
                            <router-view></router-view>
                        </transition>
                    </el-col>
                </div>
            </section>
        </el-col>
    </el-row>
</template>

<script>
  import { logout } from '../api/home';

export default {
  data() {
    return {
      sysName: "二维码缴费后台",
      role: "", // 登陆的用户角色
      sysUserName: '', // 登录的用户名
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    };
  },
  methods: {
    handleLogout() {
      logout().then(data => {
        localStorage.removeItem('user');
        this.$router.push({ path: '/login' });
      })
    },
    hasRole(child) {
      if(!child.permission){
        return true;
      }
      return child.permission.includes(this.role)
    },
    handleclose() {
      //console.log('handleclose');
    },
    handleselect: function(a, b) {}
  },
  mounted() {
    let user = localStorage.getItem("user");
    if (!user) {
      this.$router.push({ path: "/login" });
    }
    user = JSON.parse(user);
    if(user){
      this.role = user.adminType;
      this.sysUserName = user.uname;
    }
  }
};
</script>

<style scoped lang="scss">
$color-primary: #20a0ff;

.container {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;

  .header {
    height: 60px;
    line-height: 60px;
    background: $color-primary;
    color: #fff;

    .userinfo {
      text-align: right;
      padding-right: 35px;
      float: right;

      .userinfo-inner {
        cursor: pointer;
        color: #fff;

        img {
          width: 40px;
          height: 40px;
          border-radius: 20px;
          margin: 10px 0px 10px 10px;
          float: right;
        }
      }
    }

    .logo {
      //width:230px;
      height: 60px;
      font-size: 22px;
      padding-left: 20px;
      padding-right: 20px;
      border-color: rgba(238, 241, 146, 0.3);
      border-right-width: 1px;
      border-right-style: solid;

      img {
        width: 40px;
        float: left;
        margin: 10px 10px 10px 18px;
      }

      .txt {
        color: #fff;
      }
    }

    .logo-width {
      width: 230px;
    }

    .tools {
      padding: 0px 23px;
      width: 14px;
      height: 60px;
      line-height: 60px;
      cursor: pointer;
    }
  }

  .main {
    display: flex;
    // background: #324057;
    position: absolute;
    top: 60px;
    bottom: 0px;
    overflow: hidden;

    aside {
      flex: 0 0 230px;
      width: 230px;

      // position: absolute;
      // top: 0px;
      // bottom: 0px;
      .el-menu {
        height: 100%;
      }
    }

    .menu-expanded {
      flex: 0 0 230px;
      width: 230px;
    }

    .content-container {
      // background: #f1f2f7;
      flex: 1;
      // position: absolute;
      // right: 0px;
      // top: 0px;
      // bottom: 0px;
      // left: 230px;
      overflow-y: scroll;
      padding: 20px;

      .breadcrumb-container {
        //margin-bottom: 15px;
        .title {
          width: 200px;
          float: left;
          color: #475669;
        }

        .breadcrumb-inner {
          float: right;
        }
      }

      .content-wrapper {
        background-color: #fff;
        box-sizing: border-box;
      }
    }
  }
}
</style>