import { Injectable } from 'vue-service-app'
import { Subject } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { mergeMap, map } from 'rxjs/operators'
import { Api } from '@/api/api'
import { findLast } from 'lodash-es'

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
  BUSINESS_TYPES = ['image', 'face', 'file', 'excel']
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
        const fileKey = `${res.dir}${key}`
        formData.append('key', fileKey)
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
        let resData = {
          fileName: file.name,
          fileKey,
          host: res.host,
          url: isPrivate ? URL.createObjectURL(file) : res.host + '/' + fileKey
        }
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

  private getFileSuffix(file: File): string {
    if (file.name) {
      const lastDotIndex = file.name.lastIndexOf('.')
      return file.name.slice(lastDotIndex)
    } else {
      return '.' + file.type.split('/')[1]
    }
  }
  private getKey(file: File): string {
    const suffix = this.getFileSuffix(file)
    let fileName = ''
    if (file.name) {
      fileName = file.name.replace(/[?\s%<>&#\\:]/g, '').replace(suffix, '')
    }
    if (suffix === '.xlsx' || suffix === '.xls' || suffix === '.csv') {
      return `import__${fileName}___${Math.random()
        .toString(16)
        .slice(3)}___${suffix}`
    }
    return `${fileName}___${Math.random()
      .toString(16)
      .slice(3)}___${suffix}`
  }
  /**
   * 下载文件方法
   * @param url 下载的url
   */
  downloadFile(url: string, filename: string = 'download.xlsx') {
    const a = document.createElement('a')
    a.href = url
    a.target = '_blank'
    a.download = filename
    a.click()
  }
}
