import appPrefetchData from './app-prefetch-data'

/**
 * 将数据获取 和 异步启动应用包的时序并行
 */
Promise.all([
  appPrefetchData.init(),
  import(/* webpackChunkName: "app-run" */ './app-bootstrap').then(
    m => m.appBootstrap
  )
]).then(([prefetchData, appBootstrap]) => {
  appBootstrap(prefetchData)
})
