<template>
  <div>
    hello
    <st-popconfirm @confirm="onConfirm">
      <a>删除</a>
    </st-popconfirm>
  </div>
</template>

<script>
export default {
  methods: {
    onConfirm() {
      console.log('confirm')
    }
  }
}
</script>
