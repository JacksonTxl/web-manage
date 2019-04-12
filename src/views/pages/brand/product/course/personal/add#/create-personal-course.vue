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
          <a-select placeholder="请选择课程类型" v-decorator="formRules.category_id">
            <a-select-option value="2">课程类型A</a-select-option>
            <a-select-option value="1">课程类型B</a-select-option>
          </a-select>
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item label="训练目的" required>
          <a-select placeholder="请选择训练目的" v-decorator="formRules.train_aim">
            <a-select-option value="2">训练目的A</a-select-option>
            <a-select-option value="1">训练目的B</a-select-option>
          </a-select>
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item label="课程时长" required>
          <a-input v-decorator="formRules.duration">
            <div slot="addonAfter" class="st-form-item-unit">分钟</div>
          </a-input>
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item label="参考定价">
          <a-input v-decorator="formRules.price">
            <div slot="addonAfter" class="st-form-item-unit">元/节</div>
          </a-input>
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item label="课有效期">
          <a-input v-decorator="formRules.unit_valid_days">
            <div slot="addonAfter" class="st-form-item-unit">天/节</div>
          </a-input>
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item label="图片" >
          <div class="page-upload-container">
            <st-image-upload :list="fileList" @change="onImgChange"></st-image-upload>
            <input type="hidden" v-decorator="formRules.image_id">
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
import { AddService } from '../add.service'
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
  category_id: [
    'category_id', {
      rules: [{
        required: true,
        message: '请选择课程类型'
      }]
    }
  ],
  train_aim: [
    'train_aim', {
      rules: [{
        required: true,
        message: '请选择训练目的'
      }]
    }
  ],
  duration: [
    'duration', {
      rules: [{
        required: true,
        message: '请输入课程时长'
      }]
    }
  ],
  price: [
    'price', {
      rules: []
    }
  ],
  unit_valid_days: [
    'unit_valid_days', {
      rules: [],
      initialValue: 7
    }
  ],
  image_id: ['image_id']
}
export default {
  name: 'create-personal-course',
  serviceInject() {
    return {
      addService: AddService
    }
  },
  subscriptions() {
  },
  data() {
    return {
      form: this.$form.createForm(this),
      formRules,
      fileList: []
    }
  },
  methods: {
    save(e) {
      e.preventDefault()
      this.form.validateFields().then(() => {
        const data = this.form.getFieldsValue()
        console.log('step 1 data', data)
        this.addService.addPersonalBrand(data).subscribe(() => {
          this.$emit('goNext')
        })
      })
    },
    onImgChange(fileList) {
      this.form.setFieldsValue({
        image_id: fileList[0]
      })
    }
  }
}
</script>
