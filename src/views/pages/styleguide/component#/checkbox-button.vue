<template>
  <div>
    <st-checkbox-button-group v-model="model">
      <st-checkbox-button-item disabled value="1">周一</st-checkbox-button-item>
      <st-checkbox-button-item value="2">周二</st-checkbox-button-item>
      <st-checkbox-button-item value="3">周三</st-checkbox-button-item>
      <st-checkbox-button-item value="4">周四</st-checkbox-button-item>
      <st-checkbox-button-item value="5">周五</st-checkbox-button-item>
      <st-checkbox-button-item value="6">周六</st-checkbox-button-item>
      <st-checkbox-button-item value="7">周日</st-checkbox-button-item>
    </st-checkbox-button-group>
    {{ model }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: []
    }
  }
}
</script>
