<template>
  <st-modal title="绑定实体卡" @ok="save" v-model="show" size="small">
    <section>
      <st-form :form="form" @submit="save" labelWidth="55px">
        <st-info>
          <st-info-item label="姓名">{{record.member_name}}</st-info-item>
          <st-info-item label="手机号">{{record.mobile}}</st-info-item>
        </st-info>
        <st-form-item label="实体卡号" placeholder="输入实体卡号">
          <a-input v-model="form.physical_id"/>
        </st-form-item>
        <st-form-item label="物理ID" placeholder="请将实体卡置于读卡器上">
          <a-input v-model="form.card_num"/>
        </st-form-item>
      </st-form>
    </section>
    <section></section>
  </st-modal>
</template>
<script>
import { BindingEntityCardService } from './binding-entity-card.service'
export default {
  serviceInject() {
    return {
      Service: BindingEntityCardService
    }
  },
  name: 'bindingEntityCard',
  props: {
    record: {
      type: Object
    }
  },
  data() {
    return {
      show: false,
      form: {
        physical_id: '',
        card_num: ''
      }
    }
  },
  created() {},
  methods: {
    save(e) {
      e.preventDefault()
      console.log(e)
      this.getLableList()
    },
    getLableList() {
      let self = this
      self.Service.getMemberLableList(self.record.id, self.form).subscribe(
        state => {
          self.lableList = state.list
        }
      )
    }
  },
  watch: {}
}
</script>
