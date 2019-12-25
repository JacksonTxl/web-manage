import { AppConfig } from '@/constants/config'
import { webSocket, WebSocketSubject } from 'rxjs/webSocket'
let appConfig = new AppConfig()
import Cookie from 'js-cookie'
import { State } from 'rx-state/src'
import { NotificationService } from './notification.service'
import { Injectable } from 'vue-service-app'
import { tap } from 'rxjs/operators'
const uuidV1 = require('uuid/v1')
@Injectable()
export class WsService {
  private ws: any
  private token = Cookie.get('saas-token')
  private count = 0
  private heartBeat = {
    msg_id: uuidV1(),
    msg_type: 2,
    payload: {}
  }
  // 设置心跳时间
  private pingTimeout = 15000
  open$ = new State({})
  count$ = new State(0)
  constructor(private notificationService: NotificationService) {
    //
  }
  private getWebsocketInstance(query: any) {
    return (this.ws = webSocket({
      url: `${appConfig.WEB_SOCKET_DOMAIN}?app-id=${query.appId}&token=${
        query.token
      }`,
      // url: `wss://echo.websocket.org/`,
      openObserver: this.open$
    }))
  }
  setHeartBeat() {
    this.send(this.heartBeat)
    setInterval(() => {
      this.send(this.heartBeat)
    }, this.pingTimeout)
  }
  public init(query: any) {
    this.getWebsocketInstance({ token: this.token, appId: 10000 })
    this.message()
    this.setHeartBeat()
  }
  message() {
    this.ws.subscribe(
      (msg: any) => {
        if (msg.msg_type === 2) return
        this.count++
        this.count$.commit(() => this.count)
        const config = {
          title: msg.payload.title,
          content: msg.payload.content
        }
        new Notification(msg.payload.title, { body: msg.payload.content })
        // this.notificationService.info(config)
      },
      (err: any) => console.warn('webSocket err', err),
      () => console.log('complete')
    )
  }
  send(content?: any) {
    this.ws.next(content || this.count)
  }
  complete() {
    this.ws.complete((res: any) => {
      console.log('complete', res)
    })
  }
  error() {
    this.ws.error({ code: 4000, reason: 'I think our app just broke!' })
  }
}
