<template>
  <div class="page-dashboard-count-card">
    <div class="title">{{title}} <slot name="title"></slot></div>
    <div class="i-count-up-box mg-t8">
      <i-count-up class="mg-r16 i-count-up font-number" :endVal="Number(count||'')"/>
      <div v-if="trend" class="trend">
        <span >{{trend.isUp?'上升' : '下降'}}</span><span >{{trend.rate}}</span>
      </div>
    </div>
    <div>
      <slot></slot>
    </div>
    <div class="bg-gary card-footer">
      <span class="label">{{footer.label}} </span>
      <span class="value"><i-count-up :endVal="footer.value"/></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CountCard',
  data() {
    return {
      endVal: 8888,
      options: {
      }
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

<style lang="scss" scoped>

</style>
