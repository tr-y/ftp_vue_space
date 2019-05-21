import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '@/components/Login'
import registered from '@/components/Registered'
import home from '@/components/Home'
import UploadFile from '@/components/UploadFile'
import DownloadFile from '@/components/DownloadFile'
import BindAccount from '@/components/BindAccount'
import Personal from '@/components/Personal'
import GroupSearch from '@/components/GroupSearch'
import GroupOwner from  '@/components/GroupOwner'
import GroupMessage from  '@/components/GroupMessage'
import GroupHome from  '@/components/GroupHome'
import GroupView from '@/components/GroupView'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      components:{
        right_space:HelloWorld,
      }
    },
    {
      path:'/login',
      name :'login',
      components:{
        right_space:login,
      }
    },
    {
      path:'/registered',
      name :'registered',
      components:{
        right_space:registered,
      }
    },
    {
      path:'/home',
      name :'home',
      components:{
        right_space:home,
      }
    },
    {
      path:'/uploadfile',
      name:'uploadFile',
      components:{
        right_space:UploadFile
      }
    },
    {
      path:'/downloadfile',
      name :'downloadfile',
      components:{
        right_space:DownloadFile,
      }
    },
    {
      path:'/bind',
      name :'bind',
      components:{
        right_space:BindAccount,
      }
    },
    {
      path:'/personal',
      name :'personal',
      components:{
        right_space:Personal,
      }
    },
    {
      path:'/groupsearch',
      name :'groupsearch',
      components:{
        right_space:GroupSearch,
      }
    },
    {
      path:'/groupOwner',
      name :'groupOwner',
      components:{
        right_space:GroupOwner,
      }
    },
    {
      path:'/groupMessage',
      name :'groupMessage',
      components:{
        right_space:GroupMessage,
      }
    },
    {
      path:'/groupHome',
      name :'groupHome',
      components:{
        right_space:GroupHome,
      }
    },
    {
      path:'/groupView',
      name :'groupView',
      components:{
        right_space:GroupView,
      }
    },


  ]
})
