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
            v-decorator="rules.image_avatar"
          ></st-image-upload>
        </st-form-item>
        <st-form-item label="姓名" required>
          <a-input placeholder="支持中英文、数字、不超过15个字" max="15" v-decorator="rules.staff_name"/>
        </st-form-item>
        <st-form-item label="手机号" required>
          <a-input-group compact>
            <a-select style="width: 15%;" v-model="choosed_code_id">
              <template v-for="item in codeList">
                <a-select-option :key="item.code_id" :value="item.code_id">+{{ item.phone_code }}</a-select-option>
              </template>
            </a-select>
            <a-input style="width: 85%" v-decorator="rules.phone" placeholder="请输入手机号"/>
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
          <st-image-upload
            width="164px"
            height="164px"
            :list="faceList"
            :sizeLimit="2"
            :isFaceRecognition="true"
            placeholder="上传人脸"
            v-decorator="rules.image_face"
          ></st-image-upload>
        </st-form-item>
        <st-form-item required>
          <template slot="label">
              昵称<st-help-tooltip id="TBCE001" />
          </template>
          <a-input placeholder="支持中英文、数字,不超过10个字" v-decorator="rules.nickname"/>
        </st-form-item>
        <st-form-item label="邮箱" required>
          <a-input placeholder="请输入邮箱" v-decorator="rules.mail"/>
        </st-form-item>
        <st-form-item label="证件" required>
          <a-input-group compact>
            <a-select style="width: 25%;" @change="onSelectIdtype" v-model="choosed_id_type">
              <template v-for="(item,key) in enums.id_type.value">
                <a-select-option :key="item" :value="+key">{{ item }}</a-select-option>
              </template>
            </a-select>
            <a-input style="width: 75%" placeholder="请输入身份证号码" v-decorator="rules.idnumber"/>
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
              员工职能<st-help-tooltip id="TBCE002" />
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
        <st-form-item label="部门">
          <department-select
          placeholder="请选择部门"
          style="width: 100%"
          useType="form"
          v-decorator="rules.department_id"
          @change="onChange">
          </department-select>
        </st-form-item>
        <st-form-item label="工作性质" required>
          <a-select placeholder="请选择" v-decorator="rules.nature_work">
            <template v-for="(item,key) in enums.nature_work.value">
              <a-select-option :key="item" :value="+key">{{ item }}</a-select-option>
            </template>
          </a-select>
        </st-form-item>
        <st-form-item label="系统角色">
          <a-select mode="multiple" placeholder="请选择" v-decorator="rules.role_id">
            <template v-for="item in roleList">
              <a-select-option :key="item.id" :value="item.id">{{ item.name }}</a-select-option>
            </template>
          </a-select>
        </st-form-item>
        <st-form-item v-if="isShowLevel">
          <template slot="label">
              教练等级<st-help-tooltip id="TBCE003" />
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
        <st-form-item label="所属门店" required>
          <shop-select
            mode="multiple"
            placeholder="选择"
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
        <st-form-item label="登录账号">
          <a-input
            placeholder="6-18个字符，可使用字母、数字、下划线"
            v-decorator="['account',
            { rules: [{
                required: isChoosePermission,
                message: '请输入登录账号'
              }],
              initialValue: ''
            }]"
          ></a-input>
        </st-form-item>
        <st-form-item label="登录密码">
          <a-input
            placeholder="6-15个字符，区分大小写"
            v-decorator="['password',
            { rules: [{
                required: isChoosePermission,
                message: '请输入登录密码'
              }],
              initialValue: ''
            }]"
          ></a-input>
        </st-form-item>
        <st-form-item label="确认密码">
          <a-input
            placeholder="请再次填写密码"
            v-decorator="['repeat_password',
            { rules: [{
                required: isChoosePermission,
                message: '请输入确认密码'
              }],
              initialValue: ''
            }]"
          ></a-input>
        </st-form-item>
      </a-col>
    </a-row>

    <a-row :gutter="8">
      <a-col :offset="2">
        <st-form-item class="mg-l24" labelOffset>
          <st-button class="mg-l16" @click="goNext" type="primary">保存，继续填写细信息</st-button>
        </st-form-item>
      </a-col>
    </a-row>
  </st-form>
</template>
<script>
import CoachLevelSelect from '@/views/biz-components/coach-level-select'
import { RuleConfig } from '@/constants/staff/rule'
import { UserService } from '@/services/user.service'
import { AddService } from '../add.service'
import ShopSelect from '@/views/biz-components/shop-select'
import DepartmentSelect from '@/views/biz-components/department-select'
export default {
  name: 'StaffDetailBasics',
  serviceInject() {
    return {
      rules: RuleConfig,
      userService: UserService,
      addService: AddService
    }
  },
  rxState() {
    return {
      codeList: this.addService.codeList$,
      roleList: this.addService.roleList$,
      enums: this.userService.staffEnums$
    }
  },
  data() {
    return {
      choosed_code_id: 37, // 手机号地域编号
      choosed_id_type: 1, // 选中证件类型编号
      form: this.$form.createForm(this),
      fileList: [],
      faceList: [],
      isChoosePermission: false,
      isAdd: [],
      addflag: true,
      isShowLevel: false, // 是否展示教练等级
      treeExpandedKeys: [],
      value: undefined
    }
  },
  components: {
    ShopSelect,
    DepartmentSelect,
    CoachLevelSelect
  },
  methods: {
    onSelectIdtype() {},
    getIsCoach(data) {
      console.log('watch new', data)
      let flag = data.some(val => {
        return val === 3 || val === 4
      })
      if (!flag) {
        this.$emit('deletStep')
        this.isShowLevel = false
        this.addflag = true
      } else {
        if (!this.addflag) return
        this.isShowLevel = data.some(val => {
          return val === 4
        })
        this.$emit('addStep')
        this.addflag = false
      }
    },
    permissionChange(e) {
      this.isChoosePermission = e.target.checked
      this.$nextTick(() => {
        this.form.validateFields(['account'], { force: true })
        this.form.validateFields(['password'], { force: true })
        this.form.validateFields(['repeat_password'], { force: true })
      })
    },
    onChange(value) {
      console.log('选择部门', value)
      this.value = value
    },
    // 继续填写跳转到编辑
    goNext(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.submit(values)
        }
      })
    },
    /**
     * saveOrgoNext 0 保存 1 跳转到编辑
     */
    submit(data) {
      data.is_permission = +this.isChoosePermission
      data.entry_date = moment(data.entry_date).format('YYYY-MM-DD')
      data.country_code_id = this.choosed_code_id
      data.id_type = this.choosed_id_type
      data.image_avatar && (data.image_avatar = data.image_avatar[0])
      data.image_face && (data.image_face = data.image_face[0])
      this.addService.addStaff(data).subscribe(res => {
        this.$router.push({
          name: 'brand-staff-edit',
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
