import { UserService } from '@/services/user.service'
import { Injectable } from 'vue-service-app'
import { Effect, State } from 'rx-state'
import { CoursePricingApi, UpdateInput } from '@/api/v1/setting/course/pricing'

@Injectable()
export class PriceModelService {
  loading$ = new State({})
  standardPrices$ = this.userService.getOptions$('setting.standard_price')
  saleModels$ = this.userService.getOptions$('personal_course.sale_model')
  constructor(
    private coursePricingApi: CoursePricingApi,
    private userService: UserService
  ) {}
  getInfo() {
    return this.coursePricingApi.getInfo()
  }
  del() {
    return this.coursePricingApi.del()
  }
  @Effect()
  update(params: UpdateInput) {
    return this.coursePricingApi.update(params)
  }
}
