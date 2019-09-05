import { OssService } from './../../../../services/oss.service'
import { Injectable } from 'vue-service-app'
import { RedirectService } from '@/services/redirect.service'
import { ImportApi } from '@/api/v1/setting/import/import'
@Injectable()
export class ImportService {
  authTabs$ = this.redirectService.getAuthTabs$('brand-setting-import')
  constructor(
    private redirectService: RedirectService,
    private ossService: OssService,
    private importApi: ImportApi
  ) {}
  fetchDownloadFileInfo(file_type: number) {
    return this.importApi.fetchDownloadFileInfo(file_type)
  }
  downloadFile(url: string, filename: string = 'download.xlsx') {
    return this.ossService.downloadFile(url, filename)
  }
}
