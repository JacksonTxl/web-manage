<template>
  <st-form :form="form" @submit="save" class="page-create-container">
    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item label="课程名称" required>
          <a-input placeholder="支持输入4~30个字的课程名称" maxlength="30" v-decorator="formRules.course_name"/>
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item label="课程类型" required>
          <a-select placeholder="请选择" v-decorator="formRules.course_type">
            <a-select-option value="2">课程类型A</a-select-option>
            <a-select-option value="1">课程类型B</a-select-option>
          </a-select>
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item label="训练目的" required>
          <a-select placeholder="请选择" v-decorator="formRules.training_purpose">
            <a-select-option value="2">训练目的A</a-select-option>
            <a-select-option value="1">训练目的B</a-select-option>
          </a-select>
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item label="课程时长" required>
          <a-input v-decorator="formRules.course_length">
            <div slot="addonAfter" class="st-form-item-unit">分钟</div>
          </a-input>
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item label="参考定价" required>
          <a-input v-decorator="formRules.course_price">
            <div slot="addonAfter" class="st-form-item-unit">元/节</div>
          </a-input>
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item label="图片" >
          <div class="page-upload-container">
            <file-upload :list="fileList" @change="onImgChange"></file-upload>
            <input type="hidden" v-decorator="formRules.course_image">
            <div class="page-course-photo-des mg-l16">
              <div class="page-course-item">
                <div class="page-course-item-tip">1.</div>
                <div class="page-course-item-cont">图片格式必须为：png,bmp, jpeg,jpg,gif,建议使用png格式图片，以保存最佳效果</div>
              </div>
              <div class="page-course-item">
                <div class="page-course-item-tip">2.</div>
                <div class="page-course-item-cont">建议尺寸为?px * ?px， 不可大于2M</div>
              </div>
            </div>
          </div>
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item label="课程介绍">
          <a-textarea type="textarea" :autosize="{ minRows: 10, maxRows: 16 }" placeholder="填写点什么吧"
           maxlength="500"/>
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item labelFix>
          <st-button type="primary" html-type="submit">保存，继续设置上课门店</st-button>
        </st-form-item>
      </a-col>
    </a-row>
  </st-form>
</template>
<script>
const formRules = {
  course_name: [
    'course_name', {
      rules: [{
        required: true,
        message: '请输入课程名称'
      }, {
        min: 4,
        message: '支持输入4~30个字的课程名称'
      }]
    }
  ],
  course_type: [
    'course_type', {
      rules: [{
        required: true,
        message: '请选择课程类型'
      }]
    }
  ],
  training_purpose: [
    'training_purpose', {
      rules: [{
        required: true,
        message: '请选择训练目的'
      }]
    }
  ],
  course_length: [
    'course_length', {
      rules: [{
        required: true,
        message: '请输入课程时长'
      }]
    }
  ],
  course_price: [
    'course_price', {
      rules: [{
        required: true,
        message: '请输入参考定价'
      }]
    }
  ],
  course_image: ['course_image']
}
export default {
  name: 'create-personal-course',
  data() {
    return {
      form: this.$form.createForm(this),
      formRules,
      fileList: [{
        image_id: 10000,
        image_key: 'http://styd-saas-test.oss-cn-shanghai.aliyuncs.com/image/pLOFb5kCPN4gPQ8H'
      }]
    }
  },
  methods: {
    save(e) {
      e.preventDefault()
      this.form.validateFields().then(() => {
        const data = this.form.getFieldsValue()
        console.log('step 1 data', data)
        this.$emit('goNext')
      })
    },
    onImgChange(fileList) {
      this.form.setFieldsValue({
        course_image: fileList[0]
      })
    }
  }
}
</script>
