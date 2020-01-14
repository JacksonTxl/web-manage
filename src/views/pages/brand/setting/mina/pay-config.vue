<template>
  <st-panel app :class="pay()">
    <div :class="pay('shadowbox')">
      <div :class="pay('skip')" @click="skip">
        跳过，下次配置
        <st-icon type="right-small" size="14px"></st-icon>
      </div>
      <st-form :form="form">
        <st-form-item label="商户名称" required>
          <a-input placeholder="请输入" v-decorator="payConfig.mch_name" />
          <a
            class="fz12"
            target="_blank"
            href="https://help.styd.cn/docs/merchant_name.html"
          >
            如何获取微信商户名称？
          </a>
        </st-form-item>
        <st-form-item label="微信商户号" required>
          <a-input placeholder="请输入" v-decorator="payConfig.mch_id" />
          <a
            class="fz12"
            target="_blank"
            href="https://help.styd.cn/docs/merchant_number.html"
          >
            如何获取微信商户号？
          </a>
        </st-form-item>
        <st-form-item label="API密钥" required>
          <a-input placeholder="请输入" v-decorator="payConfig.key" />
          <a
            class="fz12"
            target="_blank"
            href="https://help.styd.cn/docs/merchant_secretkey.html"
          >
            如何取微信商户API密钥？
          </a>
        </st-form-item>
        <st-form-item label="证书">
          <pem-upload-component
            @success="uploadPemSuccess"
          ></pem-upload-component>
          <a-input v-show="false" v-decorator="payConfig.cert_pem" />
          <div class="fz12">
            仅支持.pem格式文件，大小不超过5M，
            <a
              target="_blank"
              href="https://help.styd.cn/docs/api_certificate.html"
            >
              如何获取证书？
            </a>
          </div>
        </st-form-item>
        <st-form-item label="证书秘钥">
          <pem-upload-component
            @success="uploadSecretKeySuccess"
          ></pem-upload-component>
          <a-input v-show="false" v-decorator="payConfig.key_pem" />
          <div class="fz12">
            仅支持.pem格式文件，大小不超过5M，
            <a
              href="https://help.styd.cn/docs/api_certificate.html"
              target="_blank"
            >
              如何获取证书秘钥？
            </a>
          </div>
        </st-form-item>
        <st-form-item labelFix>
          <st-button @click="back" :class="pay('back')">上一步</st-button>
          <st-button type="primary" @click="save">提交</st-button>
        </st-form-item>
      </st-form>
    </div>
  </st-panel>
</template>

<script>
import { PayConfigService } from './pay-config.service'
import PemUploadComponent from './components#/pem-upload.component'
export default {
  bem: {
    pay: 'brand-setting-mina-pay-config'
  },
  serviceInject() {
    return {
      payConfigService: PayConfigService
    }
  },
  components: {
    PemUploadComponent
  },
  data() {
    return {
      form: this.$form.createForm(this),
      payConfig: {
        mch_name: [
          'mch_name',
          {
            rules: [
              {
                required: true,
                message: '请填写商户名称'
              }
            ]
          }
        ],
        mch_id: [
          'mch_id',
          {
            rules: [
              {
                required: true,
                message: '请填写微信商户号'
              }
            ]
          }
        ],
        key: [
          'key',
          {
            rules: [
              {
                required: true,
                message: '请填写API密钥'
              }
            ]
          }
        ],
        cert_pem: ['cert_pem'],
        key_pem: ['key_pem']
      }
    }
  },
  methods: {
    uploadPemSuccess(key) {
      this.form.setFieldsValue({
        cert_pem: key
      })
    },
    uploadSecretKeySuccess(key) {
      this.form.setFieldsValue({
        key_pem: key
      })
    },
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
    },
    back() {
      this.$router.back()
    },
    skip() {
      this.$router.push({
        name: 'brand-setting-mina-index'
      })
    }
  }
}
</script>
