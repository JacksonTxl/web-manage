import { Injectable, RouteGuard } from 'vue-service-app'
import { RedirectService } from '@/services/redirect.service'
@Injectable()
export class StatService implements RouteGuard {}
