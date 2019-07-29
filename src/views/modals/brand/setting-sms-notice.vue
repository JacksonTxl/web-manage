<template>
  <st-modal title="预览" v-model="show" @ok="save" width="548px" @cancel="cancel">
    <image :src="img" />
  </st-modal>
</template>
<script>
export default {
  name: 'SettingSmsNotice',
  props: {
    img: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      show: false
    }
  },
  methods: {
    save() {},
    cancel() {}
  }
}
</script>
