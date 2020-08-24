import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '@/views/index.vue';
import Dashboard from '@/components/Sidebar.vue';
import Carpart from "@/components/Carpart";
import Carpart_manage from "@/components/Carpart_manage";
import mechanic_manage from "@/components/mechanic_manage";
import Register from "@/components/Register";
import Repair from "@/components/Repair";
import Usage from "@/components/Usage";
import Bill from "@/components/Bill"
import Mechanic from "@/components/Mechanic";
Vue.use(VueRouter)

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
        path: '/dashboard',
        component: Dashboard,
        children: [{
            path: "/carpart",
            component: Carpart
        }, {
            path: '/carpart_manage',
            component: Carpart_manage
        }, {
            path: '/mechanic_manage',
            component: mechanic_manage
        }, {
            path: '/mechanic',
            component: Mechanic
        }, {
            path: '/register',
            component: Register
        }, {
            path: '/repair',
            component: Repair
        }, {
            path: '/usage',
            component: Usage
        }, {
            path: '/bill',
            component: Bill
        }]
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

/* function checkAuth(to, token) {
  // 向后端请求验证身份
  return true
} */

// 路由导航
// router.beforeEach((to, from, next) => {
//   const tokenStr = window.sessionStorage.getItem('token')
//   if (!tokenStr && to.path !== '/login') return next('/login')
//   else if (tokenStr && to.path === '/login') return next('/dashboard')
//   /* console.log(tokenStr)
//   if (checkAuth(to, tokenStr)) {
//     if (to.path === '/login') return next('/dashboard')
//   } */
//   // 记录当前路径
//   // window.sessionStorage.setItem('activePath', to.path)
//   next()
// })

export default router
