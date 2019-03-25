<template>
  <a-button-group>
    <slot @change="aaa" @click="aaa"></slot>
  </a-button-group>
</template>
<script>
export default {
  props: {
    arr: String
  },
  methods: {
    aaa(a) {
      console.log(111)
    }
  }
}
</script>
