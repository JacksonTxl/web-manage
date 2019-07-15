<template>
  <st-form :form="form" @submit="save" class="page-edit-coachInfo">
    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item label="从业时间">
          <a-date-picker style="width:100%" v-decorator="rules.employment_time"/>
        </st-form-item>
        <st-form-item label="擅长的项目">
          <a-select mode="multiple" placeholder="请选择擅长的项目" v-decorator="rules.specialty_id">
            <a-select-option :key="item.id" :value="item.id" v-for="item in staffSpecialty">
              {{ item.specialty_name }}
            </a-select-option>
          </a-select>
        </st-form-item>
        <st-form-item label="专业认证">
          <a-input placeholder="请输入专业证书名称" v-decorator="rules.certification_name" style="top: 0;">
            <div slot="addonAfter" @click="onAddProfess" class="add-profess-button" v-if="coachInfoData.certification_name.length < 10">添加</div>
          </a-input>
          <div class="add-profess-card">
            <div v-for="(item,index) in coachInfoData.certification_name" :key="index">
              <span>{{item}}</span>
              <st-icon type="anticon:close" @click="onProfessRule(index)" style="cursor:pointer;"></st-icon>
            </div>
          </div>
        </st-form-item>
        <st-form-item label="个人经历">
          <st-textarea
            :maxlength="300"
            :rows="10"
            v-decorator="rules.introduction"
            placeholder="填写点什么吧"/>
        </st-form-item>
        </a-col>
    </a-row>
      <a-row :gutter="8">
      <a-col :lg="24" :xs="22" :offset="1">
        <st-form-item label="员工风采" class="page-image-personal">
          <st-image-upload
            width="100px"
            height="100px"
            :list="fileList"
            :sizeLimit="2"
            placeholder="上传照片"
            :numLimit=10
          ></st-image-upload>
        </st-form-item>
        <st-form-item label="对外展示">
          <a-checkbox v-decorator="rules.is_show" :checked="checked" @change="check">展示在会员端</a-checkbox>
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :offset="1">
        <st-form-item label="  ">
          <st-button type="primary" ghost @click="onClickBack">上一步</st-button>
          <st-button class="mg-l16" @click="goNext" type="primary">保存</st-button>
        </st-form-item>
      </a-col>
    </a-row>
  </st-form>
</template>

<script>
import { RuleConfig } from '@/constants/staff/rule'
import { EditService } from '../edit.service'
import { MessageService } from '@/services/message.service'
export default {
  name: 'EditCoachInfo',
  serviceInject() {
    return {
      rules: RuleConfig,
      service: EditService,
      message: MessageService
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
    return {
      form: this.$form.createForm(this),
      coachInfoData: {
        certification_name: []
      },
      fileList: [],
      checked: false
    }
  },
  mounted() {
    console.log(this.enums)
    this.setData(this.data)
  },
  methods: {
    onChangeSpecialtyId(v) {
      if (v.length > 10) {
        v.pop()
      }
    },
    onClickBack() {
      this.$emit('back', 2)
    },
    imageUploadChange(e) {
      this.image_personal = e
    },
    check(e) {
      this.checked = e.target.checked
    },
    onChooseSpecialty(e) {
      console.log(e)
    },
    setData(obj) {
      this.form.setFieldsValue({
        employment_time: moment(obj.employment_time),
        introduction: obj.introduction,
        specialty_id: obj.specialty_id
      })
      this.fileList = obj.image_personal
      obj.is_show ? this.checked = true : this.checked = false
      this.coachInfoData.certification_name = obj.certification_name ? obj.certification_name : []
    },
    goNext(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          this.submit(this.form.getFieldsValue(), 1)
        }
      })
    },
    save(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.submit(values, 0)
        }
      })
    },
    submit(data, saveOrgoNext) {
      data.employment_time = data.employment_time.format('YYYY-MM-DD')
      data.certification_name = this.coachInfoData.certification_name
      data.is_show = Number(data.is_show)
      data.image_personal = this.fileList
      this.service.updateCoachInfo(this.data.staff_id, data).subscribe(res => {
        this.$router.push({ name: 'shop-staff-list' })
      })
    },
    // 添加证书
    onAddProfess() {
      let value = this.form.getFieldValue('certification_name')
      let that = this
      if (value) {
        // input框里有值才添加
        this.form.validateFields(['certification_name'], { force: true }, (error, value) => {
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
    }
  }
}
</script>
