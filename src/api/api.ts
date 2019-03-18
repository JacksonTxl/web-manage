import { Injectable } from 'vue-service-app'
import { HttpService } from '@/services/http.service'
import { appConfig } from '@/constants/config'

/**
 * Api 基类 默认注入了HttpService AppConfig
 */
@Injectable()
export class Api {
  protected appConfig = appConfig
  constructor(protected http: HttpService) {}
}
