import { Injectable } from 'vue-service-app'
import { AuthService } from '@/services/auth.service'
@Injectable()
export class TemplateService {
  authTabs$ = this.authService.getAuthTabs$('brand-finance-salary-template')
  constructor(private authService: AuthService) {}
}
