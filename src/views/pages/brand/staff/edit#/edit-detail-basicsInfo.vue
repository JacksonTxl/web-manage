<template>
  <st-form :form="form" @submit="save" class="page-edit-container">
    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item label="员工头像">
          <st-image-upload
            @change="imageUploadChange"
            width="164px"
            height="164px"
            :list="fileList"
            :sizeLimit="2"
            placeholder="上传头像"
          ></st-image-upload>
        </st-form-item>
        <st-form-item label="姓名" required>
          <a-input placeholder="支持中英文、数字,不超过1   0个字" v-decorator="basicsInfoRule.staff_name"/>
        </st-form-item>
        <st-form-item label="手机号" required>
          <a-input-group compact>
            <a-select defaultValue="Option1" style="width: 15%;">
              <a-select-option value="Option1">+86</a-select-option>
              <a-select-option value="Option2">Option2</a-select-option>
            </a-select>
            <a-input style="width: 85%" v-decorator="basicsInfoRule.mobile" placeholder="请输入手机号"/>
          </a-input-group>
        </st-form-item>
        <st-form-item label="性别" required>
          <a-select placeholder="请选择" v-decorator="basicsInfoRule.sex">
            <a-select-option :value="2">男</a-select-option>
            <a-select-option :value="1">女</a-select-option>
          </a-select>
        </st-form-item>
      </a-col>
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item label="员工人脸">
          <st-image-upload
            @change="faceChange"
            width="164px"
            height="164px"
            :list="faceList"
            :sizeLimit="2"
            placeholder="上传人脸"
          ></st-image-upload>
        </st-form-item>
        <st-form-item label="昵称" required>
          <a-input placeholder="支持中英文、数字,不超过1   0个字" v-decorator="basicsInfoRule.nickname"/>
        </st-form-item>
        <st-form-item label="工号" required>
          <a-input placeholder="请输入员工工号" v-decorator="basicsInfoRule.staff_num"/>
        </st-form-item>
        <st-form-item label="证件" required>
          <a-input-group compact>
            <a-select defaultValue="Option1" style="width: 20%;">
              <a-select-option value="Option1">身份证</a-select-option>
              <a-select-option value="Option2">护照</a-select-option>
            </a-select>
            <a-input
              style="width: 80%"
              placeholder="请输入身份证号码"
              v-decorator="basicsInfoRule.id_number"
            />
          </a-input-group>
        </st-form-item>
      </a-col>
    </a-row>

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
        <st-form-item label="工作性质">
          <a-select placeholder="请选择">
            <a-select-option value="1">全职</a-select-option>
            <a-select-option value="2">简直</a-select-option>
            <a-select-option value="3">实习</a-select-option>
          </a-select>
        </st-form-item>
        <st-form-item label="系统角色">
          <a-select placeholder="请选择">
            <a-select-option value="1">总监</a-select-option>
            <a-select-option value="2">团课经理</a-select-option>
            <a-select-option value="3">会籍经理</a-select-option>
            <a-select-option value="4">团课教练</a-select-option>
            <a-select-option value="5">私教教练</a-select-option>
          </a-select>
        </st-form-item>
      </a-col>
      <a-col :offset="1" :lg="10" :xs="22">
        <st-form-item label="入职时间">
          <a-date-picker style="width:100%"/>
        </st-form-item>
        <st-form-item label="所属门店">
          <a-select placeholder="请选择">
            <a-select-option value="1">店1</a-select-option>
            <a-select-option value="2">店2</a-select-option>
            <a-select-option value="3">店3</a-select-option>
          </a-select>
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
  name: 'EditDetailBasicsInfo',
  data() {
    return {
      form: this.$form.createForm(this),
      loading: false,
      imageUrl: '',
      key: '', // 上传头像返回的key
      fileList: [],
      faceList: [],
      basicsInfoRule: {
        // 姓名
        staff_name: [
          'staff_name',
          { rules: [{ required: true, message: '请填写姓名' }] }
        ],
        // 昵称
        nickname: [
          'nickname',
          { rules: [{ required: true, message: '请填写昵称' }] }
        ],
        // 国家编码
        country_code_id: [
          'country_code_id',
          { rules: [{ required: true, message: '请选择' }] }
        ],
        // 手机号
        mobile: [
          'mobile',
          { rules: [{ required: true, message: '请输入手机号' }] }
        ],
        // 性别
        sex: ['sex', { rules: [{ required: true, message: '请选择性别' }] }],
        // 证件类型
        id_type: ['id_type'],
        // 证件号
        id_number: [
          'id_number',
          { rules: [{ required: true, message: '请输入身份证号' }] }
        ],
        // 工号
        staff_num: [
          'staff_num',
          { rules: [{ required: true, message: '请输入工号' }] }
        ]
      }
    }
  },
  props: {
    formData: Object
  },
  methods: {
    faceChange(data) {
      console.log('face', data)
    },
    imageUploadChange(data) {
      console.log('img', data)
      // console.log(this.fileList)
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
          this.$emit('bacicInfoSave', {
            data: values
          })
        }
      })
    },
    setData(obj) {
      console.log('set', obj)
      this.form.setFieldsValue({
        staff_name: obj.staff_name,
        nickname: obj.nickname,
        mobile: obj.mobile,
        staff_num: obj.staff_num,
        sex: obj.sex,
        id_number: obj.id_number
      })
      this.fileList = [{
        url: obj.image_avatar
      }]
    }
  },
  mounted() {
    this.setData(this.formData)
  }
}
</script>
