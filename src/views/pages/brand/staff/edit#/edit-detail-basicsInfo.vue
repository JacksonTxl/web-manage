<template>
  <st-form :form="form" @submit="sumbitBasicData">
    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item label="员工头像">
          <st-image-upload
            width="164px"
            height="164px"
            :list="fileList"
            :sizeLimit="2"
            placeholder="上传头像"
          ></st-image-upload>
        </st-form-item>
        <st-form-item label="姓名" required>
          <a-input placeholder="支持中英文、数字、不超过15个字" max="15" v-decorator="rules.staff_name"/>
        </st-form-item>
        <st-form-item label="手机号" required>
          <a-input-group compact style="top: 0;">
            <a-select style="width: 20%;" v-model="country_code_id">
                <a-select-option v-for="item in codeList" :key="item.code_id" :value="item.code_id">+{{ item.phone_code }}</a-select-option>
            </a-select>
            <a-input style="width: 80%" v-decorator="rules.phone" placeholder="请输入手机号"/>
          </a-input-group>
        </st-form-item>
        <st-form-item label="性别" required>
          <a-select placeholder="请选择" v-decorator="rules.sex">
            <template v-for="(item,key) in enums.sex.value">
              <a-select-option :key="item" :value="+key">{{ item }}</a-select-option>
            </template>
          </a-select>
        </st-form-item>
      </a-col>
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item label="员工人脸">
          <st-face-upload
            width="164px"
            height="164px"
            :list="faceList"
            placeholder="上传人脸"
          ></st-face-upload>
        </st-form-item>
        <st-form-item required>
          <template slot="label">
            昵称<st-help-tooltip id="TBEE001"/>
          </template>
          <a-input placeholder="支持中英文、数字,不超过10个字" v-decorator="rules.nickname"/>
        </st-form-item>
        <st-form-item label="邮箱">
          <a-input placeholder="请输入邮箱" v-decorator="rules.mail"/>
        </st-form-item>
        <st-form-item label="证件">
          <a-input-group compact style="top: 0;">
            <a-select style="width: 20%;" v-model="id_type">
              <template v-for="(item,key) in enums.id_type.value">
                <a-select-option :key="item" :value="+key">{{ item }}</a-select-option>
              </template>
            </a-select>
            <a-input style="width: 80%" placeholder="请输入身份证号码" v-decorator="rules.idnumber"/>
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
        <st-form-item label="部门" required>
          <department-select
          placeholder="请选择部门"
          style="width: 100%"
          useType="form"
          v-decorator="rules.department_id">
          </department-select>
        </st-form-item>
        <st-form-item label="工作性质">
          <a-select placeholder="请选择" v-decorator="rules.nature_work">
            <template v-for="(item,index) in nature_work_option">
              <a-select-option :key="index" :value="item.value">{{ item.label }}</a-select-option>
            </template>
          </a-select>
        </st-form-item>
        <st-form-item label="系统角色" required>
          <a-select mode="multiple" placeholder="请选择" v-decorator="rules.role_id">
            <template v-for="item in roleList">
              <a-select-option :key="item.id" :value="item.id">{{ item.name }}</a-select-option>
            </template>
          </a-select>
        </st-form-item>
      </a-col>
      <a-col :offset="1" :lg="10" :xs="22">
        <st-form-item label="工号">
          <a-input placeholder="请输入员工工号" v-decorator="rules.staff_num"></a-input>
        </st-form-item>
        <st-form-item label="入职时间">
          <a-date-picker style="width:100%" v-decorator="rules.entry_date"/>
        </st-form-item>
        <st-form-item label="所属门店" >
          <shop-select
            mode="multiple"
            useType="form"
            placeholder="请选择门店"
            v-decorator="rules.shop_id"/>
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :offset="1" :lg="22">
        <st-hr></st-hr>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item label=" ">
          <st-button @click="saveAndGoNext" type="primary">保存，继续填写</st-button>
        </st-form-item>
      </a-col>
    </a-row>
  </st-form>
</template>
<script>
import { RuleConfig } from '@/constants/staff/rule'
import { EditService } from '../edit.service'
import ShopSelect from '@/views/biz-components/shop-select'
import DepartmentSelect from '@/views/biz-components/department-select'
export default {
  name: 'EditBasicInfo',
  serviceInject() {
    return {
      rules: RuleConfig,
      editService: EditService
    }
  },
  rxState() {
    return {
      roleList: this.editService.roleList$,
      codeList: this.editService.codeList$
    }
  },
  props: {
    enums: {
      type: Object
    },
    data: {
      type: Object
    }
  },
  data() {
    return {
      form: this.$form.createForm(this),
      fileList: [],
      faceList: [],
      countryList: [],
      id_type: '',
      country_code_id: '',
      value: '' // 部门选择
    }
  },
  computed: {
    nature_work_option() {
      let list = []
      if (!this.enums.nature_work) return list
      Object.entries(this.enums.nature_work.value).forEach(o => {
        list.push({ value: +o[0], label: o[1] })
      })
      return [{ value: 0, label: '未填写' }, ...list]
    }
  },
  components: {
    ShopSelect,
    DepartmentSelect
  },
  mounted() {
    this.$nextTick().then(() => {
      this.setData(this.data)
    })
  },
  methods: {
    onChange(value) {
      console.log('选择部门', value)
      this.value = value
    },
    onSelectIdtype(e) {
      console.log('证件选择', e)
    },
    saveAndGoNext(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          this.submit(values, 1)
        }
      })
    },
    sumbitBasicData(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          this.submit(values)
        }
      })
    },
    /**
     * saveOrgoNext 0 保存 1 下一个
     */
    submit(data, saveOrgoNext) {
      data.entry_date = moment(data.entry_date).format('YYYY-MM-DD')
      data.album_id = this.data.album_id
      data.department_id = Number(data.department_id)
      data.image_avatar = this.fileList[0] || {}
      data.image_face = this.faceList[0] || {}
      data.country_code_id = this.country_code_id
      data.id_type = this.id_type
      this.editService.updateBasicInfo(this.data.staff_id, data).subscribe(res => {
        this.$emit('goNext')
        this.$emit('updateStaffInfo')
      })
    },
    setData(obj) {
      this.form.setFieldsValue({
        staff_name: obj.staff_name, // 姓名
        nickname: obj.nickname, // 昵称
        mobile: obj.mobile, // 手机号
        staff_num: obj.staff_num, // 工号
        sex: obj.sex, // 性别
        id_number: obj.id_number, // 身份证
        nature_work: obj.nature_work, // 工作性质
        department_id: String(obj.department_id), // 部门
        role_id: obj.role_id, // 角色
        shop_id: obj.shop_id, // 所属门店
        entry_date: obj.entry_date ? moment(obj.entry_date) : undefined, // 入职时间
        mail: obj.mail // 邮箱
      })
      this.country_code_id = obj.country_code_id
      this.id_type = obj.id_type
      this.fileList = Array.isArray(obj.image_avatar) ? obj.image_avatar : [obj.image_avatar]
      this.faceList = Array.isArray(obj.image_face) ? obj.image_face : [obj.image_face]
    }
  }
}
</script>
