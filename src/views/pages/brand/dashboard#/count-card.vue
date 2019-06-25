<template>
  <div class="page-dashboard-count-card">
    <div class="title">今日营收额(万元)</div>
    <div class="i-count-up-box mg-t8">
      <i-count-up class="mg-r16 i-count-up" :endVal="endVal" :options="options" @ready="onReady"/>
      <div class="trend">
        <span >上升</span><span >11%</span>
      </div>
    </div>
    <div>
      <slot></slot>
    </div>
    <div class="bg-gary card-footer">
      <span class="label">近7天日均营收额: </span>
      <span class="value"><i-count-up :endVal="endVal" :options="options" @ready="onReady"/></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CountCard',
  data() {
    return {
      // 开始值
      // startVal: 1000,
      // 结束值
      endVal: 8888,
      options: {
        // useEasing: true,
        // useGrouping: true,
        // separator: ',',
        // decimal: '.',
        // prefix: '',
        // suffix: ''
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
