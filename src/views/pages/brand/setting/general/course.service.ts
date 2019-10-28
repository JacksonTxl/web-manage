import { Injectable } from 'vue-service-app'
import { AuthService } from '@/services/auth.service'
@Injectable()
export class CourseService {
  authTabs$ = this.authService.getAuthTabs$('brand-setting-general-course')
  constructor(private authService: AuthService) {}
}
