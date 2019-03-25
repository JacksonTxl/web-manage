<template>
  <a-button-group>
    <slot></slot>
  </a-button-group>
</template>
<script>
export default {
  props: {
    name: String
  },
  methods: {
    aaa(a) {
      console.log(111)
    }
  }
}
</script>
