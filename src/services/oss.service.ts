import { Injectable } from 'vue-service-app'
import { Subject } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { mergeMap, map } from 'rxjs/operators'
import { Api } from '@/api/api'

const typeSuffix = {
  'image/png': '.png'
}

/**
 * http://showdoc.corp.rrr.me/web/#/9?page_id=457
 */
interface PutOptions {
  /**
   * 上传的文件
   */
  file: any
  /**
   * 上传的文件业务类型，当前可用类型为 image | face | file
   */
  business: string
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
  BUSINESS_TYPES = ['image', 'face']
  typeSuffix = [
    {
      type: 'image/png',
      suffix: '.png'
    }
  ]
  put({
    file,
    business = '',
    uploadProgress = () => {},
    isPrivate = false
  }: PutOptions) {
    if (!this.BUSINESS_TYPES.includes(business)) {
      throw new Error(
        `[oss.service] 上传文件必须使用业务类型 ${this.BUSINESS_TYPES} 之一`
      )
    }
    return this.getOssPolicy(business, isPrivate).pipe(
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
  private getOssPolicy(business: string, isPrivate: boolean) {
    return this.http.get(`/upload/policy`, {
      query: {
        business,
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
