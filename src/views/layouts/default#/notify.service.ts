import { TokenService } from './../../../services/token.service'
import { UserService } from '@/services/user.service'
import { AppConfig } from '@/constants/config'
import { webSocket, WebSocketSubject } from 'rxjs/webSocket'
import { State } from 'rx-state/src'
import { NotificationService } from '@/services/notification.service'
import { Injectable } from 'vue-service-app'
import { NotifyApi } from '@/api/v1/notify'
import { MessageService } from '@/services/message.service'
import { tap } from 'rxjs/operators'
import { anyAll } from '@/operators'
const uuidV1 = require('uuid/v1')
@Injectable()
export class NotifyService {
  private ws: any
  private token = this.tokenService.token$.value
  private count = 0
  private reqCount = 0
  private timer = 0
  private heartBeat = {
    msg_id: uuidV1(),
    msg_type: 2,
    payload: {}
  }
  // 设置心跳时间
  private pingTimeout = 15000
  open$ = new State({})
  count$ = new State(0)
  systemList$ = new State({})
  activityList$ = new State({})
  notReadNum$ = new State(0)
  loading$ = new State({})
  constructor(
    private api: NotifyApi,
    private msg: MessageService,
    private notificationService: NotificationService,
    private userService: UserService,
    private tokenService: TokenService,
    private appConfig: AppConfig
  ) {
    //
  }
  user$ = this.userService.user$

  private getWebsocketInstance(query: any) {
    console.log('token$', this.token)
    return (this.ws = webSocket({
      url: `${this.appConfig.WEB_SOCKET_DOMAIN}?app-id=${query.appId}&token=${
        query.token
      }`,
      openObserver: this.open$
    }))
  }
  setHeartBeat() {
    this.send(this.heartBeat)
    this.timer = setInterval(() => {
      if (this.reqCount === 3) {
        clearInterval(this.timer)
      }
      this.send(this.heartBeat)
      this.reqCount++
    }, this.pingTimeout)
  }

  getSystemList() {
    return this.api.getNewAnnouncementSystem().pipe(
      tap((res: any) => {
        this.systemList$.commit(() => res.list)
      })
    )
  }
  getActivityList() {
    return this.api.getNewAnnouncementActivity().pipe(
      tap((res: any) => {
        this.activityList$.commit(() => res.list)
      })
    )
  }
  init() {
    return anyAll(this.getActivityList(), this.getSystemList())
  }
  public initWs(query: any) {
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
        this.notReadNum$.commit(() => msg.not_read_num)
        const config = {
          title: msg.payload.title,
          content: msg.payload.content,
          icon: this.user$.value.avatar,
          duration: 1000
        }
        this.notificationService.open(config)
      },
      (err: any) => {
        clearInterval(this.timer)
      },
      () => {
        clearInterval(this.timer)
      }
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
