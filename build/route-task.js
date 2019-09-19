const globby = require('globby')
const fse = require('fs-extra')
const _ = require('lodash')
const chalk = require('chalk')
const log = console.log

const PAGES_PATH = ['./src/views/pages/**/*.vue']
const SERVICES_PATH = ['./src/views/pages/**/*.service.ts']
const MODEL_PATH = './build/tpl.ejs'
const ROUTES_PATH = './src/router/auto-generated-routes.ts'

if (process.env.PAGE_ENV === 'brand') {
  PAGES_PATH.push('!./src/views/pages/shop/**/*.vue')
  SERVICES_PATH.push('!./src/views/pages/shop/**/*.service.ts')
}
if (process.env.PAGE_ENV === 'shop') {
  PAGES_PATH.push('!./src/views/pages/brand/**/*.vue')
  SERVICES_PATH.push('!./src/views/pages/brand/**/*.service.ts')
}

if (process.env.NODE_ENV === 'production') {
  PAGES_PATH.push('!./src/views/pages/test/**/*.vue')
  SERVICES_PATH.push('!./src/views/pages/test/**/*.service.ts')
}

const tplInit = ({ importServiceArray, importArr, pageRoutes }) => {
  const tpl = fse.readFileSync(MODEL_PATH).toString()
  const compiled = _.template(tpl)

  return compiled({ importServiceArray, importArr, pageRoutes })
}
// 获取文件
const parse = keyPath => {
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

// 插入路由服务
const getPageService = services => {
  const serviceMap = {}
  const importServiceArray = []
  services.forEach(keyPath => {
    const parsed = parse(keyPath)
    let exportedService = _.camelCase(`--${parsed.name.replace('.', '-')}--`)
    let asExportedService = _.camelCase(
      `--${parsed.entry_dash.replace('.', '-')}--`
    )
    const chunkName = parsed.dir_dash
      ? parsed.dir_dash
      : parsed.entry.replace('.service', '')

    exportedService =
      exportedService[0].toUpperCase() + exportedService.slice(1)
    asExportedService =
      asExportedService[0].toUpperCase() + asExportedService.slice(1)
    serviceMap[parsed.entry_dash.replace('.service', '')] = asExportedService
    importServiceArray.push({
      chunkName,
      service: exportedService,
      asService: asExportedService,
      servicePath: keyPath.replace('./src', '@')
    })
  })
  return { importServiceArray, serviceMap }
}
const createRoute = () => {
  const pages = globby
    .sync(PAGES_PATH)
    .filter(item => !item.includes('#') && !item.includes('/components'))
  const services = globby
    .sync(SERVICES_PATH)
    .filter(item => !item.includes('#'))
  const importArr = []
  const pageMap = {}
  const pageRoutes = []
  const { importServiceArray, serviceMap } = getPageService(services)

  pages.forEach(page => {
    const parsed = parse(page)
    const hasParent = !!pageMap[parsed.dir_dash]
    const component = _.camelCase(`--Page${`-${parsed.component}--`}`)
    const chunkName = parsed.dir_dash
      ? parsed.dir_dash
      : parsed.entry.replace('.service', '')

    importArr.push({
      component,
      pagePath: page.replace('./src', '@'),
      chunkName
    })

    const routeService = serviceMap[parsed.entry_dash]

    const route = {
      name: parsed.entry_dash,
      parent: hasParent ? parsed.dir_dash : '',
      path: hasParent ? parsed.name : '/' + parsed.entry,
      controller: routeService ? routeService : false,
      component,
      chunkName
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
// 初始化
const init = (path, op) => {
  if (path.includes('#')) return
  const tpl = tplInit(createRoute())
  fse.outputFileSync(ROUTES_PATH, tpl, 'utf8')
  if (path.includes('ts')) {
    log(
      chalk.bgYellow(chalk.keyword('black')(op)),
      chalk.blue.underline.bold(path),
      'update service'
    )
  } else if (path === 'init') {
    log(chalk.green('create routes success') + chalk.red('!!!'))
  } else {
    log(chalk.yellow(op), chalk.blue.underline.bold(path), 'update routes')
  }
}
const RouteTask = {
  run(path, op) {
    if (path === 'init') {
      log(chalk.yellow('init...'))
      fse.outputFileSync(ROUTES_PATH, tplInit(createRoute()), 'utf8')
    }
    return init(path, op)
  }
}

module.exports = RouteTask
