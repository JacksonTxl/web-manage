import { Injectable } from 'vue-service-app'
import { Subject } from 'rxjs'
import { ajax } from 'rxjs/ajax'

interface RequestOptions {
  /**
   * oss直传地址
   */
  url: string
  /**
   * oss直传的key
   * @description 默认值为一个16位的随机数;oss直传时是一个必传字段,同一个key&&同一hash，会覆盖，否则push
   */
  key?: string
  /**
   * 策略，后台取值
   */
  policy: string
  /**
   * 密钥中的AccessKeyId，后台取值
   */
  OSSAccessKeyId: string
  /**
   * 签名，后台取值
   */
  signature: string
  /**
   * 上传的文件
   */
  file: any
  /**
   * 上传进度cb
   */
  uploadProgress?: (val: any) => any
}
@Injectable()
export class OssService {
  put({ url, policy, OSSAccessKeyId, signature, file, uploadProgress = () => { }, key = this.getKey(file) }: RequestOptions) {
    let formData = new FormData()
    formData.append('key', key)
    formData.append('policy', policy)
    formData.append('OSSAccessKeyId', OSSAccessKeyId)
    formData.append('success_action_status', '200')
    formData.append('signature', signature)
    formData.append('file', file)
    const sub: any = new Subject()
    const put$ = ajax({
      url,
      body: formData,
      method: 'post',
      crossDomain: true,
      progressSubscriber: sub
    })
    sub.subscribe((val: any) => {
      uploadProgress(val)
    })

    return put$
  }
  private getKey(file: any): string {
    // 获取文件后缀
    function getSuffix(filename: string) {
      let pos: number = filename.lastIndexOf('.')
      let suffix: string = ''
      if (pos !== -1) {
        suffix = filename.substring(pos)
      }
      return suffix
    }
    // 生成随机字符串
    function randomString(len: number = 32) {
      var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890_-'
      var maxPos = chars.length
      var pwd = ''
      for (let i = 0; i < len; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * maxPos))
      }
      return pwd
    }

    return `${randomString(16)}${getSuffix(file.name)}`
  }
}
