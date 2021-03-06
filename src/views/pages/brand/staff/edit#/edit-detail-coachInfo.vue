<template>
  <st-form :form="form" @submit="save" class="page-edit-coachInfo">
    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item label="从业时间">
          <a-date-picker
            style="width:100%"
            v-decorator="decorators.employment_time"
          />
        </st-form-item>
        <st-form-item label="擅长的项目">
          <a-select
            mode="multiple"
            placeholder="请选择擅长的项目"
            v-decorator="decorators.specialty_id"
          >
            <a-select-option
              :key="item.id"
              :value="item.id"
              v-for="item in staffSpecialty"
            >
              {{ item.specialty_name }}
            </a-select-option>
          </a-select>
        </st-form-item>
        <st-form-item label="专业认证">
          <a-input
            placeholder="请输入专业证书名称"
            v-decorator="decorators.certification_name"
            style="top: 0;"
          >
            <div
              slot="addonAfter"
              @click="onAddProfess"
              class="add-profess-button"
              v-if="coachInfoData.certification_name.length < 10"
            >
              添加
            </div>
          </a-input>
          <div class="add-profess-card">
            <div
              v-for="(item, index) in coachInfoData.certification_name"
              :key="index"
            >
              <span>{{ item }}</span>
              <st-icon
                type="anticon:close"
                @click="onProfessRule(index)"
                style="cursor:pointer;"
              ></st-icon>
            </div>
          </div>
        </st-form-item>
        <st-form-item label="个人经历">
          <st-textarea
            :maxlength="500"
            :rows="10"
            v-decorator="decorators.introduction"
            placeholder="填写点什么吧"
          />
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="24" :xs="22" :offset="1">
        <st-form-item label="员工风采" class="page-image-personal">
          <st-image-upload
            width="100px"
            height="100px"
            :list="image_personal"
            :sizeLimit="2"
            @change="onChangeGetShowImage"
            placeholder="上传照片"
            :numLimit="10"
          ></st-image-upload>
        </st-form-item>
        <st-form-item label="对外展示">
          <a-checkbox :checked="checked" @change="checkShow">
            展示在会员端
          </a-checkbox>
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :offset="1">
        <st-form-item labelFix>
          <st-button type="primary" class="mg-r16" ghost @click="onClickBack">
            上一步
          </st-button>
          <st-button type="primary" @click="save">保存</st-button>
        </st-form-item>
      </a-col>
    </a-row>
  </st-form>
</template>

<script>
import { PatternService } from '@/services/pattern.service'
import { ruleOptions } from '../staff-form.config.ts'
import { cloneDeep } from 'lodash-es'

export default {
  name: 'EditDetailCoachInfo',
  serviceInject() {
    return {
      pattern: PatternService
    }
  },
  props: {
    data: {
      type: Object
    },
    staffSpecialty: {
      type: Array,
      default: () => []
    }
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      coachInfoData: {
        certification_name: []
      },
      fileList: [],
      checked: false,
      image_personal: []
    }
  },
  mounted() {
    cloneDeep()
    this.setData(this.data)
  },
  methods: {
    onChangeGetShowImage(imageFiles) {
      this.image_personal = cloneDeep(imageFiles)
    },
    onChangeSpecialtyId(v) {
      if (v.length > 10) {
        v.pop()
      }
    },
    checkShow(e) {
      this.checked = e.target.checked
    },
    handleSpecialtyIdChange(e) {
      console.log(e)
    },
    setData(obj) {
      this.form.setFieldsValue({
        employment_time: obj.employment_time
          ? moment(obj.employment_time)
          : undefined,
        introduction: obj.introduction,
        specialty_id: obj.specialty_id
      })
      this.image_personal = obj.image_personal
      obj.is_show ? (this.checked = true) : (this.checked = false)
      this.coachInfoData.certification_name = obj.certification_name
        ? obj.certification_name
        : []
    },
    onClickBack() {
      this.$emit('back', 1)
    },
    goNext() {
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          this.$emit('go-next', {
            data: values
          })
        }
      })
    },
    save(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          // 入职时间不必填 不填写不是时间对象不能格式化
          if (values.employment_time) {
            values.employment_time = values.employment_time.format('YYYY-MM-DD')
          } else {
            values.employment_time = undefined
          }
          values.certification_name = this.coachInfoData.certification_name
          values.is_show = this.checked ? 1 : 0
          values.image_personal = this.image_personal
          values.album_id = this.data.album_id
          console.log('Received values of form: ', values)
          this.$emit('coachInfoSave', {
            data: values
          })
        }
      })
    },
    // 添加证书
    onAddProfess() {
      let value = this.form.getFieldValue('certification_name')
      let that = this
      if (value) {
        // input框里有值才添加
        this.form.validateFields(['certification_name'], {}, (error, value) => {
          if (!error) {
            let arr = [...this.coachInfoData.certification_name]
            arr.push(value.certification_name)
            this.coachInfoData.certification_name = [...new Set(arr)]
          }
        })
      }
    },
    // 移除证书
    onProfessRule(index) {
      this.coachInfoData.certification_name.splice(index, 1)
    },
    upload(data) {
      this.OSS.put({
        file: data.file
      }).subscribe({
        next: val => {
          this.key = val.fileKey
          this.MessageService.success({ content: `success: ${val}` })
          this.fileList.push({
            url: `http://styd-saas-test.oss-cn-shanghai.aliyuncs.com/
            ${val.fileKey}`
          })
          this.loading = false
        },
        error: val => {
          this.MessageService.error({ content: `Error ${val.message}` })
          this.loading = false
        }
      })
    },
    handleCancel() {
      this.previewVisible = false
    },
    handlePreview(file) {
      this.previewImage = file.url || file.thumbUrl
      this.previewVisible = true
    },
    handleChange({ fileList }) {
      this.fileList = fileList
    }
  }
}
</script>
