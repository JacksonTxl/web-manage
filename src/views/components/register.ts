import Vue from 'vue'
import { parse } from '@/utils/webpack-key-path'

const ComponentsContext = require.context('@/views/components', true, /\.vue$/)
const ComponentsKeys = ComponentsContext.keys()

const registerComponents: { name: string; component: any }[] = []

ComponentsKeys.forEach(keyPath => {
  const file = ComponentsContext(keyPath)
  const component = file.default || file
  const parsed = parse(keyPath)
  if (/(#)/.test(parsed.name)) {
    return
  }
  if (!component.name) {
    console && console.warn(`component [${parsed.name}] should give a name`)
    return
  }
  registerComponents.push({
    name: component.name,
    component: component
  })
})

registerComponents.forEach(C => {
  Vue.component(C.name, C.component)
})
