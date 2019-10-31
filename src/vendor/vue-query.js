export default {
  install(Vue) {
    Vue.mixin({
      beforeCreate() {
        Vue.util.defineReactive(this, '$query', this.$route.meta.query)
      },
      beforeRouteUpdate() {
        this.$query = this.$route.meta.query
      }
    })
  }
}
