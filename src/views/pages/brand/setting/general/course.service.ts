import { Injectable } from 'vue-service-app'
import { RedirectService } from '@/services/redirect.service'
@Injectable()
export class CourseService {
  authTabs$ = this.redirectService.getAuthTabs$('brand-setting-general-course')
  constructor(private redirectService: RedirectService) {}
}
