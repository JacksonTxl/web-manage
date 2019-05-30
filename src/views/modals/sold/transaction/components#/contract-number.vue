<template>
  <st-form-item label="合同编号" labelGutter="12px">
    <div :class="transfer('contract')">
      <a-input placeholder="请输入合同编号" v-decorator="value.contract_number"></a-input>
      <st-button class="create-button" @click="onCodeNumber">自动生成</st-button>
    </div>
  </st-form-item>
</template>

<script>
import { TransferService } from '../transfer.service'
export default {
  serviceInject() {
    return {
      transferService: TransferService
    }
  },
  bem: {
    transfer: 'modal-sold-course-transfer'
  },
  model: {
    prop: 'value',
    event: 'valueChange'
  },
  props: ['value', 'form'],
  data() {
    return {}
  },
  methods: {
    onCodeNumber() {
      let slef = this
      this.transferService.getCodeNumber(`4`).subscribe(res => {
        this.form.setFieldsValue({ contract_number: res.info.code })
      })
    }
  }
}
</script>
