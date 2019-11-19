import { parse } from '@/utils/webpack-key-path'

const ComponentsDemoContext = require.context('./', true, /\.vue$/)
const ComponentsDemoKeys = ComponentsDemoContext.keys()

const demoComponents = {} as any
ComponentsDemoKeys.forEach(keyPath => {
  const file = ComponentsDemoContext(keyPath)
  const component = file.default || file
  const parsed = parse(keyPath)
  demoComponents['demo-st-' + parsed.name] = component
})
console.log('demoComponents', demoComponents)
export default demoComponents
