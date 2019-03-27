<template>
  <ul class="st-steps">
    <li class="st-step" v-for="(step, index) in stepList" :key="step.title">
      <div class="st-step__title">{{step.title}}</div>
      <div class="st-step__index">{{index}}</div>
    </li>
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
