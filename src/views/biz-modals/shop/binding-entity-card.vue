<template>
  <st-modal title="绑定实体卡" @ok="save" v-model="show" size="small">
    <section>
      <st-form :form="form" @submit="save" labelWidth="55px">
        <st-info>
          <st-info-item label="姓名">{{ record.member_name }}</st-info-item>
          <st-info-item label="手机号">{{ record.mobile }}</st-info-item>
        </st-info>
        <st-form-item label="实体卡号" required>
          <a-input
            placeholder="输入实体卡号"
            v-decorator="decorators.card_num"
          />
        </st-form-item>
        <st-form-item label="物理ID" required>
          <a-input
            placeholder="请将实体卡置于读卡器上"
            v-decorator="decorators.rfid"
          />
        </st-form-item>
      </st-form>
    </section>
    <section></section>
  </st-modal>
</template>
<script>
import { BindingEntityCardService } from './binding-entity-card.service'
import { ruleOptions } from './binding-entity-card.config'
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
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      show: false
    }
  },
  methods: {
    save(e) {
      e.preventDefault()
      this.form.validate().then(values => {
        this.getLableList(values)
      })
    },
    getLableList(data) {
      this.Service.getMemberCard(this.record.member_id, data).subscribe(
        state => {
          this.show = false
          this.$emit('success')
        }
      )
    }
  }
}
</script>
