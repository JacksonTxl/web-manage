<template>
    <a-steps :current="value">
        <a-step  v-for="item in stepArr" :title="item.title" :key="item.key" />
    </a-steps>
</template>
<script>
export default {
  name: 'Steps',
  props: {
    stepArr: {
      type: Array,
      default: () => {
        return []
      }
    },
    value: {
      type: Number,
      default: 0
    }
  }
}
</script>
