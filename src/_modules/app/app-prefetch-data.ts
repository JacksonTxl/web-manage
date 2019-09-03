/**
 * 使用es5语法 尽量减少polyfill加快请求发出
 */
var preloadData = {
  token: '',
  data: {
    // 员工信息
    staff: {},
    // 枚举信息
    enum: {},
    // 权限表
    auth: {},
    // 菜单数据
    menu: {},
    // 门店数据
    shop: {},
    // tooltip 数据
    tooltip: {}
  },
  ajaxGet(url: string) {
    var _this = this
    return new Promise<any>(function(resolve, reject) {
      var xhr = new XMLHttpRequest()
      xhr.open('GET', url)
      xhr.setRequestHeader('app-id', '11111')
      xhr.setRequestHeader('app-version', '11111')
      xhr.setRequestHeader('token', _this.token)
      xhr.onload = function() {
        var json = {
          data: {}
        }
        try {
          json = JSON.parse(xhr.response)
          if (xhr.status === 200) {
            resolve(json.data)
          } else {
            reject(xhr)
          }
        } catch (e) {
          reject(e)
        }
      }
      xhr.send(null)
    })
  },
  init: function() {
    this.initToken()

    if (!this.token) {
      location.href = '/account/login'
    }
    return this.initData().then(() => this.data)
  },
  initToken: function() {
    var cookie = document.cookie
    var tokenMatch = cookie.match(/saas-token=([\w\.-]+)/)
    if (!tokenMatch) {
      return false
    }
    this.token = tokenMatch[1]
  },
  initData: function() {
    var _this = this
    return Promise.all([
      this.getStaffInfo(),
      this.getMenu(),
      this.getEnum(),
      this.getAuth(),
      this.getTooltip(),
      this.getShopList()
    ])
      .then(function(res) {
        _this.data.staff = res[0]
        _this.data.menu = res[1]
        _this.data.enum = res[2]
        _this.data.auth = res[3]
        _this.data.tooltip = res[4]
        _this.data.shop = res[5]
      })
      .catch(e => {
        if (e && e.status) {
          if (e.status === 401) {
            location.href = '/account/login'
          }
        }
      })
  },
  getStaffInfo: function() {
    return this.ajaxGet('/_api/v1/staff/info')
  },
  getMenu: function() {
    return this.ajaxGet('/_api/v1/common/menu')
  },
  getEnum: function() {
    return this.ajaxGet('/_api/const/enum')
  },
  getAuth: function() {
    return this.ajaxGet('/_api/v1/common/auth')
  },
  getTooltip: function() {
    return this.ajaxGet('/_api/v1/admin/invalid/tooltip')
  },
  getShopList: function() {
    return this.ajaxGet('/_api/v1/shop?size=999')
  }
}

export default preloadData
