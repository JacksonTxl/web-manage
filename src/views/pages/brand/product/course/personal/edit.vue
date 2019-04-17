<template>
<st-panel app>
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
          <a-select placeholder="请选择课程类型" v-decorator="formRules.course_type">
            <a-select-option value="2">课程类型A</a-select-option>
            <a-select-option value="1">课程类型B</a-select-option>
          </a-select>
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item label="训练目的" required>
          <a-select placeholder="请选择训练目的" v-decorator="formRules.training_purpose">
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
          <a-textarea type="textarea" :autosize="{ minRows: 10, maxRows: 16 }" placeholder="填写点什么吧"
          maxlength="500"/>
        </st-form-item>
      </a-col>
    </a-row>

    <a-row :gutter="8">
      <a-col :offset="1"
        :lg="22">
        <st-hr></st-hr>
      </a-col>
    </a-row>

    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item label="上课门店" required>
          <a-radio-group :defaultValue="1">
            <a-radio :value="1">全店</a-radio>
            <a-radio :value="2">指定门店</a-radio>
          </a-radio-group>
          <div class="page-shop-coach-container-shop mg-t8">
            <a-table>
            </a-table>
            <st-button type="dashed" block class="mg-t8">添加</st-button>
          </div>
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item label="私教课程">
          <a-input placeholder="课程名称" disabled/>
        </st-form-item>
        <st-form-item label="售价设置" required>
          <a-radio-group :defaultValue="1">
            <a-radio :value="1">售卖场馆自主定价</a-radio>
            <a-radio :value="2">品牌统一定价</a-radio>
          </a-radio-group>
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="2">
        <st-form-item labelOffset class="mg-l24">
          <st-button type="primary" html-type="submit">保存，继续设置上课门店</st-button>
        </st-form-item>
      </a-col>
    </a-row>
  </st-form>
  </st-panel>
</template>
<script>
import { EditService } from './edit.service'
const columns = [
  {
    title: '教练',
    dataIndex: 'name'
    // sorter: true,
    // scopedSlots: { customRender: 'name' }
  },
  {
    title: '教练等级',
    dataIndex: 'gender'
  },
  {
    title: '工作性质',
    dataIndex: 'email'
  },
  {
    title: '在职状态',
    dataIndex: 'emai'
  },
  {
    title: '操作',
    dataIndex: 'em'
  }
]
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
  image: ['image'],
  description: ['description']
}
export default {
  name: 'create-personal-course',
  serviceInject() {
    return {
      editService: EditService
    }
  },
  subscriptions() {
    console.log('sub', this.editService)
    return {
      formData: this.editService.formData$
    }
  },
  data() {
    return {
      columns,
      form: this.$form.createForm(this),
      formRules,
      fileList: [{
        image_id: 10000,
        image_key: 'http://styd-saas-test.oss-cn-shanghai.aliyuncs.com/image/pLOFb5kCPN4gPQ8H'
      }]
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.setFieldsValue()
    })
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
        image: fileList[0]
      })
    },
    setFieldsValue() {
      console.log('set fields', this.formData)
      this.form.setFieldsValue({
        ...this.formData
      })
    }
  }
}
</script>
