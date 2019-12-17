<template>
  <a-tooltip placement="topRight">
    <template slot="title">
      <span>点击刷新</span>
    </template>
    <div class="st-refresh-btn" @click="refresh">
      <span class="st-refresh-btn__date">最近更新时间：{{ showDate }}</span>
      <span
        class="st-refresh-btn__icon"
        :class="{ 'st-refresh-btn__icon--loading': !loading }"
      >
        <st-icon type="refresh"></st-icon>
      </span>
    </div>
  </a-tooltip>
</template>

<script>
import { MessageService } from '../../../services/message.service'
const TIME_FORMAT = 'YYYY-MM-DD HH:mm'
export default {
  name: 'StRefreshBtn',
  serviceInject() {
    return {
      msg: MessageService
    }
  },
  props: {
    action: {
      type: Function
    },
    rangeTime: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      showDate: moment().format(TIME_FORMAT),
      loading: true,
      times: 0,
      intervalTimer: ''
    }
  },
  methods: {
    refresh() {
      if (this.times > 0) {
        this.msg.error({ content: `间隔太短，请稍后尝试` })
        return
      }
      clearInterval(this.intervalTimer)
      this.times = this.rangeTime

      this.loading = false
      const timer = setTimeout(() => {
        this.action().subscribe(() => {
          this.loading = true
          this.showDate = moment().format(TIME_FORMAT)
          clearTimeout(timer)
          this.intervalTimer = setInterval(() => {
            this.times--
          }, 1000)
        })
      }, 300)
    }
  }
}
</script>
