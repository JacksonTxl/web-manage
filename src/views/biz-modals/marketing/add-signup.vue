<template>
  <st-modal :title="modalTitle" width="500px" v-model="show">
    <div class="modal-marketing-add-ticket">
      <st-form :form="form" labelWidth="66px">
        <st-form-item label="报名标题">
          <a-input
            placeholder="请输入报名标题"
            v-decorator="decorators.extra_name"
          ></a-input>
        </st-form-item>
        <st-form-item label="报名类型">
          <a-radio-group v-decorator="decorators.extra_type">
            <a-radio :value="1">单行文本</a-radio>
            <a-radio :value="2">多行文本</a-radio>
            <a-radio :value="3">单选</a-radio>
            <a-radio :value="4">多选</a-radio>
          </a-radio-group>
        </st-form-item>
        <st-form-item label="报名选项">
          <a-input-group compact>
            <a-input
              v-model="option"
              style="width: 80%"
              placeholder="请填写报名选项"
            />
            <st-button @click="onCLickGetOption">添加</st-button>
          </a-input-group>
        </st-form-item>
        <st-form-item label="是否必填">
          <a-radio-group v-decorator="decorators.extra_require">
            <a-radio :value="1">是</a-radio>
            <a-radio :value="2">否</a-radio>
          </a-radio-group>
        </st-form-item>
      </st-form>
    </div>
    <template slot="footer">
      <st-button @click="show = false">取消</st-button>
      <st-button @click="onSubmit" type="primary">
        确定
      </st-button>
    </template>
  </st-modal>
</template>
<script>
import { ruleOptions } from './add-signup.config'
import { PatternService } from '@/services/pattern.service'
export default {
  name: 'ModalAddTicket',
  bem: {
    bModal: 'modal-marketing-add-ticket'
  },
  serviceInject() {
    return {
      pattern: PatternService
    }
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      show: false,
      ticketType: 1,
      isBulk: 1,
      option: '',
      extra_info: [],
      radioStyle: {
        display: 'block'
      }
    }
  },
  props: {
    modalTitle: {
      type: String,
      default: '票种信息设置'
    }
  },
  computed: {
    freeTicket() {
      return this.ticketType === 2
    }
  },
  methods: {
    onCLickGetOption() {
      if (!this.extra_info.includes(this.option)) {
        this.extra_info.push(this.option)
      }
    },
    onSubmit() {
      this.form.validate().then(values => {
        this.show = false
        const obj = {
          extra_name: values.extra_name,
          extra_require: values.extra_require,
          extra_info: this.extra_info,
          ...values
        }
        this.$emit('submit', obj)
      })
    },
    onChangeGetTicketType(e) {
      this.ticketType = e.target.value
      if (this.freeTicket) {
        this.form.setFieldsValue({ ticket_price: 0 })
      }
    }
  }
}
</script>
