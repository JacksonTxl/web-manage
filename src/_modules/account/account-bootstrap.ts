import bootstrap from '@/bootstrap'
import App from './views/App.vue'
import routes from './router/routes'
import './index.less'

bootstrap({
  AppComponent: App,
  routes
})
