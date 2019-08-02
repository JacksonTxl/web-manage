<template>
  <section class="sg-section">
    <h3>st-checkbox-facility</h3>
    <st-checkbox-facility-group v-model="model">
      <st-checkbox-facility-item
        disabled
        value="wechat"
        icon="wechat"
        label="wifi"
      ></st-checkbox-facility-item>
      <st-checkbox-facility-item
        value="weibo"
        icon="weibo"
        label="weibo"
      ></st-checkbox-facility-item>
      <st-checkbox-facility-item
        value="home"
        icon="home"
        label="home"
      ></st-checkbox-facility-item>
    </st-checkbox-facility-group>
    {{ model }}
  </section>
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
