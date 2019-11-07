<template>
  <a-tooltip placement="topRight">
    <template slot="title">
      <span>点击刷新</span>
    </template>
    <div class="st-refresh-btn" @click="refresh">
      最近更新时间：
      <span class="st-refresh-btn__date">
        {{ showDate }}
      </span>
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
export default {
  name: 'StRefreshBtn',
  props: {
    date: {
      type: String
    },
    action: {
      type: Function
    }
  },
  data() {
    return {
      /**
       * TODO: 问设计需不需要秒
       */
      showDate: moment().format('YYYY-MM-DD HH:mm:ss'),
      loading: true
    }
  },
  methods: {
    refresh() {
      this.loading = false
      const timer = setTimeout(() => {
        this.action().subscribe(() => {
          this.loading = true
          this.showDate = moment().format('YYYY-MM-DD HH:mm:ss')
          clearTimeout(timer)
        })
      }, 300)
    }
  }
}
</script>
