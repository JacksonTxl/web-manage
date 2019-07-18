// 图标mixin 注册 chart和dv  需要实现initDv和initChart方法
// 自动监听data属性用作实时改变chart数据
export default {
  data() {
    return {
      chart: null,
      dv: null
    }
  },
  created() {
    this.initDv()
  },
  mounted() {
    if (this.data.length) {
      this.initChart()
    }
  },
  watch: {
    data(newData) {
      if (newData.length) {
        if (!this.chart) {
          this.initDv()
          this.initChart()
        } else {
          this.initDv()
          this.chart.changeData(this.dv)
          this.changeData && this.changeData() // 自定义的changeData
        }
      }
    }
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.destroy()
    }
  }
}
