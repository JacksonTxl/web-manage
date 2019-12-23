import { State } from 'rx-state'
import { Injectable } from 'vue-service-app'
import { HttpService } from './http.service'
import { tap } from 'rxjs/operators'
import { AppConfig } from '@/constants/config'

/**
 * udesk 接入信息
 */
@Injectable()
export class UdeskService {
  customer$ = new State<any>({})
  isShowUdeskBtn$ = new State(true)
  loading$ = new State(false)
  isCreated = false
  constructor(private http: HttpService, private appConfig: AppConfig) {}
  fetchUdeskCustomerInfo() {
    return this.http.get('/udesk').pipe(
      tap((res: any) => {
        this.customer$.commit(() => res)
      })
    )
  }
  create() {
    const config: any = this.appConfig.UDESK_CONFIG
    const customer = this.customer$.snapshot()
    customer.c_name = customer.user_name + '_' + customer.brand_name
    customer.c_cf_品牌名称 = customer.brand_name
    // @ts-ignore
    ;(function(a: any, h, c: any, b, f, g: any) {
      a['UdeskApiObject'] = f
      a[f] =
        a[f] ||
        function() {
          ;(a[f].d = a[f].d || []).push(arguments)
        }
      g = h.createElement(c)
      g.async = 1
      g.charset = 'utf-8'
      g.src = b
      c = h.getElementsByTagName(c)[0]
      c.parentNode.insertBefore(g, c)
    })(window, document, 'script', `${config.config_link}`, 'ud')
    return new Promise((resolve, reject) => {
      // @ts-ignore
      ud({
        code: `${config.code}`,
        link: `${config.link}`,
        customer,
        onReady: () => {
          setTimeout(() => {
            resolve()
          }, 300)
        }
      })
    })
  }
  setIsShowUdeskBtn(val: boolean) {
    this.isShowUdeskBtn$.commit(() => val)
  }
  setLoading(val: boolean) {
    this.loading$.commit(() => val)
  }
  /**
   * 打开 udesk 对话面板
   * 如果 udesk 实例尚未创建，先创建再打开
   * @return {promise}
   */
  show() {
    if (this.loading$.snapshot()) {
      return
    }
    return new Promise(resolve => {
      if (!this.isCreated) {
        this.setLoading(true)
        /**
         * 获取udesk 校验参数
         */
        this.fetchUdeskCustomerInfo().subscribe(() => {
          /**
           * 实例化 udesk
           */
          this.create().then(() => {
            this.isCreated = true
            this.setLoading(false)
            // @ts-ignore
            ud('showPanel')
            resolve()
          })
        })
      } else {
        // @ts-ignore
        ud('showPanel')
        resolve()
      }
    })
  }
  /**
   * 隐藏 udesk 面板
   */
  hide() {
    // @ts-ignore
    ud('hidePanel')
  }
}
