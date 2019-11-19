import Print from '../views/pages/print.vue'
import { PrintService } from '../views/pages/print.service'
import { ProgressGuard } from '@/guards/progress.guard'
import { TitleGuard } from '@/guards/title.guard'

const ticketGuards = [ProgressGuard, TitleGuard]

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
