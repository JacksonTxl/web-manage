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
  private errCount = 0
  private realMessageCount = 0
  private timer = 0
  private timerSetTimeout = 0
  private heartBeat = {
    msg_id: uuidV1(),
    msg_type: 2,
    payload: { count: this.count }
  }
  // 设置心跳时间
  private pingTimeout = 15000
  open$ = new State({})
  count$ = new State(0)
  systemList$ = new State({})
  activityList$ = new State({})
  notReadNum$ = new State(0)
  loading$ = new State({})
  messageArr: any[] = []
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
      this.heartBeat.payload.count = this.count
      this.send(this.heartBeat)
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
  setRead() {
    this.api.setRead()
  }
  init() {
    return anyAll(this.getActivityList(), this.getSystemList())
  }
  public initWs() {
    this.getWebsocketInstance({ token: this.token, appId: 10000 })
    this.message()
    this.setHeartBeat()
  }
  message() {
    this.ws.subscribe(
      (msg: any) => {
        this.count++
        this.count$.commit(() => this.count)
        if (msg.msg_type === 2) {
          this.errCount = 0
          return
        }
        // if (msg.msg_type === 1) {
        //   this.realMessageCount++
        //   if(this.realMessageCount < 3) {

        //   }
        // }
        const maxLength = 3
        // for(let )
        this.notReadNum$.commit(() => msg.not_read_num)
        const config = {
          title: msg.payload.title,
          content: msg.payload.content,
          icon: this.user$.value.avatar,
          duration: 1000,
          onClose: () => {
            this.notificationService.open(config)
          }
        }
        this.notificationService.open(config)
        this.messageArr.push(config)
      },
      (err: any) => {
        this.reconnection(err)
      },
      () => {
        console.log('comdsadasdsa')
        clearInterval(this.timer)
      }
    )
  }
  reconnection(err: any) {
    console.log('ERR', err)
    clearTimeout(this.timerSetTimeout)
    this.errCount++
    let rangeTime = 5000
    this.timerSetTimeout = setTimeout(() => {
      console.log(
        `重连第${this.errCount}次, 重连时间${rangeTime / 1000}s, 正在重连...`,
        '只重连三次'
      )
      this.errCount === 3 ? clearTimeout(this.timerSetTimeout) : this.initWs()
    }, rangeTime)
    this.errCount === 3 && console.log('websocket关闭连接')
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
