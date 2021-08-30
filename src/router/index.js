import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/pushWork',
    name: 'PushWork',
    component: () => import('../views/PushWork.vue')
  },
  {
    path: '/sing',
    name: 'Sing',
    component: () => import('../views/Sing.vue')
  },
  {
    path: '/remove_sing',
    name: 'RemoveSing',
    component: () => import('../views/RemoveSing.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
