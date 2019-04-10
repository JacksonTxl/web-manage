<template>
  <div>
    <st-panel app>
      <div class="page-brand-setting">
        <a-row :gutter="8">
          <a-col :span="10" :push="7">
            <st-form :form="form">
              <st-form-item label="品牌logo">
                <input type="hidden" v-decorator="brandRules.image_url">
                <file-upload :list="fileList" width="100px" height="100px" @change="onImgChange"></file-upload>
              </st-form-item>
              <st-form-item label="品牌名称">
                <a-input placeholder="请输入品牌名称" v-decorator="brandRules.brand_name" disabled></a-input>
              </st-form-item>
              <st-form-item label="品牌介绍">
                <a-textarea placeholder="请输入品牌介绍" v-decorator="brandRules.description"
                  maxlength="300" style="height: 180px">
                </a-textarea>
              </st-form-item>
              <st-form-item label="联系人">
                <a-input placeholder="请输入联系人" v-decorator="brandRules.staff_name" disabled></a-input>
              </st-form-item>
              <st-form-item label="联系电话">
                <a-input placeholder="请输入联系电话" v-decorator="brandRules.mobile" disabled></a-input>
              </st-form-item>
            </st-form>
          </a-col>
        </a-row>
        <a-row :gutter="8">
          <a-col :offset="7">
            <st-form-item labelFix>
              <st-button type="primary" class="st-btn__save" @click="onSave">保存</st-button>
            </st-form-item>
          </a-col>
        </a-row>
      </div>
    </st-panel>
  </div>
</template>
<script>
import { imgFilter } from '@/filters/resource.filters'
import { MessageService } from '@/services/message.service'
import { EditService } from './edit.service'
const brandRules = {
  image_url: ['image_url'],
  brand_name: ['brand_name'],
  description: [
    'description', {
      rules: [{
        message: '请输入品牌介绍'
      }]
    }
  ],
  staff_name: ['staff_name'],
  mobile: ['mobile']
}
export default {
  serviceInject() {
    return {
      editService: EditService,
      messageService: MessageService
    }
  },
  data() {
    return {
      form: this.$form.createForm(this),
      brandRules,
      fileList: [{
        image_id: 10000,
        image_key: 'http://styd-saas-test.oss-cn-shanghai.aliyuncs.com/image/pLOFb5kCPN4gPQ8H'
      }]
    }
  },
  subscriptions() {
    return {
      brand: this.editService.brand$
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.setFieldsValue()
    })
  },
  methods: {
    onSave(e) {
      e.preventDefault()
      this.form.validateFields().then(() => {
        const data = this.form.getFieldsValue()
        this.editService.saveBrandInfo(data).subscribe(res => {
          this.messageService.success({
            content: '提交成功'
          })
        })
      })
    },
    setFieldsValue() {
      this.editService.brand$.subscribe(brand => {
        this.form.setFieldsValue({
          ...brand
        })
      })
    },
    onImgChange(fileList) {
      this.form.setFieldsValue({
        image_url: fileList[0]
      })
    }
  }
}
</script>
