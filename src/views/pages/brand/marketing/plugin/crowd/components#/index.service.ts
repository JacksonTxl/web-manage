import { Injectable, ServiceRoute } from 'vue-service-app'
import { State } from 'rx-state'
import { CrowdAPI } from '@/api/v1/crowd'
import { AuthService } from '@/services/auth.service'

@Injectable()
export class IndexService {
  crowdIndexInfo$ = new State({})
  auth$ = this.authService.authMap$({
    // analyst: 'shop:member:crowd|analyst',  //NOTE: 权限点人群分析去掉
    export: 'brand:member:crowd|export'
  })
  constructor(private crowdAPI: CrowdAPI, private authService: AuthService) {}
  SET_CARDS_LIST_INFO(crowdIndexInfo: any) {
    this.crowdIndexInfo$.commit(() => crowdIndexInfo)
  }
  // 获取列表

  getListInfo(id: string) {
    return this.crowdAPI.crowdShopExport(id)
  }
}
