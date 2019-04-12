<template>
  <div @click="onClick" style="width: 100px;height:100px;background: #e24">
    <input type="text" v-model="wa">
    a{{value}}
  </div>
</template>

<script>
export default {
  name: 'dsd',
  model: {
    props: 'value',
    event: 'chnsg'
  },
  props: {
    value: Array
  },
  data() {
    return {
      wa: 'f',
      b: '',
      a: [{ hs: 9 }]
    }
  },
  watch: {
    value() {
      this.b = this.getB(this.value)
    },
    wa() {
      this.$emit('chnsg', this.wa)
    }
  },
  methods: {
    getB(value) {
      return value[0]
    },
    getfr() {
      return { g: [{ hdfgh: 999 }] }
    },
    onClick() {
      this.$emit('chnsg', this.getfr().g)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
