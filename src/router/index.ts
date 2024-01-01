import { createRouter, createWebHistory } from 'vue-router'
import StatisticsView from '../views/StatisticsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'statistics',
      component: StatisticsView
    },
    {
      path: '/visitors',
      name: 'visitors',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/VisitorsView.vue')
    }
  ]
})

export default router
