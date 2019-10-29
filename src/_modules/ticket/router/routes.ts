import Print from '../views/pages/print.vue'
import { PrintService } from '../views/pages/print.service'
import { TitleService } from '@/services/title.service'
import { RouteService } from '@/services/route.service'
import { TokenService } from '@/services/token.service'
import { NProgressService } from '@/services/nprogress.service'

const ticketGuards = [
  NProgressService,
  TokenService,
  TitleService,
  RouteService
]

export default [
  {
    name: 'ticket-print',
    path: '/ticket/print',
    component: Print,
    guards: ticketGuards,
    controller: PrintService,
    meta: {
      title: '打印'
    }
  }
]
