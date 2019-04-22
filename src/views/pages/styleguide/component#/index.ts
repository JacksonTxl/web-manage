import { parse } from '@/utils/webpack-key-path'

const ComponentsDemoContext = require.context('./', true, /\.vue$/)
const ComponentsDemoKeys = ComponentsDemoContext.keys()

const demoComponents = {} as any
ComponentsDemoKeys.forEach(keyPath => {
  const file = ComponentsDemoContext(keyPath)
  const component = file.default || file
  const parsed = parse(keyPath)
  demoComponents[parsed.name + '-demo'] = component
})

export default demoComponents
