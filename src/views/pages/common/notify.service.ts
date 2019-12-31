import { Injectable } from 'vue-service-app'
import { AuthService } from '@/services/auth.service'
@Injectable()
export class NotifyService {
  // authTabs$ = this.authService.getAuthTabs$('common-notify')
  constructor(private authService: AuthService) {}
}
