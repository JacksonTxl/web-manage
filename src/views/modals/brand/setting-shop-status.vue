<template>
  <st-modal
    title="更改运营状态"
    v-model="show"
    size="small"
    @ok="onSubmit"
    @cancel="onCancel"
    :confirmLoading="loading.update"
  >
    <div>
      <st-form :form="form">
        <a-row>
          <a-col :xs="22">
            <div>{{shopName}}</div>
            <st-form-item v-show="false">
              <input type="hidden" v-decorator="formRules.id">
            </st-form-item>
            <st-form-item label="运营状态" required class="mg-t16">
              <a-select v-decorator="formRules.shopStatus" style="width: 240px">
                <a-select-option
                  v-for="(item, index) in shopStatusList"
                  :key="index"
                  :value="+index"
                >
                  {{item}}
                </a-select-option>
              </a-select>
            </st-form-item>
          </a-col>
        </a-row>
      </st-form>
    </div>
  </st-modal>
</template>
<script>
import { UserService } from '@/services/user.service'
import { ShopStatusService as EditService } from './setting-shop-status.service'
import { MessageService } from '@/services/message.service'
const formRules = {
  id: ['id'],
  shopStatus: [
    'shop_status', {
      rules: [{
        required: true,
        message: '请选择运营状态'
      }]
    }
  ]
}
export default {
  serviceInject() {
    return {
      userService: UserService,
      editService: EditService,
      messageService: MessageService
    }
  },
  rxState() {
    return {
      shopEnums: this.userService.shopEnums$,
      loading: this.editService.loading$
    }
  },
  props: {
    shopId: {
      type: [Number, String],
      default: 0
    },
    shopStatus: {
      type: Number,
      default: 0
    },
    shopName: {
      type: String,
      default: ''
    }
  },
  computed: {
    shopStatusList() {
      return this.shopEnums.shop_status.value || {}
    },
    isValidList() {
      return this.shopEnums.is_valid.value || {}
    }
  },
  data() {
    return {
      show: true,
      formRules
    }
  },
  created() {
    this.form = this.$form.createForm(this)
  },
  mounted() {
    this.$nextTick(() => {
      this.form.setFieldsValue({
        id: this.shopId,
        shop_status: this.shopStatus
      })
    })
  },
  methods: {
    onSubmit(e) {
      e.preventDefault()
      this.form.validateFields().then(() => {
        const data = this.form.getFieldsValue()
        /**
         * 修改门店运营状态为暂停营业（3），需二次确认
         */
        if (data.shop_status === 3) {
          this.$confirm({
            title: '',
            content: '门店暂停营业后，门店会员无法正常约课、上课、入离场；同时此门店不支持交易开单，请谨慎操作',
            onOk: () => {
              this.doSubmit(data)
            }
          })
        } else {
          this.doSubmit(data)
        }
      })
    },
    doSubmit(data) {
      this.editService.update(data).subscribe(this.onSubmitSuccess)
    },
    onSubmitSuccess() {
      this.messageService.success({
        content: '更改成功'
      })
      this.$emit('change')
      this.show = false
    },
    onCancel() {
      this.show = false
    }
  }
}
</script>
