<template>
  <st-panel app>
    {{list}}
    {{info}}
    <modal-link :to="{name:'test-sg',on:{ok:onOk}}">open</modal-link>
  </st-panel>
</template>

<script>
import { RxService } from './rx.service'
export default {
  serviceInject() {
    return {
      rx: RxService
    }
  },
  rxState() {
    return {
      list: this.rx.list$,
      info: this.rx.info$
    }
  },
  methods: {
    onOk() {
      this.rx.SET_LIST()
      console.log('ok')
    }
  }
}
</script>
