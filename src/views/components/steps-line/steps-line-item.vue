<template>
  <li :class="bComponent()">
    <div :class="bComponent('index')">{{ step }}</div>
    <div :class="bComponent('content')">
      <st-t4>{{ title }}</st-t4>
      <p>{{ description }}</p>
    </div>
  </li>
</template>

<script>
export default {
  name: 'StStepsLineItem',
  props: {
    title: {
      type: String
    },
    step: {
      type: Number
    },
    description: {
      type: String
    }
  },
  bem: {
    bComponent: 'steps-line-item'
  }
}
</script>
