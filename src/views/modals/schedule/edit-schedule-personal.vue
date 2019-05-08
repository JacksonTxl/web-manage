<template>
  <st-modal title="编辑排期" @ok="save" v-model="show">
    <div>
      <span>上课教练：</span><span>李正丽</span> <div>2019/01/27~2019/02/02</div>
    </div>
    <st-shop-hour-picker></st-shop-hour-picker>
  </st-modal>
</template>

<script>
export default {
  name: 'EditSchedulePersonal',
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
