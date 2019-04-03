<template>
  <st-form>
    <a-row :gutter="8">
      <a-col :lg="10"
        :xs="22"
        :offset="1">
        <st-form-item label="从业时间">
          <a-input placeholder="填写点什么吧" v-decorator="coachInfoRule.employment_timeRule"></a-input>
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :offset="1"
        :lg="22">
        <st-form-item
          label='擅长的项目'>
          <span slot="label">
            擅长的项目&nbsp;
            <a-tooltip placement="right"
              title="What do you want others to call you?">
              <st-icon type="anticon:question-circle-o" />
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
      <a-col :lg="10"
        :xs="22"
        :offset="1">
        <st-form-item label="专业认证">
          <a-input placeholder="上传文件记者换"></a-input>
        </st-form-item>
        <st-form-item label="个人经历">
          <a-input type="textarea"  :autosize="{ minRows: 10, maxRows: 16 }" placeholder="填写点什么吧" v-decorator="coachInfoRule.introductionRule"></a-input>
        </st-form-item>
        <st-form-item label="员工风采">
          <a-upload
            action="//jsonplaceholder.typicode.com/posts/"
            listType="picture-card"
            :fileList="fileList"
            @preview="handlePreview"
            @change="handleChange"
          >
            <div v-if="fileList.length < 3">
                <a-icon type="plus" />
                <div class="ant-upload-text">Upload</div>
            </div>
          </a-upload>
          <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
            <img alt="example" style="width: 100%" :src="previewImage" />
          </a-modal>
        </st-form-item>
        <st-form-item
          label='对外展示'>
          <a-checkbox value="1" :defaultChecked="defaultChecked" v-decorator="coachInfoRule.isShowRule">展示在会员端</a-checkbox>
        </st-form-item>
      </a-col>
    </a-row>

    <a-row :gutter="8" class="mg-t32">
      <a-col :offset="1">
        <st-form-item labelOffset>
          <st-button type="primary"
            >保存</st-button>
          <st-button class="mg-l16"
            @click="goNext"
            type="primary" ghost>保存并继续添加员工</st-button>
        </st-form-item>
      </a-col>
    </a-row>

  </st-form>
</template>
<script>
export default {
  name: 'StaffDetailCoachInfo',
  data() {
    return {
      form: this.$form.createForm(this),
      defaultChecked: true,
      coachInfoRule: {
        employment_timeRule: ['employment_time'], // 从业时间
        specialtyRule: ['specialty_id'], // 擅长的项目
        isShowRule: ['is_show'] // 对外展示：0-不展示 1-展示在会员端
      },

      previewVisible: false,
      previewImage: '',
      fileList: [{
        uid: '-1',
        name: 'xxx.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
      }]
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
