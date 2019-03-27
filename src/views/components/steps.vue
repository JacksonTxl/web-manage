<template>
  <ul>
    <li v-for="step in stepList" :key="step.title">step.title</li>
  </ul>
</template>

<script>
export default {
  name: 'StSteps',
  props: {
    nowStep: {
      type: Number,
      default: 0
    },
    stepList: {
      type: Array,
      default: () => {
        return []
      }
    }
  }
}
</script>

<style scoped>

</style>
