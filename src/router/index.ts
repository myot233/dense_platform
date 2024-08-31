import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/components/pages/Home/index.vue'
import Personal from '@/components/pages/Profile/index.vue'
import Check from '@/components/pages/CariesCheck/index.vue'
import History from '@/components/pages/CariesHistory/index.vue'
import HistoryList from '@/components/pages/CariesHistory/parts/HistoryList.vue'
import HistoryDetail from '@/components/pages/CariesHistory/parts/HistoryDetail.vue'
import AccountAccess from '@/components/pages/AccountAccess/index.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:"/login",
      component:AccountAccess
    }
      ,{
      
      path: "/home",
      component: Home,

    },
    {
      path: "/personal",
      component: Personal
    },
    {
      path: "/check",
      component: Check,

    },
    {
      path: "/history",
      component: History,
      children: [
        {
          path: "",
          component: HistoryList
        }, {
          path: ":id",
          component: HistoryDetail
        }
      ]
    }
  ]
})

export default router
