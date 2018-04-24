import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Main from '@/components/Main'
import Login from '@/views/Login'
import Conversations from '@/views/Conversations'
import Rooms from '@/views/Rooms'
import People from '@/views/People'
import Chat from '@/views/Chat'
import Search from '@/views/Search'
Vue.use(Router)

//这是路由
// login  注册+登录
// main/conversation 当前用户有的房间
// main/c/homeid 表示 homeid社区 所有的房间列表  
// main/people 表示 好友列表
// r/roomid 表示房间号roomid的房间 
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
      path: '/main',
      name: 'Main',
      component: Main,
      children: [
        {
          path: '/main/conversations',
          component: Conversations
        },
        {
          path: '/main/c/:homeid',
          name:'Rooms',
          component: Rooms
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
      path:'/search',
      name:'Search',
      component: Search
    }
  ]
})
