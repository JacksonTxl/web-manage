import Cookie from 'js-cookie'

export default {
  install(Vue) {
    const sgMixin = {
      mounted() {
        if (
          this.$options._componentTag &&
          this.$options._componentTag.split('-')[0] !== 'a' &&
          (location.search.includes('sg') || Cookie.get('sg')) &&
          process.env.NODE_ENV === 'development'
        ) {
          Cookie.set('sg', '1')
          if (this.$el && this.$el.dataset) {
            this.$el.dataset.sg = this.$options._componentTag
          }
        }
      }
    }

    Vue.mixin(sgMixin)
  }
}
