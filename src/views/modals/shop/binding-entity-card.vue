<template>
  <st-modal title="绑定实体卡" @ok="save" v-model="show" size="small">
    <section>
      <st-form :form="form" @submit="save" labelWidth="55px">
        <st-info>
          <st-info-item label="姓名">{{record.member_name}}</st-info-item>
          <st-info-item label="手机号">{{record.mobile}}</st-info-item>
        </st-info>
        <st-form-item label="实体卡号" required>
          <a-input placeholder="输入实体卡号" v-decorator="basicInfoRuleList.rfid"/>
        </st-form-item>
        <st-form-item label="物理ID" required>
          <a-input placeholder="请将实体卡置于读卡器上" v-decorator="basicInfoRuleList.card_num"/>
        </st-form-item>
      </st-form>
    </section>
    <section>
    </section>
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
      form: this.$form.createForm(this),
      basicInfoRuleList: {
        // 实体卡
        rfid: [
          'rfid',
          {
            rules: [
              {
                required: true,
                message: '请输入正确的实体卡号',
                pattern: /\d$/
              }
            ]
          }
        ],
        // 物理ID
        card_num: [
          'card_num',
          {
            rules: [
              {
                required: true,
                message: '请输入正确的物理ID',
                pattern: /\d$/
              }
            ]
          }
        ]
      }
    }
  },
  created() {},
  methods: {
    save(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.getLableList(values)
        }
      })
    },
    getLableList(data) {
      this.Service.getMemberCard(self.record.member_id, data).subscribe(state => {
        this.show = false
        this.$emit('success')
      })
    }
  },
  watch: {}
}
</script>
