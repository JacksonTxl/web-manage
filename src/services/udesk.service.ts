import { anyAll } from '@/operators'
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
  constructor(private http: HttpService, private appConfig: AppConfig) {}

  fetchUdeskCustomerInfo() {
    return this.http.get('/udesk').pipe(
      tap((res: any) => {
        this.customer$.commit(() => res)
        console.log(this.customer$)
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
    // @ts-ignore
    ud({
      code: `${config.code}`,
      link: `${config.link}`,
      customer
    })
  }
  hiddenUdesk() {
    let udesk: any = document.getElementById('udesk_container')
    if (udesk) {
      udesk.style = 'display: none'
    }
  }
  /**
   *
   * @param params openDialog 是否展示窗口
   */
  showUdesk(params = { openDialog: false }) {
    let udeskEl: any = document.getElementById('udesk_container')
    if (udeskEl) {
      udeskEl.style = 'display: block'
      if (params.openDialog) {
        let udesk_btn: any = document.getElementById('udesk_btn')
        let ev = document.createEvent('MouseEvent')
        ev.initEvent('click', false, false)
        udesk_btn.children[0].dispatchEvent(ev)
      }
    }
  }
}
