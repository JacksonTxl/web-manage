<template>
  <section class="page-test-kael container-basis">1111
    <st-checkbox-button-group v-model="a">
      <st-checkbox-button-item :value='1' label="11">1</st-checkbox-button-item>
      <st-checkbox-button-item :value='2'>2</st-checkbox-button-item>
      <st-checkbox-button-item :value='3'>3</st-checkbox-button-item>
    </st-checkbox-button-group>
  </section>
</template>
<script>
export default {
  data() {
    return {
      a: ['1']
    }
  }
}
</script>
