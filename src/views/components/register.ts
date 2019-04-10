import Vue from 'vue'
import { parse } from '@/utils/webpack-key-path'

const ComponentsContext = require.context('@/views/components', true, /\.vue$/)
const ComponentsKeys = ComponentsContext.keys()

const routes: any = []
ComponentsKeys.forEach(keyPath => {
  const file = ComponentsContext(keyPath)
  const component = file.default || file
  const parsed = parse(keyPath)
  if (/(#)/.test(parsed.name)) {
    return
  }
  Vue.component(component.name, component)
})
