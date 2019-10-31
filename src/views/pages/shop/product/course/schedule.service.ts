import { Injectable } from 'vue-service-app'
import { AuthService } from '@/services/auth.service'
@Injectable()
export class ScheduleService {
  authTabs$ = this.authService.getAuthTabs$('shop-product-course-schedule')
  constructor(private authService: AuthService) {}
}
