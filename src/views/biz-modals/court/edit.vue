<template>
  <st-modal
    title="编辑场地"
    v-model="show"
    wrapClassName="modal-court-add"
    :footer="null"
  >
    <st-form :form="form" labelWidth="68px" labelGutter="16px">
      <st-form-item label="场地名称" required>
        <a-input
          placeholder="请输入场地名称，不超过10个字"
          maxlength="10"
          v-decorator="decorators.area_name"
        />
      </st-form-item>
      <st-form-item label="场地属性" v-if="info.area_type === 3">
        <span>大门</span>
      </st-form-item>
      <st-form-item label="场地属性" required v-else>
        <a-radio-group @change="onChooseRadio" v-decorator="rules.areaType">
          <a-radio
            v-for="(item, index) in areaType"
            :value="item.value"
            :key="index"
          >
            {{ item.label }}
          </a-radio>
        </a-radio-group>
      </st-form-item>
      <st-form-item label="容纳人数" v-if="info.area_type !== 3">
        <st-input-number
          placeholder="请输入最大容纳人数，1-999"
          :min="1"
          :max="999"
          v-decorator="decorators.contain_number"
        />
      </st-form-item>
    </st-form>
    <div class="ta-r">
      <st-button type="primary" :loading="loading.update" @click="onSubmit">
        保存
      </st-button>
    </div>
  </st-modal>
</template>

<script>
import { EditService } from './edit.service'
import { MessageService } from '@/services/message.service'
import { ruleOptions } from './court.config'

export default {
  serviceInject() {
    return {
      editService: EditService,
      messageService: MessageService
    }
  },
  rxState() {
    return {
      info: this.editService.info$,
      loading: this.editService.loading$,
      areaType: this.editService.areaType$
    }
  },
  props: {
    id: {
      type: [Number, String],
      default: 0
    }
  },
  computed: {
    rules
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
  mounted() {
    this.editService.getInfo(this.id).subscribe(this.setFieldsValue)
    this.areaType = this.areaType.filter(({ value }) => {
      return value !== 3
    })
  },
  methods: {
    setFieldsValue() {
      const info = this.info
      this.form.setFieldsValue({
        is_vip: +info.is_vip,
        area_name: info.area_name,
        area_type: info.area_type,
        contain_number: info.contain_number
      })
    },
    onSubmit(e) {
      e.preventDefault()
      this.form.validateFields().then(values => {
        const data = this.getData()
        this.editService.update(data).subscribe(this.onSubmitSuccess)
      })
    },
    onCancel() {
      this.show = false
    },
    getData() {
      const data = this.form.getFieldsValue()
      data.id = this.id
      data.area_type = this.info.area_type
      return data
    },
    onChooseRadio(e) {
      this.info.area_type = e.target.value
    },
    onSubmitSuccess() {
      this.messageService.success({
        content: '保存成功'
      })
      this.$emit('change')
      this.show = false
    }
  }
}
</script>
