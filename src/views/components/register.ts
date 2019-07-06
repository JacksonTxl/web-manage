import Vue from 'vue'
import { parse } from '@/utils/webpack-key-path'

const ComponentsContext = require.context('@/views/components', true, /\.vue$/)
const ComponentsKeys = ComponentsContext.keys()

ComponentsKeys.forEach(keyPath => {
  const file = ComponentsContext(keyPath)
  const component = file.default || file
  const parsed = parse(keyPath)
  console.log(component)
  if (/(#)/.test(parsed.name)) {
    return
  }
  if (!component.name) {
    console && console.warn(`component [${parsed.name}] should give a name`)
    return
  }
  Vue.component(component.name, component)
})
