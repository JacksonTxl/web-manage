import { ExcelApi } from '@/api/v1/excel'
import { State, Effect } from 'rx-state'
import { Injectable } from 'vue-service-app'
import { then } from '@/operators'
import { MessageService } from '@/services/message.service'

@Injectable()
export class ExportButtonService {
  loading$ = new State({})
  constructor(
    private excelApi: ExcelApi,
    private messageService: MessageService
  ) {}
  @Effect()
  export(path: string, query: any) {
    return this.excelApi.export(path, query).pipe(
      then(() => {
        this.messageService.success('提交导出任务成功')
      })
    )
  }
}
