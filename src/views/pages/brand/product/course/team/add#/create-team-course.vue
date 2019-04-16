<template>
  <st-form :form="form" @submit="save" class="page-createTeam-container">
    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item label="课程名称" required>
          <a-input placeholder="支持输入4-15个字的课程名称"/>
        </st-form-item>
        <st-form-item label="课程类型" required>
          <a-select placeholder="请选择">
            <a-select-option value="2">类型1</a-select-option>
            <a-select-option value="1">类型2</a-select-option>
          </a-select>
        </st-form-item>
        <st-form-item label="训练目的" required>
          <a-select placeholder="请选择">
            <a-select-option value="2">目的1</a-select-option>
            <a-select-option value="1">目的2</a-select-option>
          </a-select>
        </st-form-item>
        <st-form-item label="课程时长" required>
          <a-input>
            <div slot="addonAfter" class="st-form-item-unit">分钟</div>
          </a-input>
        </st-form-item>
        <st-form-item label="参考定价">
          <a-input>
            <div slot="addonAfter" class="st-form-item-unit">元/节</div>
          </a-input>
        </st-form-item>
        <st-form-item label="消耗卡路里">
          <a-input>
            <div slot="addonAfter" class="st-form-item-unit">Kcal/节</div>
          </a-input>
        </st-form-item>
        <st-form-item label="图片" >
          <div class="page-upload-container">
            <st-image-upload :list="fileList" @change="onImgChange"></st-image-upload>
            <input type="hidden" />
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
        <st-form-item label="课程介绍">
          <a-textarea
            type="textarea"
            :autosize="{ minRows: 10, maxRows: 16 }"
            placeholder="填写点什么吧"
            maxlength="500"
          />
        </st-form-item>
      </a-col>
    </a-row>

    <a-row :gutter="8">
      <a-col :offset="2">
        <st-form-item class="mg-l24" labelOffset>
          <st-button type="primary" ghost html-type="submit">保存</st-button>
          <st-button class="mg-l16" @click="goNext" type="primary">继续 继续设置上课门店</st-button>
        </st-form-item>
      </a-col>
    </a-row>
  </st-form>
</template>
<script>
export default {
  name: 'CreateTeamCourse',
  data() {
    return {
      form: this.$form.createForm(this),
      fileList: [{
        image_id: 10000,
        image_key: 'http://styd-saas-test.oss-cn-shanghai.aliyuncs.com/image/pLOFb5kCPN4gPQ8H'
      }]
    }
  },
  methods: {
    save() {
      e.preventDefault()
    },
    goNext() {
    //   this.form.validateFields((err, values) => {
    //     if (!err) {
    //       console.log('Received values of form: ', values)
      // this.$emit('goNext', {
      // formData: this.form.getFieldsValue()
      // })
      // }
    //   })
    },
    onImgChange(fileList) {
      this.form.setFieldsValue({
        course_image: fileList[0]
      })
    }
  }
}
</script>
