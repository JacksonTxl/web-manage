<template>
  <div>

  </div>
</template>

<script>
import { ThemeService } from '@/services/theme.service'
import { LlfService } from '@/views/pages/test/llf.service'
import { RouteService } from '@/services/route.service'
import { MessageService } from '@/services/message.service'
import { Action } from 'rx-state'
import { switchMap, catchError, filter } from 'rxjs/operators'
import { EMPTY } from 'rxjs'

export default {
  serviceInject() {
    return {
      themeService: ThemeService,
      messageService: MessageService,
      llfService: LlfService,
      route: RouteService
    }
  },
  subscriptions() {
    this.submit$ = new Action(data$ =>
      data$.pipe(
        switchMap(data =>
          this.llfService.test(data).pipe(catchError(() => EMPTY))
        )
      )
    )
    return {
      query: this.route.query$,
      llfLoading: this.llfService.loading$,
      name: this.llfService.name$
    }
  },
  methods: {
    onUrlPush() {
      this.$router.push({ query: this.query })
    }
  }
}
</script>
