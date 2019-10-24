<template>
  <div>
    <p>
      绑定模型为数字 0 为关 1 为开
    </p>
    <st-switch v-model="model"></st-switch>
    {{ model }}
  </div>
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
