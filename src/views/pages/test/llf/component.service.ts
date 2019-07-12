import { AuthService } from '@/services/auth.service'
import { Injectable } from 'vue-service-app'
@Injectable()
export class ComponentService {
  auth$ = this.authService.authMap({
    add: 'brand_shop:page:home|brand_page',
    edit: 'auth:bbe'
  })
  constructor(private authService: AuthService) {}
}
