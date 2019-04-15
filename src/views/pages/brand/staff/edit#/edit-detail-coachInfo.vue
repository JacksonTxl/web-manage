<template>
  <st-form :form="form" @submit="save" class="page-edit-coachInfo">
    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item label="从业时间">
          <a-input placeholder="填写点什么吧"></a-input>
        </st-form-item>

        <st-form-item label="擅长的项目">
          <span slot="label">
            擅长的项目&nbsp;
            <a-tooltip placement="right" title="What do you want others to call you?">
              <st-icon type="anticon:question-circle-o"/>
            </a-tooltip>
          </span>
          <a-checkbox-group>
            <a-checkbox value="1">普通员工</a-checkbox>
            <a-checkbox value="2">会籍销售</a-checkbox>
            <a-checkbox value="3">团课教练</a-checkbox>
            <a-checkbox value="4">私人教练</a-checkbox>
            <a-checkbox value="5">游泳教练</a-checkbox>
          </a-checkbox-group>
        </st-form-item>
        <st-form-item label="专业认证">
          <a-input placeholder="请输入专业证书名称">
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
          <a-input type="textarea" :autosize="{ minRows: 10, maxRows: 16 }" placeholder="填写点什么吧"/>
        </st-form-item>
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
        <st-form-item label="对外展示">
          <a-checkbox
            value="1"
          >展示在会员端</a-checkbox>
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :offset="2">
        <st-form-item class="mg-l24" labelOffset>
          <st-button type="primary" ghost html-type="submit">保存</st-button>
          <st-button class="mg-l16" @click="goNext" type="primary">继续 填写</st-button>
        </st-form-item>
      </a-col>
    </a-row>
  </st-form>
</template>

<script>
export default {
  name: 'EditDetailCoachInfo',
  data() {
    return {
      form: this.$form.createForm(this),
      coachInfoData: {
        certification_name: []
      },
      previewVisible: false,
      previewImage: '',
      fileList: []
    }
  },
  methods: {
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
    // 添加证书
    onAddProfess() {
      if (
        this.form.getFieldValue('certification_name') &&
        !this.phoneAddDisabled
      ) {
        // input框里有值才添加
        this.form
          .validateFields(['certification_name'], { force: true })
          .then(res => {
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

<style>
</style>
