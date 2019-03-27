<template>
  <div class="opreation-button">
    <modal-link tag="a-button"  :to="{name: 'add-staff'}" class="opreation-button__modal" type="primary" ghost>添加员工</modal-link>
    <st-button class="opreation-button__modal">批量导入员工</st-button>
  </div>
</template>

<script>
export default {
  name: 'OpreationButton'
}
</script>

<style scoped>

</style>
