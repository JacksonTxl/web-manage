import { notification } from 'ant-design-vue'
/**
 * title: 通知提醒标题，必选
 * description: 通知提醒内容，必选
 */
export class WsService {
  init() {
    const ws = new WebSocket('wss://api-saas-dev.styd.cn/ws', [
      'app-id',
      '83479823749832'
    ])
  }
}
