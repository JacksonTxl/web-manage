<template>
  <a-tabs class="st-tabs"></a-tabs>
</template>

<script>
export default {
  name: 'StTabs',
  props: {
    // 使用 [{label:'',href:''}] 作为tab路由跳转
    data: {
      type: Array,
      default: () => []
    }
  }
}
</script>
