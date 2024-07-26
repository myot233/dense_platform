import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/components/pages/Home.vue'
import Personal from '@/components/pages/Personal.vue'
import Check from '@/components/pages/Check.vue'
import History from '@/components/pages/History.vue'
import HistoryList from '@/components/parts/HistoryList.vue'
import HistoryDetail from '@/components/parts/HistoryDetail.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
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
