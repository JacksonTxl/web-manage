<template>
  <st-form :form="form" class="page-create-container">
    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item v-show="false">
          <input type="hidden" v-decorator="formRules.course_id"/>
        </st-form-item>
        <st-form-item label="课程名称" required>
          <a-input placeholder="支持输入4~30个字的课程名称" maxlength="30"
          v-decorator="formRules.course_name"/>
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item label="课程类型" required>
          <input type="hidden" v-decorator="formRules.category_id">
          <st-select-course-type :checkedId="info.category_id" @change="onCourseTypeChange"/>
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item label="训练目的" required>
          <input type="hidden" v-decorator="formRules.train_aim">
          <st-select-training-aim :checkedIds="info.train_aim"  @change="onTrainingAimChange"/>
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item label="课程时长" required>
          <a-input-number v-decorator="formRules.duration">
            <div slot="addonAfter" class="st-form-item-unit">分钟</div>
          </a-input-number>
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item label="参考定价">
          <a-input-number v-decorator="formRules.price">
            <div slot="addonAfter" class="st-form-item-unit">元/节</div>
          </a-input-number>
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item label="课有效期">
          <a-input-number v-decorator="formRules.effective_unit">
            <div slot="addonAfter" class="st-form-item-unit">天/节</div>
          </a-input-number>
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item label="图片" >
          <div class="page-upload-container">
            <st-image-upload :list="fileList" @change="onImgChange"></st-image-upload>
            <input type="hidden" v-decorator="formRules.image">
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
          <a-textarea type="textarea" v-decorator="formRules.description"
           :autosize="{ minRows: 10, maxRows: 16 }" placeholder="填写点什么吧"
           maxlength="500"/>
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item labelFix>
          <st-button type="primary" @click="save">保存，继续设置上课门店</st-button>
        </st-form-item>
      </a-col>
    </a-row>
  </st-form>
</template>

<script>
import { AddService } from '../add.service'
import { MessageService } from '@/services/message.service'
import StSelectCourseType from '@/views/fragments/course/select-course-type'
import StSelectTrainingAim from '@/views/fragments/course/select-training-aim'
const formRules = {
  course_id: ['course_id'],
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
  effective_unit: [
    'effective_unit', {
      rules: [],
      initialValue: 7
    }
  ],
  image: ['image'],
  description: ['description']
}
export default {
  name: 'create-personal-course',
  serviceInject() {
    return {
      addService: AddService,
      messageService: MessageService
    }
  },
  subscriptions() {
  },
  components: {
    StSelectCourseType,
    StSelectTrainingAim
  },
  props: {
    info: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      form: this.$form.createForm(this),
      formRules,
      fileList: []
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.form.setFieldsValue({
        ...this.info
      })
    })
  },
  methods: {
    save(e) {
      e.preventDefault()
      this.form.validateFields().then(() => {
        const data = this.form.getFieldsValue()
        console.log('step 1 data', data)
        this.addService.addPersonalBrand(data).subscribe(() => {
          this.messageService.success({
            content: '提交成功'
          })
          this.$emit('goNext', {
            course_name: data.course_name
          })
        })
      })
    },
    onImgChange(fileList) {
      this.form.setFieldsValue({
        image: fileList[0]
      })
    },
    onCourseTypeChange(category_id) {
      console.log('change', category_id)
      this.form.setFieldsValue({
        category_id
      })
    },
    onTrainingAimChange(train_aim) {
      console.log('change', train_aim)
      this.form.setFieldsValue({
        train_aim
      })
    }
  }
}
</script>
