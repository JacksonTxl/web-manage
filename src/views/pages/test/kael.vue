<template>
  <section class="page-test-kael container-basis">
    <st-checkbox-facility-group>
      <st-checkbox-facility-item icon="home" label="aaa" :value="1" :disabled="false" @change="kael"></st-checkbox-facility-item>
      <st-checkbox-facility-item></st-checkbox-facility-item>
      <st-checkbox-facility-item></st-checkbox-facility-item>
      <st-checkbox-facility-item></st-checkbox-facility-item>
    </st-checkbox-facility-group>
  </section>
</template>
<script>
export default {
  methods: {
    kael(data) {
      console.log(data)
    }
  }
}
</script>
