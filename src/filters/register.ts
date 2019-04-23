import Vue from 'vue'
import { parse } from '@/utils/webpack-key-path'

const FilterContext = require.context('./', true, /\.filters\.ts$/)
const FilterKeys = FilterContext.keys()

FilterKeys.forEach(keyPath => {
  const file = FilterContext(keyPath)
  const filters = file.default || file
  const parsed = parse(keyPath)
  if (/(#)/.test(parsed.name)) {
    return
  }
  Object.keys(filters).forEach(name => {
    Vue.filter(name, filters[name])
  })
})
