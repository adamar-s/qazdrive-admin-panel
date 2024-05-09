import { createRouter, createWebHistory } from "vue-router"
import LoginPage from "@/pages/LoginPage.vue";
import OrdersPage from "@/pages/OrdersPage.vue";

const routes = [
    {
        path: "/login",
        component: LoginPage,
        name: "Логин",
        meta: {
            requiresAuth: false
        }
    },
    {
        path: "/",
        component: OrdersPage,
        name: "Order",
        meta: {
            requiresAuth: true
        }
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})
router.beforeEach((to, from, next) => {
    console.log("beforeEach start")

    if (to.meta.requiresAuth) {
        const token = localStorage.getItem("token")
        if (token) {
            next()

        } else {
            next("/login")
        }
    } else {
        next()
    }
})

export default router
