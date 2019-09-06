<template>
  <div :class="bCom">
    <st-t3 class="mg-b16">{{ info.activity_name }}</st-t3>
    <div class="mg-b8" :class="bCom('item')">
      <span class="mg-r16">参与用户:</span>
      <span>{{ info.member_level }}</span>
    </div>
    <div :class="bCom('item')">
      <span class="mg-r8">
        活动时间:
      </span>
      <span>{{ info.activity_time }}</span>
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
    this.headerService.getHeaderInfo(this.id).subscribe()
  },
  components: {},
  computed: {}
}
</script>
