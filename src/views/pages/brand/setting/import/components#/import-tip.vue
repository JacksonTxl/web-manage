<template>
  <div :class="bTip()">
    <st-icon type="attention" color="#FF5E41" :class="bTip('icon')" />
    请务必使用系统下载的模板，补充信息后上传。您可以在次日检查导入结果哦～
  </div>
</template>
<script>
export default {
  bem: {
    bTip: 'import-tip'
  }
}
</script>
