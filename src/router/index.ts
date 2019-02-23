import Vue from 'vue'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
import VueRouter, { Route } from 'vue-router'
import multiguard from 'vue-router-multiguard'
import { routes } from './routes'
import { queryService } from '@/services/query.service'

Vue.use(VueRouter)

export const router = new VueRouter({
  mode: 'history',
  routes
})

const nProgressStart = (to: Route, from: Route, next: any) => {
  nProgress.start()
  return next()
}

router.beforeEach(
  multiguard([nProgressStart, queryService.beforeEach.bind(queryService)])
)

router.afterEach(() => {
  nProgress.done()
})
