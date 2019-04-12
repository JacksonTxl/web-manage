<template>
  <st-form :form="form" @submit="save" class="page-edit-container">
    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item label="员工头像">
          <a-upload
            listType="picture-card"
            class="page-edit-upload"
            :showUploadList="false"
            :customRequest="upload"
          >
            <img v-if="imageUrl" :src="imageUrl" width="164" height="auto" alt="avatar">
            <div v-else>
              <a-icon :type="loading ? 'loading' : 'plus'"/>
              <div class="ant-upload-text">上传头像</div>
            </div>
          </a-upload>
        </st-form-item>
        <st-form-item label="姓名" required>
          <a-input placeholder="支持中英文、数字,不超过1   0个字"/>
        </st-form-item>
        <st-form-item label="手机号" required>
          <a-input-group compact>
            <a-select defaultValue="Option1" style="width: 15%;">
              <a-select-option value="Option1">+86</a-select-option>
              <a-select-option value="Option2">Option2</a-select-option>
            </a-select>
            <a-input style="width: 85%" placeholder="请输入手机号"/>
          </a-input-group>
        </st-form-item>
        <st-form-item label="性别" required>
          <a-select placeholder="请选择">
            <a-select-option value="2">男</a-select-option>
            <a-select-option value="1">女</a-select-option>
          </a-select>
        </st-form-item>
      </a-col>
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item label="员工人脸">
          <a-upload
            listType="picture-card"
            class="page-edit-upload"
            :showUploadList="false"
            :customRequest="upload"
          >
            <img v-if="imageUrl" :src="imageUrl" width="164" height="auto" alt="avatar">
            <div v-else>
              <a-icon :type="loading ? 'loading' : 'plus'"/>
              <div class="ant-upload-text">上传人脸</div>
            </div>
          </a-upload>
        </st-form-item>
        <st-form-item label="昵称" required>
          <a-input placeholder="支持中英文、数字,不超过1   0个字"/>
        </st-form-item>
        <st-form-item label="邮箱">
          <a-input placeholder="请输入员工邮箱"/>
        </st-form-item>
        <st-form-item label="证件">
          <a-input-group compact>
            <a-select defaultValue="Option1" style="width: 20%;">
              <a-select-option value="Option1">身份证</a-select-option>
              <a-select-option value="Option2">护照</a-select-option>
            </a-select>
            <a-input style="width: 80%" placeholder="请输入身份证号码"/>
          </a-input-group>
        </st-form-item>
      </a-col>
    </a-row>
    <!-- hr -->
    <a-row :gutter="8">
      <a-col :offset="1" :lg="22">
        <st-hr></st-hr>
      </a-col>
    </a-row>

    <a-row :gutter="8">
      <a-col :offset="1" :lg="10" :xs="22">
        <st-form-item label="部门">
          <a-select placeholder="请选择">
            <a-select-option value="1">黄埔</a-select-option>
            <a-select-option value="2">北大</a-select-option>
          </a-select>
        </st-form-item>
        <st-form-item label="工作性质" >
          <a-select placeholder="请选择" >
            <a-select-option value="1">全职</a-select-option>
            <a-select-option value="2">简直</a-select-option>
            <a-select-option value="3">实习</a-select-option>
          </a-select>
        </st-form-item>
        <st-form-item label="系统角色" >
          <a-select placeholder="请选择" >
            <a-select-option value="1">总监</a-select-option>
            <a-select-option value="2">团课经理</a-select-option>
            <a-select-option value="3">会籍经理</a-select-option>
            <a-select-option value="4">团课教练</a-select-option>
            <a-select-option value="5">私教教练</a-select-option>
          </a-select>
        </st-form-item>
      </a-col>
      <a-col :offset="1" :lg="10" :xs="22">
        <st-form-item label="工号">
          <a-input placeholder="请输入员工工号"/>
        </st-form-item>
        <st-form-item label="入职时间" >
          <a-date-picker  style="width:100%"/>
        </st-form-item>
        <st-form-item label="所属门店" >
          <a-select placeholder="请选择" >
            <a-select-option value="1">店1</a-select-option>
            <a-select-option value="2">店2</a-select-option>
            <a-select-option value="3">店3</a-select-option>
          </a-select>
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :offset="2">
        <st-form-item  class="mg-l24" labelOffset>
          <st-button type="primary"
            ghost html-type="submit">保存</st-button>
          <st-button class="mg-l16"
          @click="goNext"
            type="primary">继续 填写</st-button>
        </st-form-item>
      </a-col>
    </a-row>
  </st-form>
</template>
<script>
export default {
  name: 'EditDetailBasicsInfo',
  data() {
    return {
      form: this.$form.createForm(this),
      loading: false,
      imageUrl: '',
      key: '' // 上传头像返回的key
    }
  },
  methods: {
    upload(data) {
      this.loading = true
      this.imageUrl = ''
      this.OSS.put({
        file: data.file
      }).subscribe({
        next: val => {
          this.key = val.fileKey
          this.MessageService.success({ content: `success: ${val}` })
          this.imageUrl = `http://styd-saas-test.oss-cn-shanghai.aliyuncs.com/${
            val.fileKey
          }`
          this.loading = false
          console.log(val.fileKey)
          console.log(this.imageUrl)
        },
        error: val => {
          this.MessageService.error({ content: `Error ${val.message}` })
          this.loading = false
        }
      })
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
    save(e) { // form submit
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          this.$emit('save', {
            data: values
          })
        }
      })
    }
  }
}
</script>
