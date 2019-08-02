<template>
  <section class="sg-section">
    <h3>st-switch</h3>
    <p>
      绑定模型为数字 0 为关 1 为开
    </p>
    <st-switch v-model="model"></st-switch>
    {{ model }}
  </section>
</template>

<script>
export default {
  data() {
    return {
      model: 0
    }
  }
}
</script>
