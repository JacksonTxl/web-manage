import Vue from 'vue'
import { parse } from '@/utils/webpack-key-path'

const layoutsContext = require.context('./', false, /\.vue$/)

const layoutsKeys = layoutsContext.keys()

layoutsKeys.forEach(keyPath => {
  const file = layoutsContext(keyPath)
  const component = file.default || file
  const parsed = parse(keyPath)
  Vue.component(`layout-${parsed.name}`, component)
})
