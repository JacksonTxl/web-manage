import { State, Effect } from 'rx-state'
import { ExcelApi } from '@/api/v1/excel'
import { then } from '@/operators'
import { ServiceRoute, Injectable } from 'vue-service-app'

@Injectable()
export class ExportService {
  loading$ = new State({})
  list$ = new State([])
  page$ = new State({})
  constructor(private excelApi: ExcelApi) {}
  @Effect()
  getLogList(query: any) {
    return this.excelApi.getLogList(query).pipe(
      then((res: any) => {
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }
  @Effect()
  getDownloadUrl(id: number) {
    return this.excelApi.getDownloadUrl(id)
  }
  beforeEach(to: ServiceRoute) {
    return this.getLogList(to.meta.query)
  }
}
