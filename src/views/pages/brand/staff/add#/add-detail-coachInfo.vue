<template>
  <st-form :form="form" class="page-add-coachInfo">
    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item label="从业时间">
          <a-input placeholder="填写点什么吧" v-decorator="coachInfoRule.employment_timeRule"></a-input>
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :offset="1" :lg="22">
        <st-form-item label="擅长的项目">
          <span slot="label">
            擅长的项目&nbsp;
            <a-tooltip placement="right" title="What do you want others to call you?">
              <st-icon type="anticon:question-circle-o"/>
            </a-tooltip>
          </span>
          <a-checkbox-group v-decorator="coachInfoRule.specialtyRule">
            <a-checkbox value="1">普通员工</a-checkbox>
            <a-checkbox value="2">会籍销售</a-checkbox>
            <a-checkbox value="3">团课教练</a-checkbox>
            <a-checkbox value="4">私人教练</a-checkbox>
            <a-checkbox value="5">游泳教练</a-checkbox>
          </a-checkbox-group>
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item label="专业认证">
          <a-input v-decorator="coachInfoRule.professRule" placeholder="请输入专业证书名称">
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
          <a-input
            type="textarea"
            :autosize="{ minRows: 10, maxRows: 16 }"
            placeholder="填写点什么吧"
            v-decorator="coachInfoRule.introductionRule"
          ></a-input>
        </st-form-item>
      </a-col>
      <a-col :offset="1" :lg="24">
        <st-form-item label="员工风采">
          <div class="page-coachInfo-upload">
            <a-upload listType="picture-card" :showUploadList="false" :customRequest="upload">
              <div v-if="fileList.length < 10">
                <a-icon type="plus"/>
                <div class="ant-upload-text">Upload</div>
              </div>
            </a-upload>
            <div class="page-coachInfo-itemImgCont" v-for="item in fileList" :key="item.url">
              <img
                class="page-coachInfo-itemImg"
                :src="item.url"
                width="128"
                height="auto"
                alt="avatar"
              >
            </div>
          </div>
          <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
            <img alt="example" style="width: 100%" :src="previewImage">
          </a-modal>
        </st-form-item>
      </a-col>
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item label="对外展示">
          <a-checkbox
            value="1"
            :defaultChecked="defaultChecked"
            v-decorator="coachInfoRule.isShowRule"
          >展示在会员端</a-checkbox>
        </st-form-item>
      </a-col>
    </a-row>

    <a-row :gutter="8">
      <a-col :offset="2">
        <st-form-item labelOffset class="mg-l24">
          <st-button type="primary">保存</st-button>
          <st-button class="mg-l16" @click="goNext" type="primary" ghost>保存并继续添加员工</st-button>
        </st-form-item>
      </a-col>
    </a-row>
  </st-form>
</template>
<script>
import { OssService } from '@/services/oss.service'
import { MessageService } from '@/services/message.service'
export default {
  name: 'StaffDetailCoachInfo',
  data() {
    return {
      form: this.$form.createForm(this),
      defaultChecked: true,
      coachInfoRule: {
        employment_timeRule: ['employment_time'], // 从业时间
        specialtyRule: ['specialty_id'], // 擅长的项目
        isShowRule: ['is_show'], // 对外展示：0-不展示 1-展示在会员端
        professRule: ['certification_name'] // 专业证书
      },
      coachInfoData: {
        certification_name: []
      },
      previewVisible: false,
      previewImage: '',
      fileList: []
    }
  },
  serviceInject() {
    return {
      OSS: OssService,
      MessageService: MessageService
    }
  },
  methods: {
    // 添加证书
    onAddProfess() {
      if (
        this.form.getFieldValue('certification_name') &&
        !this.phoneAddDisabled
      ) {
        // input框里有值才添加
        this.form.validateFields(['certification_name'], { force: true }).then(res => {
          let arr = [...this.coachInfoData.certification_name]
          arr.push(res.certification_name)
          this.coachInfoData.certification_name = [...new Set(arr)]
        })
      }
    },
    // 移除证书
    onProfessRule(index) {
      this.coachInfoData.certification_name.splice(index, 1)
    },
    profess_validator(rule, value, callback) {
      // if (this.phoneValidtorType) {
      //   if (value !== undefined && value !== '' && !this.rules.mobile.test(value)) {
      //     callback('输入的门店电话格式错误，请重新输入')// eslint-disable-line
      //   } else {
      //     callback()// eslint-disable-line
      //   }
      // } else {
      //   if (!this.shopData.shop_phones.length) {
      //     callback('请填写门店电话')// eslint-disable-line
      //   } else {
      //     callback()// eslint-disable-line
      //   }
      // }
    },
    goNext() {
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          this.$emit('goNext', {
            formData: this.form.getFieldsValue()
          })
        }
      })
    },
    save(e) {
      // form submit
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          this.$emit('save', {
            data: values
          })
        }
      })
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
          console.log(this.fileList)
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
