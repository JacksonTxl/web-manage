import Vue from 'vue'
// @ts-ignore
import VueModalRouter from 'vue-modal-router'
import routes from './routes'

Vue.use(VueModalRouter)

export const modalRouter = new VueModalRouter({
  model: 'show',
  delay: 300,
  routes
})
