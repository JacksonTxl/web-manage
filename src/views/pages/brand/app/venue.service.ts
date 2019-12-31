import { Injectable } from 'vue-service-app'
import { AuthService } from '@/services/auth.service'

@Injectable()
export class VenueService {
  authTabs$ = this.authService.getAuthTabs$('brand-app-venue')
  constructor(private authService: AuthService) {}
}
