<template>
  <li :class="bComponent()">
    <div :class="bComponent('index')">{{ step }}</div>
    <div :class="bComponent('content')">
      <st-t4>{{ info.title }}</st-t4>
      <p>{{ info.content }}</p>
    </div>
  </li>
</template>

<script>
export default {
  name: 'StStepsLineItem',
  bem: {
    bComponent: 'steps-line-item'
  }
}
</script>
