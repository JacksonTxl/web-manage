<template>
  <div :class="bCom">
    <st-t3 class="mg-b16">大转盘</st-t3>
    <div class="mg-b16" :class="bCom('item')">
      <span>参与用户</span>
      <span></span>
    </div>
    <div :class="bCom('item')">
      <span>
        活动时间
      </span>
      <span></span>
    </div>
  </div>
</template>
<script>
import { HeaderService } from './header.service'

export default {
  name: 'PluginLotteryInfoHeader',
  data() {
    return {}
  },
  props: {
    id: {
      type: Number,
      default: 1
    }
  },
  bem: {
    bCom: 'brand-marketing-plugin-lottery-info-header'
  },
  serviceInject() {
    return {
      headerService: HeaderService
    }
  },
  rxState() {
    return {
      info: this.headerService.info$
    }
  },
  created() {
    this.headerService.init(this.id)
  },
  components: {},
  computed: {}
}
</script>
