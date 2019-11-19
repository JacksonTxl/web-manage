import { Injectable } from 'vue-service-app'
import { AuthService } from '@/services/auth.service'

@Injectable()
export class ExplainService {
  auth$ = this.authService.authMap$({
    staff: 'brand:setting:import|import_staff',
    product: 'brand:setting:import|import_product',
    member: 'brand:setting:import|import_member',
    sold: 'brand:setting:import|import_sold'
  })
  constructor(private authService: AuthService) {}
}
