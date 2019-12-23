<template>
  <st-panel app>
    <div :class="b()">
      <div :class="b('inbatch-content')">
        <p>小班课名称</p>
        <p>类型：固定排课</p>
        <p>总课时8节</p>
        <p>共排课19节</p>
        <p>自动去掉后11节</p>
      </div>
      <div :class="b('save-schedule-btn')">
        <st-button>
          取消
        </st-button>
        <st-button type="primary" class="mg-l112">
          完成
        </st-button>
      </div>
    </div>
  </st-panel>
</template>

<script>
import { InbatchInfoService } from './inbatch-info.service'

export default {
  name: 'AddScheduleInBatch',
  bem: {
    b: 'page-shop-schedule-inbatch-info'
  },
  serviceInject() {
    return {
      inbatchInfoService: InbatchInfoService
    }
  },
  rxState() {
    return {
      scheduleList: this.inbatchInfoService.scheduleList$
    }
  },
  data() {
    return {}
  },
  created() {
    console.log(this.scheduleList)
  },
  methods: {
    save() {
      // this.InbatchInfoService.addScheduleInBatch(reqdata).subscribe(() => {
      //   this.show = false
      //   this.$router.push({
      //     query: {
      //       ...this.$searchQuery
      //     }
      //   })
      // })
    }
  }
}
</script>
