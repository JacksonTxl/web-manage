import { Injectable } from 'vue-service-app'
import { Subject, Observable } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { map } from 'rxjs/operators'

interface RequestOptions {
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
  put({ file, uploadProgress = () => {} }: RequestOptions) {
    this.getOssPolicy().pipe(
      map((res:any) => {
        let key = this.getKey(file)
        let formData = new FormData()
        formData.append('key', `${res.dir}/${key}`)
        formData.append('policy', res.policy)
        formData.append('OSSAccessKeyId', res.OSSAccessKeyId)
        formData.append('success_action_status', '200')
        formData.append('signature', res.signature)
        formData.append('file', file)
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
        return put$
      })
    )
  }
  // put({ url, policy, OSSAccessKeyId, signature, file, uploadProgress = () => { }, key = this.getKey(file) }: RequestOptions) {
  //   let formData = new FormData()
  //   formData.append('key', key)
  //   formData.append('policy', policy)
  //   formData.append('OSSAccessKeyId', OSSAccessKeyId)
  //   formData.append('success_action_status', '200')
  //   formData.append('signature', signature)
  //   formData.append('file', file)
  //   const sub: any = new Subject()
  //   const put$ = ajax({
  //     url,
  //     body: formData,
  //     method: 'post',
  //     crossDomain: true,
  //     progressSubscriber: sub
  //   })
  //   sub.subscribe((val: any) => {
  //     uploadProgress(val)
  //   })

  //   return put$
  // }
  private getOssPolicy() {
    let options$ = Observable.create((observer:any) => {
      observer.next({
        OSSAccessKeyId: 'LTAINpOEzKqsvJov',
        dir: 'aaaaaa',
        policy: 'eyJleHBpcmF0aW9uIjoiMjAxOS0wNC0wMlQwNzowNzoyNloiLCJjb25kaXRpb25zIjpbWyJjb250ZW50LWxlbmd0aC1yYW5nZSIsMCwxMDQ4NTc2MDBdXX0=',
        signature: 'jIOhPN7S5HDCEq3nA9g9bFmziwA=',
        host: 'http://styd-saas-test.oss-cn-shanghai.aliyuncs.com'
      })
    })
    return options$
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
