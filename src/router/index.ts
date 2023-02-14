import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue'
import CameraPage from '../views/CameraPage.vue'
import CenterPage from '../views/CenterPage.vue'
import RoutePage from '../views/RoutePage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/camera',
    name: 'Camera',
    component: CameraPage,
  },
  {
    path: '/centers/:id',
    component: CenterPage,
  },

  {
    path: '/routes/:id',
    component: RoutePage,
  },

  {
    path: '/message/:id',
    component: () => import('../views/ViewMessagePage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
