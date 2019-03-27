<template>
  <a-button-group>
    <slot></slot>
    {{check}}
  </a-button-group>
</template>
<script>
export default {
  props: {
    name: String
  },
  data() {
    return {
      hhh: '',
      item: {
        name: 'jack',
        age: 23
      }
    }
  },
  computed: {
    check() {
      console.log(this.$slots.default[0].componentInstance)
      return this.$slots.default[0].componentInstance
    }
  },
  watch: {
    hhh(n, o) {
      if (!n) return

      console.log('group', n)
      this.$nextTick().then(() => {
        console.log('group', n)
      })
    }
  },
  methods: {
    aaa(a) {
      console.log(111)
    }
  },
  created() {
    this.hhh = this.$slots.default[0].componentInstance.stChecked
    this.$nextTick().then(() => {
      console.log('group', this.$slots.default[0].componentInstance.stChecked)
    })
    // console.log(this.$slots.componentInstancest.stChecked)
  }
}
</script>
