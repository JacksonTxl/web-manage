import Vue from 'vue'
// @ts-ignore
import VueModalRouter from 'vue-modal-router'
import routes from './routes'

Vue.use(VueModalRouter, {
  model: 'show',
  delay: 300
})
console.log(routes)
export const modalRouter = new VueModalRouter(routes)
