<template>
  <st-panel app>
    <st-card-bg-radio v-model="card_bg"/>
    <hr>
    <a-radio></a-radio>
  </st-panel>
</template>
<script>
export default {
  data() {
    return {
      card_bg: undefined
    }
  }
}
</script>
