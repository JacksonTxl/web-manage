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
  beforeEach(to: ServiceRoute) {
    //return this.getLogList(to.meta.query)
  }
}
