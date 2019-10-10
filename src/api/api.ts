import { Injectable } from 'vue-service-app'
import { HttpService } from '@/services/http.service'
import { AppConfig } from '@/constants/config'

/**
 * Api 基类 默认注入了HttpService AppConfig
 */
@Injectable()
export class Api {
  constructor(protected http: HttpService, protected appConfig: AppConfig) {}
}
