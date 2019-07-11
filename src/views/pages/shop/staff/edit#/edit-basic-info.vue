<template>
  <st-form :form="form" @submit="save">
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
            <a-select style="width: 20%" v-decorator="rules.country_code_id">
              <a-select-option v-for="item in code_list" :key="item.code_id" :value="item.code_id">+{{ item.phone_code }}</a-select-option>
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
        <st-form-item label="昵称" required>
          <a-input placeholder="支持中英文、数字,不超过10个字" v-decorator="rules.nickname"/>
        </st-form-item>
        <st-form-item label="邮箱">
          <a-input placeholder="请输入邮箱" v-decorator="rules.mail"/>
        </st-form-item>
        <st-form-item label="证件">
          <a-input-group compact style="top: 0;">
            <a-select style="width: 20%" v-decorator="rules.idtype">
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
        <st-form-item label="部门">
          <department-select
            placeholder="请选择部门"
            style="width: 100%"
            useType="form"
            v-decorator="rules.department_id">
          </department-select>
        </st-form-item>
        <st-form-item label="工作性质">
          <a-select placeholder="请选择" v-decorator="rules.nature_work">
            <template v-for="(item,key) in enums.nature_work.value">
              <a-select-option :key="item" :value="+key">{{ item }}</a-select-option>
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
          <a-date-picker
            style="width:100%" v-decorator="rules.entry_date"/>
        </st-form-item>
        <st-form-item label="所属门店">
          <shop-select
            mode="multiple"
            useType="form"
            placeholder="所属门店"
            :disabled="true"
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
      <a-col :offset="2">
        <st-form-item class="mg-l24" labelOffset>
          <st-button type="primary" ghost html-type="submit">提交</st-button>
          <st-button class="mg-l16" @click="goNext" type="primary">保存,继续填写</st-button>
        </st-form-item>
      </a-col>
    </a-row>
  </st-form>
</template>
<script>
import { RuleConfig } from '@/constants/staff/rule'
import ShopSelect from '@/views/biz-components/shop-select'
import DepartmentSelect from '@/views/biz-components/department-select'
import { MessageService } from '@/services/message.service'
import { ListService } from '../list.service'
import { AppConfig } from '@/constants/config'
import { EditService } from '../edit.service'
export default {
  name: 'EditBasicInfo',
  serviceInject() {
    return {
      rules: RuleConfig,
      appConfig: AppConfig,
      listservice: ListService,
      editservice: EditService,
      message: MessageService
    }
  },
  components: {
    ShopSelect,
    DepartmentSelect
  },
  props: {
    enums: {
      type: Object
    },
    data: {
      type: Object
    },
    roleList: {
      type: Array
    },
    codeList: {
      type: Array
    },
    department: {
      type: Array
    }
  },
  data() {
    return {
      form: this.$form.createForm(this),
      fileList: [],
      faceList: [],
      value: '' // 部门选择
    }
  },
  computed: {
    code_list() {
      return this.codeList && this.codeList['code_list']
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.setData(this.data)
    })
  },
  methods: {
    onChange(value) {
      this.value = value
    },
    goNext(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          this.submit(values, 1)
        }
      })
    },
    save(e) {
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
      data.image_avatar = this.fileList
      data.image_face = this.faceList
      this.editservice.updateBasicInfo(this.data.staff_id, data).subscribe(res => {
        if (saveOrgoNext === 1) {
          this.$emit('gonext')
          this.$emit('updateStaffInfo')
        } else {
          this.message.success({ content: '编辑成功' })
          this.$router.go(-1)
        }
      })
    },
    setData(obj) {
      this.form.setFieldsValue({
        staff_name: obj.staff_name,
        nickname: obj.nickname,
        department_id: String(obj.department_id),
        country_code_id: obj.country_code_id,
        mobile: obj.mobile,
        staff_num: obj.staff_num,
        sex: obj.sex,
        id_type: obj.id_type,
        id_number: obj.id_number,
        nature_work: obj.nature_work,
        role_id: obj.role_id,
        entry_date: obj.entry_date ? moment(obj.entry_date) : '',
        mail: obj.mail,
        image_avatar: obj.image_avatar,
        image_face: obj.image_face,
        shop_id: obj.shop_id
      })
      this.fileList = Array.isArray(obj.image_avatar) ? obj.image_avatar : []
      this.faceList = Array.isArray(obj.image_face) ? obj.image_face : []
    }
  }
}
</script>
