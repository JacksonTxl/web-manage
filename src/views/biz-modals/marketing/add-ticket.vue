<template>
  <st-modal
    title="添加票种"
    :footer="null"
    class="modal-brand-switch"
    v-model="show"
  ></st-modal>
</template>
<script>
export default {
  data() {
    return {
      show: false
    }
  }
}
</script>
