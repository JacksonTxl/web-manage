<template>
  <st-panel app>
    <st-table-actions>
      <template v-if='show'>
      <a href="javascript:;">详情</a>

      </template>
      <a href="javascript:;">上架</a>
      <a href="javascript:;">编辑</a>
      <a href="javascript:;">停售</a>
    </st-table-actions>
    <a v-modal-link="{name:'test-sg'}">modal</a>
  </st-panel>
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
