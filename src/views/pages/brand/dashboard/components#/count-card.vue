<template>
  <div class="page-dashboard-count-card">
    <div class="title">
      {{ title }}
      <slot name="title"></slot>
    </div>
    <div class="i-count-up-box mg-t8">
      <span class="mg-r16 i-count-up font-number">{{ count }}</span>
      <div
        v-if="trend"
        class="trend"
        :class="trend.isUp ? 'trend-up' : 'trend-down'"
      >
        <img :src="trend.isUp ? topIconUp : topIconDown" />
        <span>{{ trend.rate }}</span>
      </div>
    </div>
    <div>
      <slot></slot>
    </div>
    <div class="bg-gary card-footer">
      <span class="label">{{ footer.label }}</span>
      <span class="value font-number">{{ footer.value }}</span>
    </div>
  </div>
</template>

<script>
import topIconUp from '@/assets/img/brand/dashboard/top_icon_up.svg'
import topIconDown from '@/assets/img/brand/dashboard/top_icon_down.svg'
export default {
  name: 'CountCard',
  data() {
    return {
      topIconUp: topIconUp,
      topIconDown: topIconDown,
      endVal: 8888,
      options: {}
    }
  },
  props: {
    title: {
      type: String,
      default: '卡片标题'
    },
    count: {
      type: [Number, String],
      default: 0
    },
    trend: {
      type: Object
    },
    footer: {
      type: Object,
      default: () => {
        return {
          label: '尽日',
          value: 888
        }
      }
    }
  },
  methods: {
    onReady() {
      console.log('onReady')
    }
  }
}
</script>

<style lang="scss" scoped></style>
