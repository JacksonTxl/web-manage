<template>
  <div :class="pay()">
    <st-panel>
      <div :class="pay('shadowbox')">
        <st-form :form="form">
          <st-form-item label="商户名称" required>
            <a-input placeholder="请输入" v-decorator="payConfig.mch_name" />
          </st-form-item>
          <st-form-item label="微信商户号" required>
            <a-input placeholder="请输入" v-decorator="payConfig.mch_id" />
          </st-form-item>
          <st-form-item label="API密钥" required>
            <a-input placeholder="请输入" v-decorator="payConfig.key" />
          </st-form-item>
          <st-form-item labelFix>
            <st-button type="primary" @click="save">提交</st-button>
          </st-form-item>
        </st-form>
      </div>
    </st-panel>
  </div>
</template>

<script>
import {
  PayConfigService
} from './pay-config.service'
export default {
  bem: {
    pay: 'brand-setting-mina-pay-config'
  },
  serviceInject() {
    return {
      payConfigService: PayConfigService
    }
  },
  data() {
    return {
      form: this.$form.createForm(this),
      payConfig: {
        mch_name: ['mch_name',
          {
            rules: [{
              required: true,
              message: '请填写商户名称'
            }]
          }
        ],
        mch_id: ['mch_id',
          {
            rules: [{
              required: true,
              message: '请填写微信商户号'
            }]
          }
        ],
        key: ['key',
          {
            rules: [{
              required: true,
              message: '请填写API密钥'
            }]
          }
        ]
      }
    }
  },
  methods: {
    save() {
      let self = this
      this.form.validateFields((err, values) => {
        if (!err) {
          self.payConfigService.saveMch(values).subscribe(() => {
            self.$router.push({
              path: '/brand/setting/mina/auth-callback?type=payConfig'
            })
          })
        }
      })
    }
  }
}

</script>
