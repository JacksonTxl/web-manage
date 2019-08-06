<template>
  <div>
    hello
    <a v-modal-link="{ name: 'test-sg' }">牛</a>
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
