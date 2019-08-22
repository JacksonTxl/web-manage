<template>
  <st-modal
    title="新增长期储物柜"
    size="small"
    v-model="show"
    @ok="onSubmit"
    @cancel="onCancel"
    :confirmLoading="loading.add"
  >
    <st-form :form="form" labelWidth="88px">
      <st-form-item label="区域">
        <a-input :value="areaName" disabled />
      </st-form-item>
      <st-form-item label="首字母">
        <a-input
          placeholder="请输入首字母"
          maxlength="1"
          v-decorator="decorators.first_letter"
        />
      </st-form-item>
      <st-form-item label="起始编号" required>
        <a-input-number
          placeholder="请输入起始编号"
          v-decorator="decorators.start_num"
          :min="1"
          :max="9999"
          :precision="0"
          class="full-width"
        />
      </st-form-item>
      <st-form-item label="柜子数量" required>
        <st-input-number placeholder="请输入数量" v-decorator="decorators.num">
          <template slot="addonAfter">
            个
          </template>
        </st-input-number>
      </st-form-item>
      <st-form-item required>
        <template slot="label">
          递增方式
          <st-help-tooltip id="TSCL001" />
        </template>
        <a-radio-group v-decorator="decorators.sort_type">
          <a-radio
            v-for="item in sortType"
            :key="item.value"
            :value="item.value"
          >
            {{ item.label }}
          </a-radio>
        </a-radio-group>
      </st-form-item>
      <st-form-item label="租赁价格" required>
        <st-input-number
          :float="true"
          placeholder="请输入售卖价格"
          v-decorator="decorators.price_num"
        >
          <template slot="addonAfter">
            元/天
          </template>
        </st-input-number>
      </st-form-item>
      <st-form-item label="转让手续费">
        <st-input-number
          :float="true"
          placeholder="请输入转让手续费"
          v-decorator="decorators.transfer_num"
        >
          <template slot="addonAfter">
            <a-select v-model="transferUnit">
              <a-select-option
                v-for="(item, index) in transferUnits"
                :key="index"
                :value="+item.value"
              >
                {{ item.label }}
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
import { AddLongTermService as AddService } from './add-long-term.service'
import { ruleOptions } from './cabinet.config'

export default {
  serviceInject() {
    return {
      messageService: MessageService,
      addService: AddService
    }
  },
  rxState() {
    return {
      loading: this.addService.loading$,
      transferUnits: this.addService.transferUnits$,
      sortType: this.addService.sortType$
    }
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      show: false,
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
      e.preventDefault()
      this.form.validate().then(data => {
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
