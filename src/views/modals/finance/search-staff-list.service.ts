import { Injectable } from 'vue-service-app'
import { FinanceAPi, SalaryBasicQuery } from '@/api/v1/finance'

@Injectable()
export class SearchStaffListService {
  constructor(private MemberAPi: FinanceAPi) {
  }
  getSalaryUsedList(id: any, query: SalaryBasicQuery) {
    return this.MemberAPi.getSearchStaffListSalary(id, query)
  }

  getPerformanceUsedList(id: any, query: SalaryBasicQuery) {
    return this.MemberAPi.getSearchStaffListPerformance(id, query)
  }
}
