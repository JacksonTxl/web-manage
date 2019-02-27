
const globby = require('globby')
const fse = require('fs-extra')
const _ = require('lodash')

const PAGES_PATH = './src/views/pages/**/*.vue'
const SERVICES_PATH = './src/views/pages/**/*.service.ts'
const MODEL_PATH = './model.ejs'
const ROUTES_PATH = './src/router/routes.js'

const pages = globby.sync(PAGES_PATH).filter(item => !item.includes('#'))
const services = globby.sync(SERVICES_PATH)

const tplInit = ({ importServiceArray, importArr, pageRoutes }) => {
  const tpl = fse.readFileSync(MODEL_PATH).toString()
  const compiled = _.template(tpl)

  return compiled({ importServiceArray, importArr, pageRoutes })
}

const parse = (keyPath) => {
  keyPath = keyPath.replace('/src/views/pages', '').slice(2)
  const lastDotIndex = keyPath.lastIndexOf('.')
  const lastSlashIndex = keyPath.lastIndexOf('/')
  let ext = ''
  let dir = ''
  let name = ''
  let base = ''
  let entry = ''
  ext = keyPath.slice(lastDotIndex)
  if (lastSlashIndex > -1) {
    dir = keyPath.slice(0, lastSlashIndex)
  }
  name = keyPath.slice(lastSlashIndex + 1, lastDotIndex)
  base = name + ext
  entry = dir ? dir + '/' + name : name
  return {
    name,
    ext,
    base,
    dir,
    entry,
    dir_dash: dir.replace(/\//g, '-'),
    entry_dash: entry.replace(/\//g, '-'),
    component: entry.replace(/\//g, '-')
  }
}
const getPageService = (services) => {
  const serviceMap = {}
  const importServiceArray = []
  services.forEach(keyPath => {
    const parsed = parse(keyPath)
    let exportedService = _.camelCase(`--${parsed.name.replace('.', '-')}--`)

    serviceMap[parsed.entry_dash.replace('.service', '')] = exportedService
    importServiceArray.push({ service: exportedService, servicePath: keyPath.replace('./src', '@') })
  })
  return { importServiceArray, serviceMap }
}
// const serviceMap = {}
const createRoute = (pages) => {
  const importArr = []
  const pageMap = {}
  const pageRoutes = []
  const { importServiceArray, serviceMap } = getPageService(services)

  pages.forEach(page => {
    const parsed = parse(page)
    const hasParent = !!pageMap[parsed.dir_dash]
    const component = _.camelCase(`--Page${`-${parsed.component}--`}`)
    importArr.push({ component, pagePath: page.replace('./src', '@') })

    const routeService = serviceMap[parsed.entry_dash]
    const route = {
      name: parsed.name,
      parent: hasParent ? parsed.dir_dash : '',
      path: hasParent ? parsed.name : '/' + parsed.entry,
      guards: routeService ? [routeService] : [],
      component
    }

    pageMap[parsed.entry_dash] = route

    if (hasParent) {
      const routeParent = pageMap[route.parent]
      routeParent.children = routeParent.children || []
      routeParent.children.push(route)
    }
    // 顶层路由节点
    if (!hasParent) {
      pageRoutes.push(route)
    }
  })
  return { importServiceArray, importArr, pageRoutes }
}
try {
  fse.outputFileSync(ROUTES_PATH, tplInit(createRoute(pages)), 'utf8')
  console.log('create routes success!!!')
} catch (error) {
  console.log(error)
}
