import Vue from 'vue'
import Router from 'vue-router'
//主页面
import Menu from '@/views/Menu.vue'
import SignUp from '@/views/SignUp.vue'

//聊天部分
import Main from '@/views/Main'
import Login from '@/views/Login'
import Conversations from '@/views/Conversations'
import Community from '@/views/Community'
import People from '@/views/People'
import Chat from '@/views/Chat'
import Search from '@/views/Search'
import CreateCommunity from '@/views/CreateCommunity'
import RoomSetting from '@/views/RoomSetting'
import ComSetting from '@/views/ComSetting'
import CreateRoom from '@/views/CreateRoom'

//文章部分
import ArticleMain from '@/views/ArticleMain'
import ArticleCreate from '@/views/ArticleCreate'
import Article from '@/views/Article'
import ArticleComment from '@/views/ArticleComment'
import ArticleSearch from '@/views/ArticleSearch'
import ArticleCollect from '@/views/ArticleCollect'//资源部分
import FileMain from '@/views/FileMain'
import FileSearch from '@/views/FileSearch'
import FileUp from '@/views/FileUp'
import ArticleSetting from '@/views/ArticleSetting' 
Vue.use(Router)

//这是路由
// login  注册+登录
// main/conversation 当前用户有的房间
// main/people 表示 好友列表
// r/roomid 表示房间号roomid的房间 
// c/homeid 表示 homeid社区 所有的房间列表  
//create-community 表示 创建社区 
export default new Router({
  routes: [
    // {
    //   path: '/',
    //   redirect: '/main/conversations'
    // },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/main',
      name: 'Main',
      component: Main,
      children: [
        {
          path: '/main/conversations',
          component: Conversations
        },
        {
          path: '/main/people',
          name:'people',
          component: People
        }
      ]
    },
    {
      path:'/r/:roomid',
      name:'Chat',
      component: Chat
    },
    {
      path: '/c/:homeid',
      name:'Community',
      component: Community
    },
    {
      path:'/search',
      name:'Search',
      component: Search
    },
    {
      path:'/create-community',
      name:'create-community',
      component: CreateCommunity
    },
    {
      path:'/create-room',
      name:'create-room',
      component: CreateRoom
    },
    {
      path:'/room-setting/:roomid',
      name:'room-setting',
      component:RoomSetting
    },
    {
      path:'/com-setting',
      component:ComSetting
    },
    {
      path:'/menu',
      component:Menu
    },
    {
      path:'/file',
      component:FileMain
    },
    {
      path:'/file-search',
      component:FileSearch
    },
    {
      path:'/file-up',
      component:FileUp
    },
    {
      path:'/article',
      component:ArticleMain
    },
    {
      path:'/article-create',
      component:ArticleCreate
    },
    {
      path:'/a/:articleid',
      component:Article
    },
    {
      path:'/article-comment/:articleid',
      component:ArticleComment
    },
    {
      path:'/article-search',
      component:ArticleSearch
    },
    {
      path:'/article-collect',
      component:ArticleCollect
    },
    {
      path:'/article-setting/:articleid',
      component:ArticleSetting
    }

  ]
})
