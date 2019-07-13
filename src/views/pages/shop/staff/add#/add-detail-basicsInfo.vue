<template>
  <st-form :form="form">
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
              <a-select-option
                v-for="item in codeList"
                :key="item.code_id"
                :value="item.code_id">
                +{{ item.phone_code }}
              </a-select-option>
            </a-select>
            <a-input style="width: 80%;" v-decorator="rules.phone" placeholder="请输入手机号"/>
          </a-input-group>
        </st-form-item>
        <st-form-item label="性别" required>
          <a-radio-group name="radioGroup" v-decorator="rules.sex">
            <a-radio :value="1">男 <st-icon class="sex__male" style="color: #636aec" type="male"></st-icon></a-radio>
            <a-radio :value="2">女 <st-icon calss="sex__female" style="color: #fa756c" type="female"></st-icon></a-radio>
          </a-radio-group>
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
      <a-col :offset="1" :lg="23">
        <st-form-item required>
          <template slot="label">
            员工职能<st-help-tooltip id="TSCE002" />
          </template>
          <a-checkbox-group v-decorator="rules.identity" @change="getIsCoach">
            <a-checkbox
              v-for="(item, key) in enums.identity.value"
              :key="key"
              :value="+key"
            >{{item}}</a-checkbox>
          </a-checkbox-group>
        </st-form-item>
      </a-col>
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
        <st-form-item v-if="isShowLevel" required>
          <template slot="label">
            教练等级<st-help-tooltip id="TSCE003" />
          </template>
          <coach-level-select
            placeholder="请选择教练等级"
            style="width: 100%"
            useType="form"
            v-decorator="rules.coach_levelRule"
            @change="onChange">
          </coach-level-select>
        </st-form-item>
      </a-col>
      <a-col :offset="1" :lg="10" :xs="22">
        <st-form-item label="工号">
          <a-input placeholder="请输入员工工号" v-decorator="rules.staff_num"></a-input>
        </st-form-item>
        <st-form-item label="入职时间">
          <a-date-picker style="width:100%" v-decorator="rules.entry_date"/>
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
      <a-col :offset="1" :lg="10">
        <st-form-item label="系统权限">
          <a-checkbox @change="permissionChange" v-decorator="rules.is_permission">开通系统使用权限</a-checkbox>
        </st-form-item>
        <st-form-item label="登录账号" v-if="isChoosePermission">
          <a-input
            placeholder="6-18个字符，可使用字母、数字、下划线"
            v-decorator="rules.account"
          ></a-input>
        </st-form-item>
        <st-form-item label="登录密码" v-if="isChoosePermission">
          <a-input
            placeholder="6-15个字符，区分大小写"
            v-decorator="rules.password"
          ></a-input>
        </st-form-item>
        <st-form-item label="确认密码" v-if="isChoosePermission">
          <a-input
            placeholder="请再次填写密码"
            v-decorator="rules.repeat_password"
          ></a-input>
        </st-form-item>
      </a-col>
    </a-row>

    <a-row :gutter="8">
      <a-col :offset="1">
        <st-form-item label=" ">
          <st-button @click="goNext" type="primary">保存，继续填写细信息</st-button>
        </st-form-item>
      </a-col>
    </a-row>
  </st-form>
</template>
<script>
import { RuleConfig } from '@/constants/staff/rule'
import { UserService } from '@/services/user.service'
import { MessageService } from '@/services/message.service'
import { AddService } from '../add.service'
import CoachLevelSelect from '@/views/biz-components/coach-level-select'
import ShopSelect from '@/views/biz-components/shop-select'
import DepartmentSelect from '@/views/biz-components/department-select'

export default {
  name: 'StaffDetailBasics',
  serviceInject() {
    return {
      rules: RuleConfig,
      userService: UserService,
      message: MessageService,
      addService: AddService
    }
  },
  rxState() {
    return {
      shop: this.userService.shop$
    }
  },
  components: {
    ShopSelect,
    CoachLevelSelect,
    DepartmentSelect
  },
  props: {
    enums: {
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
      isChoosePermission: false,
      isAdd: [],
      addflag: true,
      isShowLevel: false, // 是否展示教练等级

      treeExpandedKeys: [],
      value: undefined,
      id_type: '',
      choosed_country_id: ''
    }
  },
  mounted() {
    console.log(this.shop)
    this.form.setFieldsValue({
      shop_id: this.shop.id
    })
  },
  methods: {
    getIsCoach(data) {
      console.log('watch new', data)
      this.isShowLevel = data.includes(4)

      if (!this.isShowLevel) {
        this.$emit('deletStep')
        this.addflag = false
      } else {
        if (this.addflag) return
        this.$emit('addStep')
        this.addflag = true
      }
    },
    permissionChange(e) {
      this.isChoosePermission = e.target.checked
    },
    onChange(value) {
      console.log('选择部门', value)
      this.value = value
    },
    onSelectIdtype(e) {
      console.log('证件选择', e)
    },
    // 继续填写跳转到编辑
    goNext(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          this.submit(values, 1)
        }
      })
    },
    /**
     * saveOrgoNext 0 保存 1 跳转到编辑
     */
    submit(data) {
      // this.isChoosePermission ? (data.is_permission = 1) : (data.is_permission = 0)
      data.is_permission = +this.isChoosePermission
      data.entry_date = moment(data.entry_date).format('YYYY-MM-DD')
      data.image_avatar = this.fileList[0]
      data.image_face = this.faceList[0]
      data.country_code_id = this.country_code_id
      data.id_type = this.id_type
      console.log('submit', data)
      this.addService.addStaff(data).subscribe(res => {
        console.log('addStaff', res)
        this.$router.push({
          name: 'shop-staff-edit',
          query: {
            id: res.staff_id,
            currentIndex: 1,
            isShowCoach: data.identity.includes(3) || data.identity.includes(4) ? 1 : 0
          }
        })
      })
    }
  }
}
</script>
