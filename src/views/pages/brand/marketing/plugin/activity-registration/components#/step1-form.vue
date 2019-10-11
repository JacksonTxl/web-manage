<template>
  <st-form :form="form">
    <st-form-item label="活动标题" required>
      <a-input v-decorator="decorators.name"></a-input>
    </st-form-item>
    <st-form-item label="活动时间" required>
      <a-range-picker />
    </st-form-item>
    <st-form-item label="活动地点" required>
      <map-button></map-button>
    </st-form-item>
    <st-form-item label="活动海报" required>
      <st-image-upload
        width="96px"
        height="96px"
        :list="fileShareList"
        @change="onShareChangeGetAvatar"
        placeholder="上传图片"
      ></st-image-upload>
      <span>
        请上传jbg、png格式的图片
      </span>
    </st-form-item>
    <st-form-item label="活动人数" required>
      <a-input
        placeholder="若不限制活动人数，请填写0"
        v-decorator="decorators.address"
      ></a-input>
    </st-form-item>
    <st-form-item label="活动详情" required>
      <st-editor></st-editor>
    </st-form-item>
    <!-- <st-form-item label="活动海报" required>
      <a-input></a-input>
    </st-form-item>
    <st-form-item label="活动人数" required>
      <a-input></a-input>
    </st-form-item>
    <st-form-item label="活动详情" required>
      <a-input></a-input>
    </st-form-item> -->
  </st-form>
</template>

<script>
import { ruleOptions } from './form.config'
import { PatternService } from '@/services/pattern.service'
import MapButton from '@/views/biz-components/map-button/map-button'
import StEditor from '@/views/biz-components/editor/editor'
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
          that.$emit('change', that.form.getFieldsValue())
        })
      }
    })
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      formInfo: {},
      decorators,
      fileShareList: []
    }
  },
  components: {
    MapButton,
    StEditor
  },
  methods: {
    onShareChangeGetAvatar(imageFiles) {
      this.fileShareList = cloneDeep(imageFiles)
    }
  }
}
</script>
