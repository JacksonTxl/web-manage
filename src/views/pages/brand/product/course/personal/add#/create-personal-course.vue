<template>
  <st-form :form="form" class="page-create-container" labelWidth="130px">
    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item v-show="false">
          <input type="hidden" v-decorator="formRules.course_id"/>
        </st-form-item>
        <st-form-item label="课程名称" required>
          <a-input placeholder="支持输入4~30个字的课程名称" maxlength="30"
          v-decorator="formRules.course_name" @change="onCourseNameChange"/>
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item label="课程类型" required>
          <input type="hidden" v-decorator="formRules.category_id">
          <st-select-course-type @change="onCourseTypeChange"/>
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item label="训练目的" required>
          <input type="hidden" v-decorator="formRules.train_aim">
          <st-select-training-aim @change="onTrainingAimChange"/>
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item label="课程时长" required>
          <a-input-number :min="0" v-decorator="formRules.duration">
            <div slot="addonAfter" class="st-form-item-unit">分钟</div>
          </a-input-number>
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item label="是否支持在线购买" required>
          <a-radio-group v-decorator="formRules.is_online_sale">
            <a-radio v-for="(item, index) in personalCourseEnums.is_online_sale.value"
              :key="+index" :value="+index">{{item}}
            </a-radio>
          </a-radio-group>
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item label="参考定价">
          <a-input-number :min="0" v-decorator="formRules.price">
            <div slot="addonAfter" class="st-form-item-unit">元/节</div>
          </a-input-number>
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item label="课有效期">
          <a-input-number :min="0" v-decorator="formRules.effective_unit">
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
          <st-button type="primary" @click="save" :loading="loading.addPersonalBrand">保存，继续设置上课门店</st-button>
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
import { UserService } from '@/services/user.service'
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
  is_online_sale: [
    'is_online_sale', {
      rules: [{
        required: true,
        message: '请选择是否支持在线购买'
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
  image: [
    'image', {
      initialValue: {}
    }
  ],
  description: [
    'description', {
      initialValue: ''
    }
  ]
}
export default {
  name: 'create-personal-course',
  serviceInject() {
    return {
      addService: AddService,
      messageService: MessageService,
      userService: UserService
    }
  },
  rxState() {
    const user = this.userService
    return {
      loading: this.addService.loading$,
      personalCourseEnums: user.personalCourseEnums$
    }
  },
  components: {
    StSelectCourseType,
    StSelectTrainingAim
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
        data.course_id = 0
        console.log('step 1 data', data)
        this.addService.addPersonalBrand(data).subscribe((res) => {
          this.messageService.success({
            content: '提交成功'
          })
          this.$emit('goNext', res.course_id)
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
    },
    onCourseNameChange(e) {
      this.$emit('onCourseNameChange', e.target.value)
    }
  }
}
</script>
