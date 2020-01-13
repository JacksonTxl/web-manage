import { message } from 'ant-design-vue'
message.config({
  duration: 2,
  maxCount: 3
})
interface MessageOptions {
  /**
   * 提示内容
   */
  content: string
  /**
   * 自动关闭的延时，单位秒。设为 0 时不自动关闭。
   */
  duration?: number
}

export class MessageService {
  success(config: MessageOptions) {
    message.success(config.content, config.duration)
  }
  info(config: MessageOptions) {
    message.info(config.content, config.duration)
  }
  error(config: MessageOptions) {
    message.error(config.content, config.duration)
  }
  warn(config: MessageOptions) {
    message.warn(config.content, config.duration)
  }
  loading(config: MessageOptions) {
    message.loading(config.content, config.duration)
  }
}
