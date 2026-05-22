import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages/Home.vue')
  },
  {
    path: '/quiz',
    name: 'Quiz',
    component: () => import('../pages/Quiz.vue')
  },
  {
    path: '/result',
    name: 'Result',
    component: () => import('../pages/Result.vue')
  },
  {
    path: '/shop',
    name: 'Shop',
    component: () => import('../pages/Shop.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../pages/Profile.vue')
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: () => import('../pages/SignIn.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
