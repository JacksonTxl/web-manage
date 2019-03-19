import { Injectable } from 'vue-service-app'
import { Subject } from 'rxjs'
import { ajax } from 'rxjs/ajax'

interface RequestOptions {
  /**
   * @url: oss直传地址
   * @key: 默认值为一个16位的随机数;oss直传时是一个必传字段,同一个key&&同一hash，会覆盖，否则push
   * @policy
   * @OSSAccessKeyId
   * @signature
   * @file
   * @uploadProgress: 上传进度cb
   */
  url: string
  key?: string
  policy: string
  OSSAccessKeyId: string
  signature: string
  file: any
  uploadProgress?: (val: any) => any
}
@Injectable()
export class OssService {
  put({ url, policy, OSSAccessKeyId, signature, file, uploadProgress = () => { }, key = this.get_key(file) }: RequestOptions) {
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
  private get_key(file: any): string {
    // 获取文件后缀
    function get_suffix(filename: string) {
      let pos: number = filename.lastIndexOf('.')
      let suffix: string = ''
      if (pos !== -1) {
        suffix = filename.substring(pos)
      }
      return suffix
    }
    // 生成随机字符串
    function random_string(len: number = 32) {
      var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890_-'
      var maxPos = chars.length
      var pwd = ''
      for (let i = 0; i < len; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * maxPos))
      }
      return pwd
    }

    return `${random_string(16)}${get_suffix(file.name)}`
  }
}
