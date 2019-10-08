<template>
  <ul>
    <steps-line-item
      v-for="item in steps"
      :index="item.index"
      :key="item.index"
      :info="item"
    ></steps-line-item>
  </ul>
</template>

<script>
import StepsLineItem from './steps-line-item'
export default {
  name: 'StStepsLine',
  components: {
    StepsLineItem
  }
}
</script>
