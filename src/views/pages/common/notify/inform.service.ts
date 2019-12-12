import { Injectable } from 'vue-service-app'

@Injectable()
export class InformService {
  constructor() {}
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
}
