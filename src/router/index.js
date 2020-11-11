import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
// import demo from "../views/demo.vue" 
const routes = [
 
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/demo',
    name: 'demo',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/demo.vue')
  },
  {
    path: '/addBoke',
    name: 'addBoke',
    component: () => import(/* webpackChunkName: "about" */ '../views/addBoke.vue')
  },
  {
    path: '/message',
    name: 'message',
    component: () => import(/* webpackChunkName: "about" */ '../views/message.vue')
  },
  {
    path: '/bokeDetail',
    name: 'bokeDetail',
    component: () => import(/* webpackChunkName: "about" */ '../views/bokeDetail.vue')
  },
  
]

const router = createRouter({
  // hash路由
  // history: createWebHashHistory(),
  // history路由
  history:createWebHistory(),
  routes,

})

export default router
