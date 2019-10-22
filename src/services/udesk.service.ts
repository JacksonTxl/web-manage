import { anyAll, then } from '@/operators'
import { State } from 'rx-state'
import { Injectable, ServiceRoute, Inject, RouteGuard } from 'vue-service-app'
import { HttpService } from './http.service'
import { tap } from 'rxjs/operators'

/**
 * udesk 接入信息
 */
@Injectable()
export class UdeskService implements RouteGuard {
  info$ = new State({})
  constructor(private http: HttpService) {}

  getUdeskCustomerInfo() {
    return this.http.get('/udesk').pipe(
      tap((res: any) => {
        this.info$.commit(() => res)
        this.creatUdesk(res)
      })
    )
  }
  creatUdesk(customer: any) {
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
    })(
      window,
      document,
      'script',
      'https://assets-cli.udesk.cn/im_client/js/udeskApi.js',
      'ud'
    )
    // @ts-ignore
    ud({
      code: '2h23f6f4',
      link: 'https://styd.udesk.cn/im_client/?web_plugin_id=66175',
      customer
    })
  }
  hiddenUdesk() {
    let udesk: any = document.getElementById('udesk_container')
    if (udesk) {
      udesk.style = 'display: none'
    }
  }
  showUdesk(openDialog = false) {
    let udesk: any = document.getElementById('udesk_container')
    if (udesk) {
      udesk.style = 'display: block'
      if (openDialog) {
        let udesk_btn: any = document.getElementById('udesk_btn')
        let ev = document.createEvent('MouseEvent')
        ev.initEvent('click', false, false)
        udesk_btn.children[0].dispatchEvent(ev)
      }
    }
  }
  init() {
    return anyAll(this.getUdeskCustomerInfo())
  }

  beforeEach(to: ServiceRoute, from: ServiceRoute, next: any) {
    if (
      to.name === 'brand-dashboard-studio' ||
      to.name === 'shop-dashboard-studio'
    ) {
      this.showUdesk()
    } else {
      this.hiddenUdesk()
    }
    next()
  }
}
