<template>
  <div class="iCountUp">
    <ICountUp
      :endVal="endVal"
      :options="options"
      @ready="onReady"
    />
  </div>
</template>

<script>
export default {
  name: 'CountupDemo',
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
    onReady: function(instance, CountUp) {
      // const that = this;
      // instance.update(that.endVal + 100);
    }
  }
}
</script>

<style scoped>
  .iCountUp {
    font-size: 36px;
  }
</style>
