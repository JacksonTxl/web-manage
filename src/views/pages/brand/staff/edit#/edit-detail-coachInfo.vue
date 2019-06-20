<template>
  <st-form :form="form" @submit="save" class="page-edit-coachInfo">
    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item label="从业时间">
          <a-date-picker style="width:100%" v-decorator="coachRules.employment_time"/>
        </st-form-item>
        <st-form-item label="擅长的项目">
          <span slot="label">
            擅长的项目&nbsp;
            <a-tooltip placement="right" title="What do you want others to call you?">
              <st-icon type="anticon:question-circle-o"/>
            </a-tooltip>
          </span>
          <a-checkbox-group @change="onChooseSpecialty" v-decorator="coachRules.specialty_id">
            <a-checkbox :value="1">普通员工</a-checkbox>
            <a-checkbox :value="2">会籍销售</a-checkbox>
            <a-checkbox :value="3">团课教练</a-checkbox>
            <a-checkbox :value="4">私人教练</a-checkbox>
            <a-checkbox :value="5">游泳教练</a-checkbox>
          </a-checkbox-group>
        </st-form-item>
        <st-form-item label="专业认证">
          <a-input placeholder="请输入专业证书名称" v-decorator="coachRules.certification_name">
            <div slot="addonAfter" @click="onAddProfess" class="add-profess-button">添加</div>
          </a-input>
          <div class="add-profess-card">
            <p v-for="(item,index) in coachInfoData.certification_name" :key="index">
              <span>{{item}}</span>
              <st-icon type="anticon:close" @click="onProfessRule(index)" style="cursor:pointer;"></st-icon>
            </p>
          </div>
        </st-form-item>
        <st-form-item label="个人经历">
          <a-input type="textarea" :autosize="{ minRows: 10, maxRows: 16 }" placeholder="填写点什么吧" v-decorator="coachRules.introduction"/>
        </st-form-item>
        </a-col>
    </a-row>
      <a-row :gutter="8">
      <a-col :lg="24" :xs="22" :offset="1">
        <st-form-item label="员工风采" class="page-image-personal">
          <st-image-upload
            @change="imageUploadChange"
            width="100px"
            height="100px"
            :list="fileList"
            :sizeLimit="2"
            placeholder="上传照片"
            :numLimit=10
            v-decorator="coachRules.image_personal"
          ></st-image-upload>
        </st-form-item>
        <st-form-item label="对外展示">
          <a-checkbox v-decorator="coachRules.is_show" :checked="checked">展示在会员端</a-checkbox>
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :offset="2">
        <st-form-item class="mg-l24" labelOffset>
          <st-button type="primary" ghost  @click="save">保存</st-button>
        </st-form-item>
      </a-col>
    </a-row>
  </st-form>
</template>

<script>
export default {
  name: 'EditDetailCoachInfo',
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {
      form: this.$form.createForm(this),
      coachInfoData: {
        certification_name: []
      },
      fileList: [],

      checked: false,
      coachRules: {
        employment_time: ['employment_time'],
        specialty_id: ['specialty_id'],
        certification_name: ['certification_name'],
        introduction: ['introduction'],
        is_show: ['is_show']
      },
      image_personal: []
    }
  },
  mounted() {
    this.setData(this.data)
  },
  methods: {
    imageUploadChange(e) {
      this.image_personal = e
    },
    check(e) {
      this.checked = e.target.checked
    },
    setData(obj) {
      this.form.setFieldsValue({
        employment_time: moment(obj.employment_time),
        specialty_id: obj.specialty_id,
        introduction: obj.introduction
      })
      this.fileList = obj.image_personal
      obj.is_show ? this.checked = true : this.checked = false
      this.coachInfoData.certification_name = obj.certification_name ? obj.certification_name : []
    },
    goNext() {
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          this.$emit('goNext', {
            data: values
          })
        }
      })
    },
    save(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          values.employment_time = values.employment_time.format('YYYY-MM-DD')
          values.certification_name = this.coachInfoData.certification_name
          values.is_show = this.checked ? 1 : 0
          values.image_personal = this.image_personal
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
    },
    upload(data) {
      this.OSS.put({
        file: data.file
      }).subscribe({
        next: val => {
          this.key = val.fileKey
          this.MessageService.success({ content: `success: ${val}` })
          this.fileList.push({
            url: `http://styd-saas-test.oss-cn-shanghai.aliyuncs.com/${
              val.fileKey
            }`
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

<style>
</style>
