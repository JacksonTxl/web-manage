<template>
  <st-modal
    title="新增临时储物柜"
    size="small"
    v-model="show"
    @ok="onSubmit"
    @cancel="onCancel"
  >
    <st-form :form="form" labelWidth="70px">
      <st-form-item label="区域">
        <a-input :value="areaName" disabled/>
      </st-form-item>
      <st-form-item label="首字母">
        <a-input placeholder="请输入首字母" v-decorator="ruleConfig.firstLetter"/>
      </st-form-item>
      <st-form-item label="起始编号" required>
        <a-input placeholder="请输入起始编号" v-decorator="ruleConfig.startNum"/>
      </st-form-item>
      <st-form-item label="数量" required>
        <st-input-number placeholder="请输入数量" v-decorator="ruleConfig.num"/>
      </st-form-item>
      <st-form-item label="排列方式" required>
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
    </st-form>
  </st-modal>
</template>
<script>
import { MessageService } from '@/services/message.service'
import { UserService } from '@/services/user.service'
import { AddTemporaryService as AddService } from './add-temporary.service'
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
      form: this.$form.createForm(this)
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
