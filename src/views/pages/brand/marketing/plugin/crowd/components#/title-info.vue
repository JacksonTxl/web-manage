<template>
  <div :class="bTitleInfo()" class="mg-b40">
    <st-t4 class="mg-r40">{{ value.title }}</st-t4>
    <span :class="bTitleInfo('span')">
      {{ value.info }}
    </span>
  </div>
</template>
<script>
export default {
  bem: {
    bTitleInfo: 'crowd-components-title-info'
  },
  props: {
    value: Object
  }
}
</script>
