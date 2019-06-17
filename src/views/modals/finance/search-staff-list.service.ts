import { Injectable } from 'vue-service-app'
import { FinanceApi, SalaryBasicQuery } from '@/api/v1/finance'

@Injectable()
export class SearchStaffListService {
  constructor(private MemberApi: FinanceApi) {
  }
  getSalaryUsedList(id: any, query: SalaryBasicQuery) {
    return this.MemberApi.getSearchStaffListSalary(id, query)
  }

  getPerformanceUsedList(id: any, query: SalaryBasicQuery) {
    return this.MemberApi.getSearchStaffListPerformance(id, query)
  }
}
