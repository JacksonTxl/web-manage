import { Injectable } from 'vue-service-app'
import { Subject } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { mergeMap, map } from 'rxjs/operators'
import { Api } from '@/api/api'

const typeSuffix = {
  'image/png': '.png'
}

interface PutOptions {
  /**
   * 上传的文件
   */
  file: any
  /**
   * 上传的文件类型，可用类型为 image
   */
  type: string
  /**
   * 上传进度cb
   */
  uploadProgress?: (val: any) => any
  /**
   * 是否使用私有oss空间
   */
  isPrivate?: boolean
}
@Injectable()
export class OssService extends Api {
  TYPES = ['image', 'face']
  typeSuffix = [
    {
      type: 'image/png',
      suffix: '.png'
    }
  ]
  put({
    file,
    type = '',
    uploadProgress = () => {},
    isPrivate = false
  }: PutOptions) {
    if (!this.TYPES.includes(type)) {
      throw new Error(
        `[oss.service] 上传文件必须使用业务类型 ${this.TYPES} 之一`
      )
    }
    return this.getOssPolicy(type, isPrivate).pipe(
      mergeMap(({ policy_info: res }: any) => {
        let key = this.getKey(file)
        let formData = new FormData()
        formData.append('key', `${res.dir}${key}`)
        formData.append('policy', res.policy)
        formData.append('OSSAccessKeyId', res.accessid)
        formData.append('success_action_status', '200')
        formData.append('signature', res.signature)
        formData.append('file', file)
        let i = formData.entries()
        const sub: any = new Subject()
        console.log(formData)
        const put$ = ajax({
          url: res.host,
          body: formData,
          method: 'post',
          crossDomain: true,
          progressSubscriber: sub
        })
        sub.subscribe((val: any) => {
          uploadProgress(val)
        })
        let resData = { fileKey: `${res.dir}${key}` }
        return put$.pipe(map(val => resData))
      })
    )
  }
  private getOssPolicy(type: string, isPrivate: boolean) {
    return this.http.get(`/upload/policy`, {
      query: {
        business: type,
        acl: isPrivate ? 'private' : 'public-read-write'
      }
    })
  }
  private getKey(file: any): string {
    // 生成随机字符串
    function randomString(len: number = 32) {
      var chars =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890_-'
      var maxPos = chars.length
      var pwd = ''
      for (let i = 0; i < len; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * maxPos))
      }
      return pwd
    }
    let s = ''
    this.typeSuffix.forEach(i => {
      if (i.type === file.type) {
        s = i.suffix
      }
    })
    return `${randomString(16)}${s}`
  }
}
