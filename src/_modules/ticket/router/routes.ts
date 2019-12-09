import Print from '../views/pages/print.vue'
import GatheringPrint from '../views/pages/gathering-print.vue'
import { PrintService } from '../views/pages/print.service'
import { GatheringPrintService } from '../views/pages/gathering-print.service'
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
  },
  {
    name: 'ticket-gathering-print',
    path: '/ticket/gathering-print',
    component: GatheringPrint,
    guards: ticketGuards,
    controller: GatheringPrintService,
    meta: {
      title: '收款打印'
    }
  }
]
