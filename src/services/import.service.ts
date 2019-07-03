import { AppConfig } from '@/constants/config'
import { Injectable } from 'vue-service-app'

/**
 * 资源按需加载服务
 * webpack 不支持加载 浏览器协议资源
 */
@Injectable()
export class ImportService {
  constructor(private appConfig: AppConfig) {}
  loadJs(src: string) {
    const s = document.createElement('script')
    const url = src.includes('http') ? src : this.appConfig.BASE_URL + src
    if (document.querySelector(`script[src='${url}']`)) {
      return Promise.resolve()
    }
    return new Promise((resolve, reject) => {
      s.src = url
      document.head.appendChild(s)
      s.onload = () => {
        resolve()
      }
      s.onerror = err => {
        reject(err)
      }
    })
  }
  loadCss(href: string) {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    const url = href.includes('http:') ? href : this.appConfig.BASE_URL + href
    if (document.querySelector(`link[href='${href}']`)) {
      return Promise.resolve()
    }
    return new Promise((resolve, reject) => {
      link.href = url
      document.head.appendChild(link)
      link.onload = () => {
        resolve()
      }
      link.onerror = err => {
        reject(err)
      }
    })
  }
  isJs(src: string) {
    return src.indexOf('.js') > -1
  }
  isCss(src: string) {
    return src.indexOf('.css') > -1
  }
  load(srcs = []) {
    const tasks: any[] = []
    srcs.forEach(src => {
      if (this.isJs(src)) {
        tasks.push(this.loadJs(src))
      }
      if (this.isCss(src)) {
        tasks.push(this.loadCss(src))
      }
    })
    return Promise.all(tasks)
  }
}
