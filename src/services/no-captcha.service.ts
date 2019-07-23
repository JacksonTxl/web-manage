import { Injectable } from 'vue-service-app'
import { State } from 'rx-state'
@Injectable()
export class NoCaptchaService {
  data$ = new State({})
  constructor() {}
  private DEFAULT_OPTS = {
    renderTo: 'no-captcha'
  }
  init(opts: any = {}) {
    opts = {
      ...this.DEFAULT_OPTS,
      ...opts
    }
    const nc_token = [
      'FFFF0N0N00000000807F',
      +new Date(),
      Math.random()
    ].join(':')
    const NC_Opt = {
      renderTo: opts.renderTo,
      appkey: 'FFFF0N0N00000000807F',
      scene: 'nc_login',
      token: nc_token,
      // customWidth: 300,
      trans: {
        'key1': 'code0'
      },
      elementID: ['usernameID'],
      is_Opt: 0,
      language: 'cn',
      isEnabled: true,
      timeout: 3000,
      times: 5,
      apimap: {
        // 'analyze': '//a.com/nocaptcha/analyze.jsonp',
        // 'get_captcha': '//b.com/get_captcha/ver3',
        // 'get_captcha': '//pin3.aliyun.com/get_captcha/ver3'
        // 'get_img': '//c.com/get_img',
        // 'checkcode': '//d.com/captcha/checkcode.jsonp',
        // 'umid_Url': '//e.com/security/umscript/3.2.1/um.js',
        // 'uab_Url': '//aeu.alicdn.com/js/uac/909.js',
        // 'umid_serUrl': 'https://g.com/service/um.json'
      },
      callback: (data: any) => {
        window.console && console.log(nc_token)
        window.console && console.log(data.csessionid)
        window.console && console.log(data.sig)
        this.data$.commit(() => ({
          token: nc_token,
          sessionid: data.csessionid,
          sig: data.sig
        }))
      }
    }
   // @ts-ignore
    var nc = new noCaptcha(NC_Opt)
    nc.upLang('cn', {
      _startTEXT: '请按住滑块，拖动到最右边',
      _yesTEXT: '验证通过',
      _error300: '哎呀，出错了，点击<a href="javascript:__nc.reset()">刷新</a>再来一次',
      _errorNetwork: '网络不给力，请<a href="javascript:__nc.reset()">点击刷新</a>'
    })
  }
}
