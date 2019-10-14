<template>
  <a-row>
    <a-col :lg="14">
      <st-form :form="form">
        <st-form-item label="活动标题" required>
          <a-input v-decorator="decorators.name"></a-input>
        </st-form-item>
        <st-form-item label="活动时间" required>
          <a-range-picker
            v-decorator="decorators.date"
            :showTime="{ format: 'HH:mm' }"
            format="YYYY-MM-DD HH:mm"
            style="width: 100%"
          />
        </st-form-item>
        <st-form-item label="活动地点" required>
          <map-button
            addText="设置活动地点"
            :province="address.province"
            :city="address.city"
            :district="address.district"
            :address="address.address"
            @select="onSelectGetAddress"
          ></map-button>
        </st-form-item>
        <st-form-item label="活动海报" required>
          <st-image-upload
            width="96px"
            height="96px"
            :list="fileShareList"
            @change="onShareChangeGetImage"
            placeholder="上传图片"
          ></st-image-upload>
          <span>
            请上传jbg、png格式的图片
          </span>
        </st-form-item>
        <st-form-item label="活动人数" required>
          <a-input
            placeholder="若不限制活动人数，请填写0"
            v-decorator="decorators.member_limit_status"
          ></a-input>
        </st-form-item>
        <st-form-item label="活动详情" required>
          <st-editor v-model="content"></st-editor>
        </st-form-item>
      </st-form>
    </a-col>
    <a-col :lg="10"></a-col>
  </a-row>
</template>

<script>
import { ruleOptions } from './form.config'
import { PatternService } from '@/services/pattern.service'
import MapButton from '@/views/biz-components/map-button/map-button'
import StEditor from '@/views/biz-components/editor/editor'
import moment from 'moment'
export default {
  name: 'Step1Form',
  serviceInject() {
    return {
      pattern: PatternService
    }
  },
  data() {
    const that = this
    const form = this.$stForm.create({
      onValuesChange(props, values) {
        console.log(values)
        that.$nextTick().then(() => {
          that.formInfo = { ...that.formInfo, ...that.form.getFieldsValue() }
          that.$emit('change', that.formInfo)
        })
      }
    })
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      formInfo: {},
      decorators,
      fileShareList: [],
      address: '',
      content: ''
    }
  },
  components: {
    MapButton,
    StEditor
  },
  watch: {
    content(newValue, oldValue) {
      console.log(newValue)
      this.$set(this.formInfo, 'content', newValue)
      this.$emit('change', this.formInfo)
    }
  },
  methods: {
    moment,
    onShareChangeGetImage(imageFiles) {
      this.$set(this.formInfo, 'imageUrl', imageFiles[0].image_url)
      this.$emit('change', this.formInfo)
      this.fileShareList = cloneDeep(imageFiles)
    },
    onSelectGetAddress(address) {
      this.$set(this.formInfo, 'address', address.address)
      this.$emit('change', this.formInfo)
      this.address = address
    }
  }
}
</script>
