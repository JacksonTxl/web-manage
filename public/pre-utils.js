window.preUtils = {
  config: {
    test: {
      map: {
        ali: ['https://ptest1.styd.cn/', 'https://ptest2.styd.cn/'],
        huawei: ['https://ptest-hw.styd.cn']
      }
    },
    pre: {
      map: {
        ali: [
          'https://ppre1.styd.cn/',
          'https://ppre2.styd.cn/',
          'https://ppre3.styd.cn/',
          'https://ppre4.styd.cn/'
        ],
        huawei: ['https://ppre-hw.styd.cn/']
      }
    },
    prod: {
      map: {
        ali: [
          'https://p1.styd.cn/',
          'https://p2.styd.cn/',
          'https://p3.styd.cn/',
          'https://p4.styd.cn/'
        ],
        huawei: ['https://p-hw.styd.cn/']
      }
    }
  },
  /**
   * 浏览器运行时环境下的 cdn map，包含源站
   * example
   */
  map: {},
  /**
   * 浏览器运行时环境下的 cdn 厂商，包含源站
   * example ['ali', 'huawei', 'souce']
   */
  vendors: [],
  /**
   * 设置 cdn 阈值
   */
  threshold: 1024,
  init: function() {
    this.browser.init()
    if (typeof Promise === 'undefined') {
      return
    }
    this.initMaps()
    this.initVendors()
    this.setCdn()
  },
  /**
   * 根据运行时环境，初始化 map
   */
  initMaps: function() {
    var map = {}
    if (this.isUseCdn()) {
      map = this.config[this.getEnv()].map || {}
    }
    map['source'] = [location.origin + '/']
    this.map = map
  },
  /**
   * 初始化 cdn vendors（包含源站）
   */
  initVendors: function() {
    var map = this.map
    var vendors = []
    for (var vendor in map) {
      vendors.push(vendor)
    }
    this.vendors = vendors
  },
  /**
   * 获取运行时环境
   * @return {string} dev/test/pre/prod
   */
  getEnv: function() {
    return (
      {
        'saas.dev.styd.cn': 'dev',
        'saas.test.styd.cn': 'test',
        'saas.pre.styd.cn': 'pre',
        'pro.styd.cn': 'prod'
      }[location.hostname] || 'dev'
    )
  },
  /**
   * 运行时环境下是否启用 cdn
   * 配置了就使用，没配置就不使用
   */
  isUseCdn: function() {
    return this.config[this.getEnv()]
  },
  /**
   * 读取 localStorage
   * @param {string} key
   * @return {object}
   */
  get: function(key) {
    var ret = localStorage.getItem(key)
    try {
      ret = JSON.parse(ret)
    } catch (e) {}
    return ret
  },
  /**
   * 存储到 localStorage
   * @param {string} key
   * @param {object} val
   */
  set: function(key, val) {
    try {
      val = JSON.stringify(val)
    } catch (e) {}
    localStorage.setItem(key, val)
  },
  /**
   * 引入 css 或 js 资源
   * @param {string} type css/js
   */
  includeStatic: function(type) {
    window.publicPaths = this.get('publicPaths') || this.map[this.vandors[0]]
    var files = htmlWebpackPlugin.files[type]
    var docFragment = document.createDocumentFragment()
    var injectPosition = 'body'
    for (var i in files) {
      var publicPath = publicPaths[i % publicPaths.length] || this.map.source[0]
      var filePath =
        publicPath + files[i].substr(htmlWebpackPlugin.files.publicPath.length)
      var tag
      switch (type) {
        case 'css':
          tag = document.createElement('link')
          tag.href = filePath
          tag.rel = 'stylesheet'
          injectPosition = 'head'
          break
        case 'js':
        default:
          tag = document.createElement('script')
          tag.src = filePath
          tag.async = false
          break
      }
      docFragment.appendChild(tag)
    }
    document[injectPosition].appendChild(docFragment)
  },
  /**
   * 获取可用的 publicPaths
   * @return {promise}
   */
  getPublicPaths: function() {
    var that = this
    var vendor = this.vendors.shift()
    return new Promise(function(resolve) {
      var domains = that.map[vendor]
      var tasks = []
      var successedDomains = []
      var failedDomains = []
      /**
       * 如果 vendor 为源站，即所有 cdn 都不可用的情况，直接返回源站
       */
      if (vendor === 'source') {
        return resolve(domains)
      }
      domains.forEach(function(domain) {
        var task = new Promise(function(taskResolve, taskReject) {
          var img = new Image()
          img.src = domain + 'img/cdn/sample.gif?t=' + +new Date()
          clearTimeout(this['timer_' + domain])
          this['timer_' + domain] = setTimeout(function() {
            return taskReject(new Error(domain + ' error: timeout(' + that.threshold + ')'))
          }, that.threshold)
          img.onload = function() {
            // console.log(domain + ' success')
            successedDomains.push(domain)
            taskResolve(domain)
          }
          img.onerror = function() {
            console.warn(domain, 'error')
            that.collectErrors(domain)
            failedDomains.push(domain)
            taskReject(new Error(domain + ' error'))
          }
        })['catch'](function(e) {})
        tasks.push(task)
      })
      Promise.all(tasks)
        ['catch'](function(e) {})
        ['finally'](function() {
          if (successedDomains.length) {
            resolve(successedDomains)
          } else {
            that.getPublicPaths().then(function(publicPaths) {
              resolve(publicPaths)
            })
          }
        })
    })
  },
  /**
   * 判断是否需要重置 publicPaths,只在确实需要切换 cdn 时充值 publicPaths
   * @param {object} publicPaths
   */
  isResetPublicPaths: function(publicPaths) {
    var _publicPaths = this.get('publicPaths') || []
    var ret = false
    publicPaths = publicPaths.sort()
    _publicPaths = _publicPaths.sort()
    publicPaths.forEach(function(publicPath, index) {
      if (publicPath !== _publicPaths[index]) {
        return (ret = true)
      }
    })
    return ret
  },
  /**
   * 存储 publicPaths 到 localStorage
   * @param {array} publicPaths
   */
  savePublicPaths: function(publicPaths) {
    this.set('publicPaths', publicPaths)
  },
  /**
   * 设置 __webpack_public_path__
   */
  setWebPackPublicPath: function(publicPaths) {
    window.__webpack_public_path__ = publicPaths[0]
  },
  /**
   * 向入口页面注入 css 和 js 文件
   */
  includeStatics: function() {
    this.includeStatic('css')
    this.includeStatic('js')
  },
  /**
   * 设置 publicPaths、__webpack_public_path__以及加载 css 和 js
   */
  setCdn: function() {
    var that = this
    this.getPublicPaths().then(function(publicPaths) {
      if (that.isResetPublicPaths(publicPaths)) {
        that.savePublicPaths(publicPaths)
      }
      that.setWebPackPublicPath(publicPaths)
      that.includeStatics()
    })
  },
  collectErrors: function(domain) {
    var cdnErrors = this.get('cdnErrors') || {}
    cdnErrors[domain] = Date()
    this.set('cdnErrors', cdnErrors)
  },
  /**
   * 浏览器版本测试，不兼容的版本给出提示
   */
  browser: {
    init: function() {
      if (this.isNeedUpdateBrowser()) {
        this.updateTipLayer.open()
        this.eventBind()
      }
    },
    /**
     * 判断是否支持当前浏览器
     * @return {boolean}
     */
    isNeedUpdateBrowser: function() {
      return (
        /(MSIE|Trident)/i.test(navigator.userAgent) ||
        typeof Promise === 'undefined'
      )
    },
    eventBind: function() {
      var that = this
      document.getElementById(
        'browser-update-tip-layer__close'
      ).onclick = function() {
        that.updateTipLayer.close()
      }
    },
    updateTipLayer: {
      open: function() {
        var layer = document.getElementById('browser-update-tip-layer')
        if (layer) {
          layer.style.visibility = 'visible'
          return
        }
        layer = document.createElement('div')
        layer.innerHTML =
          '<div id="browser-update-tip-layer" style="position: fixed; width: 100%; height: 100%; left: 0; top: 0; background: rgb(0, 0, 0); z-index: 999999">' +
          '<div style="width: 484px; height: 250px; position: absolute; left: 50%; top: 50%; margin-top: -125px ; margin-left: -242px; text-align: center; background: url(https://styd-frontend.oss-cn-shanghai.aliyuncs.com/images/browser-update-tip%402x.png); background-repeat: no-repeat; background-size: 100%; box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, .2);filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=https://styd-frontend.oss-cn-shanghai.aliyuncs.com/images/browser-update-tip%402x.png,sizingMethod=scale);">' +
          '<p style="font-size: 20px; font-weight: 500; color: #252A2E; margin: 120px 0 12px 0">检测到浏览器版本过低！</p>' +
          '<p style="font-size: 14px; color: #3E4D5C">您当前浏览器版本存在安全风险，建议使用浏览器：谷歌 Chrome</p>' +
          '<div id="browser-update-tip-layer__close" style="width: 40px; height: 40px; cursor: pointer; position: absolute; right: 0; top: 0;"></div>'
        '</div>' + '</div>'
        document.body.appendChild(layer)
      },
      close: function() {
        document.getElementById('browser-update-tip-layer').style.visibility =
          'hidden'
      }
    }
  }
}

try {
  preUtils.init()
} catch (e) {}
