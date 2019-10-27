import { Injectable } from 'vue-service-app'
import { OssService } from '@/services/oss.service'
import { AuthService } from '@/services/auth.service'
import { ImportApi } from '@/api/v1/setting/import/import'
@Injectable()
export class ImportService {
  authTabs$ = this.authService.getAuthTabs$('brand-setting-import')
  constructor(
    private authService: AuthService,
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
