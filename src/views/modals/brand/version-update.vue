<template>
  <st-modal
    title="功能未开放"
    v-model="show"
    @close="onClose"
    :closable="false"
    :footer="null"
    :getContainer="getContainer"
    :maskClosable="false"
  >
    需要升级到俱乐部版本才能使用
  </st-modal>
</template>

<script>
export default {
  data() {
    return {
      show: false
    }
  },
  methods: {
    getContainer() {
      return document.querySelector('.layout-default-body__content')
    }
  }
}
</script>
