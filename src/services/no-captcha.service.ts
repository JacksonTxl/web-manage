import { Injectable } from 'vue-service-app'
import { NotificationService } from './notification.service'
@Injectable()
export class NoCaptchaService {
  constructor(private notification: NotificationService) {}
  isCreated = false
  init(opts: any = {}) {
    if (!this.isCreated) {
      this.create().then(() => {
        this.initNvcOpt(opts)
      })
    } else {
      this.initNvcOpt(opts)
    }
  }
  create() {
    return new Promise(resolve => {
      const script = document.createElement('script')
      script.src = '//g.alicdn.com/sd/nvc/1.1.112/guide.js'
      script.onload = () => {
        this.isCreated = true
        resolve()
      }
      document.body.appendChild(script)
    })
  }
  initNvcOpt(opts: any = {}) {
    //无痕配置 && 滑动验证、刮刮卡、问答验证码通用配置
    // @ts-ignore
    window.NVC_Opt = {
      // @ts-ignore
      ...window.NVC_Opt,
      ...opts,
      isH5: false,
      popUp: false,
      // trans: { nvcCode: 200 },
      language: 'cn',
      //滑动验证长度配置
      // customWidth: 300,
      //刮刮卡配置项
      width: 336,
      height: 100,
      elements: [
        '//img.alicdn.com/tfs/TB17cwllsLJ8KJjy0FnXXcFDpXa-50-74.png',
        '//img.alicdn.com/tfs/TB17cwllsLJ8KJjy0FnXXcFDpXa-50-74.png'
      ],
      bg_back_prepared:
        '//img.alicdn.com/tps/TB1skE5SFXXXXb3XXXXXXXXXXXX-100-80.png',
      bg_front:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABQCAMAAADY1yDdAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAADUExURefk5w+ruswAAAAfSURBVFjD7cExAQAAAMKg9U9tCU+gAAAAAAAAAIC3AR+QAAFPlUGoAAAAAElFTkSuQmCC',
      obj_ok: '//img.alicdn.com/tfs/TB1rmyTltfJ8KJjy0FeXXXKEXXa-50-74.png',
      bg_back_pass:
        '//img.alicdn.com/tfs/TB1KDxCSVXXXXasXFXXXXXXXXXX-100-80.png',
      obj_error: '//img.alicdn.com/tfs/TB1q9yTltfJ8KJjy0FeXXXKEXXa-50-74.png',
      bg_back_fail:
        '//img.alicdn.com/tfs/TB1w2oOSFXXXXb4XpXXXXXXXXXX-100-80.png',
      upLang: {
        cn: {
          _ggk_guide: '请摁住鼠标左键，刮出两面盾牌',
          _ggk_success: '恭喜您成功刮出盾牌<br/>继续下一步操作吧',
          _ggk_loading: '加载中',
          _ggk_fail: [
            '呀，盾牌不见了<br/>请',
            'javascript:noCaptcha.reset()',
            '再来一次',
            '或',
            'http://survey.taobao.com/survey/QgzQDdDd?token=%TOKEN',
            '反馈问题'
          ],
          _ggk_action_timeout: [
            '我等得太久啦<br/>请',
            'javascript:noCaptcha.reset()',
            '再来一次',
            '或',
            'http://survey.taobao.com/survey/QgzQDdDd?token=%TOKEN',
            '反馈问题'
          ],
          _ggk_net_err: [
            '网络实在不给力<br/>请',
            'javascript:noCaptcha.reset()',
            '再来一次',
            '或',
            'http://survey.taobao.com/survey/QgzQDdDd?token=%TOKEN',
            '反馈问题'
          ],
          _ggk_too_fast: [
            '您刮得太快啦<br/>请',
            'javascript:noCaptcha.reset()',
            '再来一次',
            '或',
            'http://survey.taobao.com/survey/QgzQDdDd?token=%TOKEN',
            '反馈问题'
          ]
        }
      },
      nvcCallback: (data: any) => {
        // data为getNVCVal()的值，此函数为二次验证滑动或者刮刮卡通过后的回调函数
        // data跟业务请求一起上传，由后端请求AnalyzeNvc接口，接口会返回100或者900
        const el: any = document.getElementsByClassName('nc_bg')[0]
        el.style.width = '100%'
      }
    }
  }
  /**
   * 判断是否需要唤起验证码
   * 60154 对应 400
   * 60155 对应 600
   * @param code 400 滑动验证 600 刮刮卡验证
   */
  testIsNeedCallCaptcha(code: number) {
    return [60154, 60155].includes(code)
  }
  callCaptcha(code: number) {
    switch (code) {
      case 60154:
      case 60155:
        //唤醒滑动验证
        // @ts-ignore
        getNC().then(function(data: any) {
          // @ts-ignore
          _nvc_nc.upLang('cn', {
            _startTEXT: '请按住滑块，拖动到最右边',
            _yesTEXT: '验证通过',
            _error300:
              '哎呀，出错了，点击<a href="javascript:__nc.reset()">刷新</a>再来一次',
            _errorNetwork:
              '网络不给力，请<a href="javascript:__nc.reset()">点击刷新</a>'
          })
          // @ts-ignore
          _nvc_nc.reset()
        })
        break
      // case 60155:
      //   //唤醒刮刮卡
      //   // @ts-ignore
      //   getSC()
      //   break
      default:
        // @ts-ignore
        nvcReset()
        break
    }
  }
  resetNVC() {
    // @ts-ignore
    nvcReset()
  }
  generateNVCVal() {
    // @ts-ignore
    const nvcVal = window.getNVCVal()
    if (!nvcVal) {
      return
    }
    const nvcValDecode = JSON.parse(decodeURIComponent(nvcVal))
    const flag = this.validateVal(nvcValDecode)
    if (!flag) {
      this.notification.warn({
        title: '提示',
        key: 'ajaxError',
        content: '登录异常，请刷新页面重试'
      })
      return false
    }
    return nvcVal
  }
  validateVal(val: object) {
    const arr = Object.values(val)
    const filterArr = arr.filter(item => !item)
    return !filterArr.length
  }
}
