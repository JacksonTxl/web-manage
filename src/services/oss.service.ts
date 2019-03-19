import { Injectable } from 'vue-service-app'
import { ajax } from 'rxjs/ajax'
import { Subject } from 'rxjs'

interface RequestOptions {
    url: string;
    policy: string;
    OSSAccessKeyId: string;
    signature: string;
    file: any;
    uploadProgress?: any;
}
@Injectable()
export class OssService {
  put(options: RequestOptions) {
    let url = options.url
    let policy = options.policy
    let OSSAccessKeyId = options.OSSAccessKeyId
    let signature = options.signature
    let file = options.file
    let uploadProgress = options.uploadProgress || (() => { })
    let formData = new FormData()
    formData.append('name', file.name)
    formData.append('key', `${file.name}`)
    formData.append('policy', policy)
    formData.append('OSSAccessKeyId', OSSAccessKeyId)
    formData.append('success_action_status', '200')
    formData.append('signature', signature)
    formData.append('file', file)

    const sub:any = new Subject()
    const put$ = ajax({
      url,
      body: formData,
      method: 'post',
      crossDomain: true,
      progressSubscriber: sub
    })
    sub.subscribe((val:any) => {
      uploadProgress(val)
    })

    return put$
  }
}
