<template>
  <div>
    添加「maxLength」属性 限制并显示输入框的字符串长度
    <st-input v-model="value" :maxLength="15"></st-input>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: ''
    }
  }
}
</script>
