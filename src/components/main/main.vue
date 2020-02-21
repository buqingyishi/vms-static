<template>
  <Layout style="height: 100%" class="main carMian">
    
    <Sider hide-trigger collapsible :width="200" :collapsed-width="64" v-model="$store.state.F_cat.collapsed" class="left-sider" :style="{overflow: 'hidden'}">
      <side-menu 
        :accordion="false" 
        ref="sideMenu" 
        :active-name="$route.meta.navActive||$route.name" 
        @on-select="turnToPage" 
        :menu-list="menuList"
      >
        <!-- 需要放在菜单上面的内容，如Logo，写在side-menu标签内部，如下 -->
        <div class="logo-con pointer" style="color:#2c2c2c;font-size:26px;text-align:center;border-bottom: 0.5px solid rgba(66,68,70,1);;" v-show="!$store.state.F_cat.collapsed"  @click="$app.openWindow('https://www.baidu.com')">
          <!-- <img v-show="!$store.state.F_cat.collapsed" :src="maxLogo" key="max-logo"  /> -->
          <!-- <img v-show="$store.state.F_cat.collapsed" :src="minLogo" key="min-logo"  /> -->
          <img :src="maxLogo" key="max-logo" style="width:120px;height:32px"  />
        </div>
      </side-menu>
    </Sider>

    <Layout>
      <Header class="header-con" :style="`border-bottom:${!$app.mPageMode?'1px solid #eee':'none'};`">
        <header-bar>
          <User/>
          <error-store v-if="$config.plugin['error-store'] && $config.plugin['error-store'].showInHeader" :has-read="hasReadErrorPage" :count="errorCount"></error-store>
          <!-- <fullscreen v-model="isFullscreen" class="marginR10" style="margin-top:3px;"/> -->
          <i class="iconfont iconico relative cBlue marginR10 pointer" @click="$root.upData_wechatBox" style="font-size:22px; top:2px;"></i>
          <Modal
            v-model="$store.state.F_cat.wechatBox"
            :footer-hide="true"
            :mask-closable="false"
            width="250"
            class-name="vertical-center-modal"
            title="关注公众号"
          >
            <img :src="topCode" class="widht100 marginB10">
            <div class="textCenter f_12 cBlue">
              关注公众号，进入服务猫管理系统。
            </div>
          </Modal>
        </header-bar>
      </Header>
      <Content class="main-content-con">
        <Layout class="main-layout-con">
          <template v-if="$app.mPageMode">
            <!-- <div class="tag-nav-wrapper">
              <tags-nav :value="$route" @input="handleClick" :list="tagNavList" @on-close="handleCloseTag"/>
            </div> -->
          </template>
          
          <Content class="content-wrapper">
            <keep-alive :include="cacheList">
              <router-view/>
            </keep-alive>
            <ABackTop :height="100" :bottom="80" :right="50" container=".content-wrapper"></ABackTop>
          </Content>
        </Layout>
      </Content>
    </Layout>
  </Layout>
</template>
<script>
import SideMenu from './components/side-menu'
import HeaderBar from './components/header-bar'
import TagsNav from './components/tags-nav'
import User from './components/user'
import ABackTop from './components/a-back-top'
// import Fullscreen from './components/fullscreen'
import ErrorStore from './components/error-store'
import { mapMutations, mapActions, mapGetters } from 'vuex'
import { getNewTagList, routeEqual } from '@/libs/util'
import routers from '@/router/routes'
import minLogo from '@$@/img/_logo-min2.png'
import maxLogo from '@$@/img/_logo.png'
import './main.less';

// 顶部二维码弹框
import topCode from '@$@/img/topCode.jpg';
export default {
  name: 'Main',
  components: {
    SideMenu,
    HeaderBar,
    TagsNav,
    // Fullscreen,
    ErrorStore,
    User,
    ABackTop
  },
  data () {
    return {
      minLogo,
      maxLogo,
      topCode,
      isFullscreen: false
    }
  },
  computed: {
    ...mapGetters([
      'errorCount'
    ]),
    tagNavList () {
      return this.$store.state.app.tagNavList
    },
    tagRouter () {
      return this.$store.state.app.tagRouter
    },
    cacheList () {
      const list = ['ParentView', ...this.tagNavList.length ? this.tagNavList.filter(item => !(item.meta && item.meta.notCache)).map(item => item.name) : []]
      return list
    },
    menuList () {
      return this.$store.getters.menuList
    },
    local () {
      return this.$store.state.app.local
    },
    hasReadErrorPage () {
      return this.$store.state.app.hasReadErrorPage
    }
  },
  methods: {
    ...mapMutations([
      'setBreadCrumb',
      'setTagNavList',
      'addTag',
      'setLocal',
      'setHomeRoute'
    ]),
    ...mapActions([
      'handleLogin',
      'getUnreadMessageCount'
    ]),
    //notLeft 是否左侧栏的点击 false是点击左侧栏，true不是点击左侧栏
    turnToPage (route,notLeft) {

      let { name, params, query } = {};

      if (typeof route === 'string') {
        name = route;
      } else {
        name = route.name
        params = route.params
        query = route.query
      }
      
      //新建 浏览器页面
      if (name.indexOf('isTurnByHref_') > -1) {
        window.open(name.split('_')[1]);
      }else{//新增页签
        if(!$app.judgeData(notLeft) && name!='home'){//点击左侧栏

          //判断有没有相同的页面
          $app.HasAsPage(name,(buEr,objArr)=>{

            if (!!buEr) {
              objArr.forEach((val, i) => {
                if($app.judgeData(val.params) || $app.judgeData(val.query)){
                  $app.closeTag(val); // 关闭这个页面
                }else{
                  //毛都不做！
                }
              });
            }
            $app.clickNav(this,name,params,query);
          });

        }else{//点击 头部的页签
          this.$router.push({
            name,
            params,
            query
          });
        }
      }
    },

    handleCloseTag (res, type, route) {
      if (type !== 'others') {
        if (type === 'all') {
          this.turnToPage((this.$config.homeName),true)
        } else {
          if (routeEqual(this.$route, route)) {
            $app.closeTag(route)
          }
        }
      }
      this.setTagNavList(res)
    },
    handleClick (item) {
      this.turnToPage(item,true)
    }
  },
  watch: {
    '$route' (newRoute) {
      const { name, query, params, meta } = newRoute
      this.addTag({
        route: { name, query, params, meta },
        type: 'push'
      })
      this.setBreadCrumb(newRoute)
      this.setTagNavList(getNewTagList(this.tagNavList, newRoute))
      this.$refs.sideMenu.updateOpenName(newRoute.name)
    }
  },
  mounted () {
    /**
     * @description 初始化设置面包屑导航和标签导航
     */
    this.setTagNavList()
    this.setHomeRoute(routers)
    const { name, params, query, meta } = this.$route
    this.addTag({
      route: { name, params, query, meta }
    })
    this.setBreadCrumb(this.$route)
    // 如果当前打开页面不在标签栏中，跳到homeName页
    if (!this.tagNavList.find(item => item.name === this.$route.name)) {
      this.$router.push({
        name: this.$config.homeName
      })
    }
  }
}
</script>
