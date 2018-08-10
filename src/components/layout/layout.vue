<style scoped>
.layout-con {
  height: 100%;
  width: 100%;
}

.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}

.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}

.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}

.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}
</style>
<template>
<div class="layout">
  <Layout :style="{minHeight: '100vh',minWidth:'1400px'}">
    <Sider :collapsed-width="78">
      <Menu :active-name="activeMenu" v-if='menuList.length!==0' theme="dark" width="auto" @on-select='selectMenu'>
        <MenuGroup title="项目管理系统">
          <MenuItem v-for='(item,index) in menuList' :key='index' :name="item.Url" >
          <span>{{item.Name}}</span>
          </MenuItem>
        </MenuGroup>
      </Menu>
    </Sider>
    <Layout :style="{minWidth:'1200px'}">
      <Content :style="{padding: '0 16px 16px'}" class="my-content">
        <div>
          <Breadcrumb :style="{margin: '16px'}">
            <BreadcrumbItem :to='activeMenu' class="primary">{{pageTitle}}</BreadcrumbItem>
            <BreadcrumbItem v-if='$route.meta.child' :to="'/proDetails/'+$route.params.id">{{this.$route.meta.child}}</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <Card>
          <router-view></router-view>
        </Card>
      </Content>
    </Layout>
  </Layout>
</div>
</template>
<script>
import {
newFindRoleMenuApi
} from "api/home.js";
import {
  Layout,
  Content,
  Card,
  Breadcrumb,
  Header,
  MenuItem,
  Menu,
  Sider,
  BreadcrumbItem,
  MenuGroup
} from 'iview';
export default {
  components: {
    Layout,
    Content,
    Card,
    Breadcrumb,
    Header,
    MenuItem,
    BreadcrumbItem,
    Menu,
    Sider,
    MenuGroup
  },
  data() {
    return {
      
      menuList: [
      ],
      pageTitle: "",
      activeMenu: ''
    };
  },
  watch: {
    $route() {
      this.initData();
    }
  },
  created() {
    if (this.$route.name === 'ProDetails') {
      this.pageTitle = sessionStorage.getItem('title')
      this.activeMenu = sessionStorage.getItem('url')
    }
  },
  mounted() {
    this.newFindRoleMenuList();
  },
  methods: {
    newFindRoleMenuList(){
      newFindRoleMenuApi().then(res=>{
        if(res.data.code===200){
          this.menuList=res.data.data;
          this.initData();
        }
      }).catch()
    },
    selectMenu(menu) {
      this.$router.push(menu);
    },
    initData() {
      this.menuList.forEach(val => {
        console.log(val.Url == this.$route.path)
        if (val.Url == this.$route.path) {
          this.pageTitle = val.Name;
          sessionStorage.setItem('url', val.Url)
          sessionStorage.setItem('title', val.Name)
          this.activeMenu = this.$route.path;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.my-content {
  top: 0;
  bottom: 0;
  right: 0;
  left: 200px;
  overflow: auto;
  background: #fff;
  box-sizing: border-box;
}
</style>

