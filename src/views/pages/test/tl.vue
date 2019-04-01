<template>
  <st-panel app>
    <a-row :gutter="8">
      <a-col :span="8" v:for="">
        <p class="col-span">1</p>
      </a-col>
    </a-row>
  </st-panel>
</template>

<script>
import { ThemeService } from '@/services/theme.service'
import { TlService } from '@/views/pages/test/tl.service'
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
      tlService: TlService,
      route: RouteService
    }
  },
  data() {
    return {
    }
  },
  subscriptions() {
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.col-span {
  background: #ccc;
  text-align: center;
}
</style>
