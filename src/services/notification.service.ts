import { notification } from 'ant-design-vue'
/**
 * title: 通知提醒标题，必选
 * description: 通知提醒内容，必选
 */
interface NotificationOptions {
  title: string | number
  content: any
  duration?: number
  icon?: any
  onClose?: any
  key?: string
}
/**
 *
 */
export class NotificationService {
  warning(config: NotificationOptions) {
    notification.warning({
      message: config.title + '',
      description: config.content,
      duration: config.duration,
      key: config.key
    })
  }
  success(config: NotificationOptions) {
    notification.success({
      message: config.title + '',
      description: config.content,
      duration: config.duration,
      key: config.key
    })
  }
  info(config: NotificationOptions) {
    notification.info({
      message: config.title + '',
      description: config.content,
      duration: config.duration,
      key: config.key
    })
  }
  error(config: NotificationOptions) {
    notification.error({
      message: config.title + '',
      description: config.content,
      duration: config.duration,
      key: config.key
    })
  }
  warn(config: NotificationOptions) {
    notification.warn({
      message: config.title + '',
      description: config.content,
      duration: config.duration,
      key: config.key
    })
  }
  open(config: NotificationOptions) {
    notification.open({
      class: 'st-notify-open',
      message: config.title + '',
      description: config.content,
      duration: config.duration,
      onClose: config.onClose,
      icon: config.icon,
      key: config.key
    })
  }
  openNormal(config: NotificationOptions) {
    notification.open({
      class: 'st-notify-normal-open',
      message: config.title + '',
      description: config.content,
      duration: config.duration,
      onClose: config.onClose,
      icon: config.icon,
      key: config.key
    })
  }
  close(key: string) {
    notification.close(key)
  }
  destroy() {
    notification.destroy()
  }
}
