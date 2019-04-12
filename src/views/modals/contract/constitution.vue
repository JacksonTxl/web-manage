<template>
  <a-modal v-model="show" title="会员卡合同章程设置">
    <a-textarea placeholder='请输入合同章程，支持换行，空格...'>

    </a-textarea>
  </a-modal>
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
