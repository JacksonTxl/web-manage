import { Injectable } from 'vue-service-app'
import { Subject } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { mergeMap, map } from 'rxjs/operators'
import { Api } from '@/api/api'

interface PutOptions {
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
export class OssService extends Api {
  put({ file, uploadProgress = () => {} }: PutOptions) {
    return this.getOssPolicy().pipe(
      mergeMap(({ policy_info: res }:any) => {
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
        return put$.pipe(
          map(val => resData)
        )
      })
    )
  }
  private getOssPolicy() {
    return this.http.get('/upload/aliyun/policy')
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
