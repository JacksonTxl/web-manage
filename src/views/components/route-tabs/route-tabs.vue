<template>
  <a-tabs
    :activeKey='currentValue'
    :tabPosition="tabPosition"
    @change="OnChange"
    class="st-route-tabs"
  >
    <a-tab-pane v-for="tab in options" :tab="tab.label" :key="tab.route.name"></a-tab-pane>
    <slot name="actions" slot="tabBarExtraContent"></slot>
  </a-tabs>
</template>

<script>
export default {
  name: 'StRouteTabs',
  props: {
    options: {
      type: Array,
      default: () => {
        return []
      },
      required: true,
      validator: value => {
        let flag
        value.forEach(tab => {
          flag = !tab.label || !tab.route || !tab.route.name
        })
        return !flag
      }
    },
    tabPosition: {
      type: String,
      default: 'top'
    }
  },
  computed: {
    currentValue() {
      return this.$route.name
    }
  },
  created() {
    this.options.forEach(op => {
      if (!op.label) {
        throw new Error(['请设置 label 值'])
      }
      if (!op.route) {
        throw new Error([`请给label为${op.label}设置 route对象`])
      }
      if (!op.route.name) {
        throw new Error([`请给label为${op.label}设置 route对象`])
      }
    })
  },
  methods: {
    OnChange(key) {
      const { options } = this
      let query = {}
      options.forEach(tab => {
        if (tab.route.name === key) {
          query = { ...tab.route.query }
        }
      })
      this.$emit('change', key, query)
      this.$router.push({ name: key, query })
    }
  }
}
</script>

<style scoped>
</style>
