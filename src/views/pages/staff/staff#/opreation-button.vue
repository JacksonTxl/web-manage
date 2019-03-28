<template>
  <div class="opreation-button">
    <st-button  class="opreation-button__modal" type="primary" @click="onClickAddStaff" ghost>添加员工</st-button>
    <st-button class="opreation-button__modal">批量导入员工</st-button>
  </div>
</template>

<script>
export default {
  name: 'OpreationButton',
  methods: {
    onClickAddStaff() {
      this.$route.push('')
    }
  }
}
</script>
