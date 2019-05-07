<template>
  <st-modal title="预约详情" @ok="save" v-model="show">
    <div><span>已约</span><span>0人</span></div>
  </st-modal>
</template>

<script>
export default {
  name: 'OrderInfoPersonal',
  data() {
    return {
      show: false,
      form: this.$form.createForm(this)
    }
  },
  methods: {
    onChange() {

    },
    save() {

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
