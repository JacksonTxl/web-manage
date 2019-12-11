import { AuthService } from '@/services/auth.service'
import { Injectable } from 'vue-service-app'

@Injectable()
export class GatheringTipService {
  auth$ = this.authService.authMap$({
    print: 'shop:order:order|print'
  })
  constructor(private authService: AuthService) {}
}
