import { notification } from 'ant-design-vue'
/**
 * title: 通知提醒标题，必选
 * description: 通知提醒内容，必选
 */
interface NotificationOptions {
  title: string
  content: string
  duration?: number
}
/**
 *
 */
export class NotificationService {
  warning(config: NotificationOptions) {
    notification.warning({
      message: config.title,
      description: config.content,
      duration: config.duration
    })
  }
  success(config: NotificationOptions) {
    notification.success({
      message: config.title,
      description: config.content,
      duration: config.duration
    })
  }
  info(config: NotificationOptions) {
    notification.info({
      message: config.title,
      description: config.content,
      duration: config.duration
    })
  }
  error(config: NotificationOptions) {
    notification.error({
      message: config.title,
      description: config.content,
      duration: config.duration
    })
  }
  warn(config: NotificationOptions) {
    notification.warn({
      message: config.title,
      description: config.content,
      duration: config.duration
    })
  }
  destroy() {
    notification.destroy()
  }
}
