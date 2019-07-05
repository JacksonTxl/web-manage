<template>
  <st-modal
    title="新增长期储物柜"
    size="small"
    v-model="show"
    @ok="onSubmit"
    @cancel="onCancel"
  >
    <st-form :form="form" labelWidth="85px">
      <st-form-item label="区域">
        <a-input :value="areaName" disabled/>
      </st-form-item>
      <st-form-item label="首字母">
        <a-input placeholder="请输入首字母" maxlength="1" v-decorator="ruleConfig.firstLetter"/>
      </st-form-item>
      <st-form-item label="起始编号" required>
        <a-input placeholder="请输入起始编号" v-decorator="ruleConfig.startNum"/>
      </st-form-item>
      <st-form-item label="柜子数量" required>
        <st-input-number placeholder="请输入数量" v-decorator="ruleConfig.num">
          <template slot="addonAfter">个</template>
        </st-input-number>
      </st-form-item>
      <st-form-item required>
        <template slot="label">
          递增方式<st-help-tooltip id="TSCL001" />
        </template>
        <a-radio-group
          v-decorator="ruleConfig.sortType"
        >
          <a-radio
            v-for="(item, index) in settingEnums.cabinet.sort_type.value"
            :key="index"
            :value="index"
          >
            {{item}}
          </a-radio>
        </a-radio-group>
      </st-form-item>
      <st-form-item label="租赁价格" required>
        <st-input-number :float="true" placeholder="请输入售卖价格" v-decorator="ruleConfig.priceNum">
            <template slot="addonAfter">元/天</template>
        </st-input-number>
      </st-form-item>
      <st-form-item label="转让手续费">
        <st-input-number :float="true" placeholder="请输入转让手续费" v-decorator="ruleConfig.transferNum">
          <template slot="addonAfter">
            <a-select v-model="transferUnit">
              <a-select-option
                v-for="(item, index) in settingEnums.cabinet.transfer_unit.value"
                :key="index"
                :value="+index"
              >
                {{item}}
              </a-select-option>
            </a-select>
          </template>
        </st-input-number>
      </st-form-item>
    </st-form>
  </st-modal>
</template>
<script>
import { MessageService } from '@/services/message.service'
import { UserService } from '@/services/user.service'
import { AddLongTermService as AddService } from './add-long-term.service'
import { RuleConfig } from '@/constants/setting/cabinet-rule'

export default {
  serviceInject() {
    return {
      messageService: MessageService,
      userService: UserService,
      addService: AddService,
      ruleConfig: RuleConfig
    }
  },
  rxState() {
    return {
      loading: this.addService.loading$,
      settingEnums: this.userService.settingEnums$
    }
  },
  data() {
    return {
      show: false,
      form: this.$form.createForm(this),
      transferUnit: 1
    }
  },
  props: {
    id: {
      type: [Number, String],
      default: 0
    },
    areaName: {
      type: String,
      default: ''
    }
  },
  methods: {
    onSubmit(e) {
      console.log(11)
      e.preventDefault()
      this.form.validateFields().then((data) => {
        data.cabinet_area_id = this.id
        data.transfer_unit = this.transferUnit
        this.addService.add(data).subscribe(this.onSubmitSuccess)
      })
    },
    onCancel() {
      this.show = false
    },
    onSubmitSuccess() {
      this.messageService.success({
        content: '保存成功'
      })
      this.show = false
      this.$emit('change')
    }
  }
}
</script>
