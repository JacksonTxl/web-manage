import { parse } from '@/utils/webpack-key-path'

const modalContext = require.context('@/views/modals', false, /\.vue$/)
const modalKeys = modalContext.keys()

const routes: any = []
modalKeys.forEach(keyPath => {
  const file = modalContext(keyPath)
  const component = file.default || file
  const parsed = parse(keyPath)
  if (/(@|#)/.test(parsed.name)) {
    return
  }
  routes.push({
    name: parsed.name,
    component
  })
})

export default routes
