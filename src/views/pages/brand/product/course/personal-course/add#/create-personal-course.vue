<template>
  <st-form :form="form" @submit="save" class="page-create-container">
    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item label="课程名称" required>
          <a-input placeholder="支持输入4~30个字的课程名称"/>
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item label="课程类型" required>
          <a-select placeholder="请选择">
            <a-select-option value="2">男</a-select-option>
            <a-select-option value="1">女</a-select-option>
          </a-select>
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item label="训练目的" required>
          <a-select placeholder="请选择">
            <a-select-option value="2">男</a-select-option>
            <a-select-option value="1">女</a-select-option>
          </a-select>
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item label="课程时长" required>
          <a-select placeholder="请选择">
            <a-select-option value="2">男</a-select-option>
            <a-select-option value="1">女</a-select-option>
          </a-select>
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item label="参考定价" required>
          <a-select placeholder="请选择">
            <a-select-option value="2">男</a-select-option>
            <a-select-option value="1">女</a-select-option>
          </a-select>
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item label="图片" >
            <div class="page-upload-container">
          <a-upload
            listType="picture-card"
            class="page-add-upload"
            :showUploadList="false"
            :customRequest="upload"
          >
            <img v-if="imageUrl" :src="imageUrl" width="164" height="auto" alt="avatar">
            <div v-else>
              <a-icon :type="loading ? 'loading' : 'plus'"/>
              <div class="ant-upload-text">上传照片</div>
            </div>
          </a-upload>
          <div class="page-course-photo-des">
            <div class="page-course-item">
              <div class="page-course-item-tip">1.</div>
              <div class="page-course-item-cont">图片格式必须为：png,bmp, jpeg,jpg,gif,建议使用png格 式图片，以保存最佳效果</div>
            </div>
            <div class="page-course-item">
              <div class="page-course-item-tip">2.</div>
              <div class="page-course-item-cont">建议尺寸为xx像素Xxx像素， 不可大于2m</div>
            </div>
          </div>
          </div>
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item label="个人经历">
          <a-input type="textarea" :autosize="{ minRows: 10, maxRows: 16 }" placeholder="填写点什么吧"/>
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
</template>
<script>
export default {
  name: 'create-personal-course',
  data() {
    return {
      form: this.$form.createForm(this),
      loading: false,
      imageUrl: '',
      key: '' // 上传头像返回的key
    }
  },
  methods: {
    save(e) {
      e.preventDefault()
      this.$emit('goNext')
    },
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
    }
  }
}
</script>
