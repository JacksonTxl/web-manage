import Vue from 'vue'
import { parse } from '@/utils/webpack-key-path'

const DirectiveContext = require.context('./', true, /\.directives\.ts$/)
const DirectiveKeys = DirectiveContext.keys()

DirectiveKeys.forEach(keyPath => {
  const file = DirectiveContext(keyPath)
  const directives = file.default || file
  const parsed = parse(keyPath)
  if (/(#)/.test(parsed.name)) {
    return
  }
  Object.keys(directives).forEach(name => {
    Vue.directive(name, directives[name])
  })
})
