<template>
  <st-modal
    title="批量修改价格"
    size="small"
    v-model="show"
    @ok="onSubmit"
    @cancel="onCancel"
    :confirmLoading="loading.updatePrice"
  >
    <st-form :form="form" labelWidth="80px">
      <st-form-item label="价格" required>
        <st-input-number
          placeholder="请输入售卖价格"
          v-decorator="decorators.price_num"
        >
          <template slot="addonAfter">
            元/天
          </template>
        </st-input-number>
      </st-form-item>
      <st-form-item label="转让手续费">
        <st-input-number placeholder="" v-decorator="decorators.transfer_num">
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
        <div class="mg-t8">
          <i class="color-danger">*</i>
          已经售卖的储物柜不受影响
        </div>
      </st-form-item>
    </st-form>
  </st-modal>
</template>
<script>
import { MessageService } from '@/services/message.service'
import { EditPriceService as EditService } from './edit-price.service'
import { ruleOptions } from './cabinet.config'

export default {
  serviceInject() {
    return {
      messageService: MessageService,
      editService: EditService
    }
  },
  rxState() {
    return {
      loading: this.editService.loading$,
      transferUnits: this.editService.transferUnits$
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
    ids: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    onSubmit(e) {
      e.preventDefault()
      this.form.validate().then(data => {
        data.ids = this.ids
        data.transfer_unit = this.transferUnit
        this.editService.updatePrice(data).subscribe(this.onSubmitSuccess)
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
