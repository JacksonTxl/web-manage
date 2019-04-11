<template>
  <st-panel app>
    <st-image-upload :num-limit="9" :list="list">
    </st-image-upload>
  </st-panel>
</template>

<script>
export default {
  data() {
    return {
      list: []
    }
  },
  methods: {
    onDelete(data) {
      console.log(data)
    },
    onSet(item) {
      console.log(item)
    }
  }
}
</script>
