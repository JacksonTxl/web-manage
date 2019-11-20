<template>
  <a-spin :class="b()" :spinning="loading">
    <img
      v-if="src"
      :src="src"
      :class="b('image')"
      v-on="$listeners"
      v-bind="$attrs"
    />
  </a-spin>
</template>

<script>
export default {
  name: 'StImage',
  bem: {
    b: 'st-image-loading'
  },
  props: {
    src: {
      type: String,
      default: ''
    }
  },
  watch: {
    src(newVal) {
      this.initImage()
    }
  },
  mounted() {
    this.initImage()
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    initImage() {
      const img = new Image()
      img.src = this.src
      this.loading = true
      img.onload = () => {
        this.loading = false
      }
    }
  }
}
</script>
