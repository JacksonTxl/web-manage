import bootstrap from '@/bootstrap'
import App from '@/views/App.vue'
import routes from '@/router/routes'
import '@/style'

export const appBootstrap = (data: any) => {
  bootstrap({
    AppComponent: App,
    routes,
    data
  })
}
