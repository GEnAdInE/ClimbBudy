import {createRouter, createWebHistory} from '@ionic/vue-router';
import {RouteRecordRaw} from 'vue-router';
import HomePage from '../views/HomePage.vue'
import CameraPage from '../views/CameraPage.vue'
import CenterPage from '../views/CenterPage.vue'
import RoutePage from '../views/RoutePage.vue'
import LoginForm from "@/views/LoginForm.vue";
import LogoutPage from "@/views/LogoutPage.vue";

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
        path: '/login',
        name: 'Login or Register',
        component: LoginForm
    },
    {
        path: '/logout',
        name: 'Logout',
        component: LogoutPage
    },
    {
        path: '/camera',
        name: 'Camera',
        component: CameraPage,
    },
    {
        path: '/centers/:centerId',
        component: CenterPage,
        props: true,
    },

    {
        path: '/centers/:centerId/routes/:routeId',
        component: RoutePage,
        props: true,
    },
    {
        path: '/centers/:centerId/routes/:routeId/comments/:id',
        component: () => import('../views/ViewMessagePage.vue'),
        props: true,
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
