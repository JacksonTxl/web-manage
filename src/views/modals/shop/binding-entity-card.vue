<template>
  <st-modal title="绑定实体卡" @ok="save" v-model="show" size="small">
    <section>
      <st-form :form="form" @submit="save" labelWidth="55px">
        <st-info>
          <st-info-item label="姓名">孙乐乐</st-info-item>
          <st-info-item label="手机号">12345678901</st-info-item>
        </st-info>
        <st-form-item label="实体卡号" placeholder="输入实体卡号">
          <a-input/>
        </st-form-item>
        <st-form-item label="物理ID" placeholder="请将实体卡置于读卡器上">
          <a-input/>
        </st-form-item>
      </st-form>
    </section>
    <section></section>
  </st-modal>
</template>
<script>
export default {
  name: 'bindingEntityCard',
  props: {},
  data() {
    return {
      show: false,
      form: {}
    }
  },
  created() {},
  methods: {
    save(e) {
      e.preventDefault()
      console.log(e)
    }
  },
  watch: {}
}
</script>
