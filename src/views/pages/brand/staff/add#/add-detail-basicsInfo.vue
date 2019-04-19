<template>
  <st-form :form="form" @submit="save" class="page-add-container">
    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item label="员工头像">
          <st-image-upload
            width="164px"
            height="164px"
            :sizeLimit="2"
            placeholder="上传头像"
            v-decorator="basicInfoRuleList.image_avatar"
          ></st-image-upload>
        </st-form-item>
      </a-col>
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item label="员工人脸">
          <st-image-upload
            width="164px"
            height="164px"
            :sizeLimit="2"
            placeholder="上传人脸"
            v-decorator="basicInfoRuleList.image_face"
          ></st-image-upload>
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item label="姓名" required>
          <a-input placeholder="支持中英文、数字,不超过10个字" v-decorator="basicInfoRuleList.usernameRule"/>
        </st-form-item>
        <st-form-item label="手机号" required>
          <a-input-group compact>
            <a-select style="width: 15%;" v-decorator="basicInfoRuleList.country_codeRule">
              <a-select-option
                :value="code.code_id"
                v-for="code in codeList.code_list"
                :key="code.code_id"
              >+{{code.phone_code}}</a-select-option>
            </a-select>
            <a-input
              style="width: 85%"
              placeholder="请输入手机号"
              v-decorator="basicInfoRuleList.phoneRule"
            />
          </a-input-group>
        </st-form-item>
        <st-form-item label="性别" required>
          <a-select v-decorator="basicInfoRuleList.genderRule" placeholder="请选择">
            <a-select-option :value="0">未选择</a-select-option>
            <a-select-option :value="2">男</a-select-option>
            <a-select-option :value="1">女</a-select-option>
          </a-select>
        </st-form-item>
      </a-col>
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item label="昵称" required>
          <a-input placeholder="请输入昵称" v-decorator="basicInfoRuleList.nicknameRule"/>
        </st-form-item>
        <st-form-item label="工号">
          <a-input placeholder="请输入员工工号" v-decorator="basicInfoRuleList.staff_numRule"></a-input>
        </st-form-item>
        <st-form-item label="证件" required>
          <a-input-group compact>
            <a-select
              style="width:20%"
              v-decorator="basicInfoRuleList.id_typeRule"
              @change="chooseType"
            >
              <a-select-option :value="1">身份证</a-select-option>
              <a-select-option :value="2">护照</a-select-option>
            </a-select>
            <a-input
              style="width: 80%"
              :placeholder="dateinit"
              v-decorator="basicInfoRuleList.idcardRule"
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
      <a-col :offset="1" :lg="22">
        <st-form-item label="员工职能">
          <a-checkbox-group v-decorator="basicInfoRuleList.identityRule" @change="watchChooesed">
            <a-checkbox :value="1">普通员工</a-checkbox>
            <a-checkbox :value="2">会籍销售</a-checkbox>
            <a-checkbox :value="3">团课教练</a-checkbox>
            <a-checkbox :value="4">私人教练</a-checkbox>
            <a-checkbox :value="5">游泳教练</a-checkbox>
          </a-checkbox-group>
        </st-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item label="部门">
          <a-select v-decorator="basicInfoRuleList.departmentRule" placeholder="请选择">
            <a-select-option :value="1">部门1</a-select-option>
            <a-select-option :value="2">部门2</a-select-option>
          </a-select>
        </st-form-item>
        <st-form-item label="教练等级" v-if="isShowLevel">
          <a-select v-decorator="basicInfoRuleList.coach_levelRule" placeholder="请选择">
            <a-select-option :value="1">等级1</a-select-option>
            <a-select-option :value="2">等级2</a-select-option>
          </a-select>
        </st-form-item>
        <st-form-item label="入职时间">
          <a-date-picker v-decorator="basicInfoRuleList.entry_dateRule" style="width:100%"/>
        </st-form-item>
        <st-form-item label="所属门店">
          <a-select
            mode="multiple"
            placeholder="选择"
            v-decorator="basicInfoRuleList.shopRule"
          >
            <a-select-option :value="1">门店1</a-select-option>
            <a-select-option :value="2">门店2</a-select-option>
          </a-select>
        </st-form-item>
      </a-col>
      <a-col :lg="10" :xs="22" :offset="2">
        <st-form-item label="职务">
          <a-input placeholder="填写点什么吧" v-decorator="basicInfoRuleList.working_postRule"></a-input>
        </st-form-item>
        <st-form-item label="工作性质">
          <a-select v-decorator="basicInfoRuleList.nature_workRule" placeholder="请选择">
            <!-- 1-全职；2-兼职；3-实习 -->
            <a-select-option :value="1">全职</a-select-option>
            <a-select-option :value="2">简直</a-select-option>
            <a-select-option :value="3">实习</a-select-option>
          </a-select>
        </st-form-item>
        <st-form-item label="系统角色">
           <a-select
            mode="multiple"
            placeholder="请选择"
            v-decorator="basicInfoRuleList.roleRule"
          >
             <a-select-option :value="1">角色1</a-select-option>
            <a-select-option :value="2">角色2</a-select-option>
          </a-select>
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
        <st-form-item label="系统权限">
          <a-checkbox
            v-decorator="basicInfoRuleList.is_permissionRule"
            @change="permissionChange"
          >开通系统使用权限</a-checkbox>
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
      <a-col :lg="10" :xs="22" :offset="2"></a-col>
    </a-row>

    <a-row :gutter="8">
      <a-col :offset="2">
        <st-form-item class="mg-l24" labelOffset>
          <st-button type="primary" ghost html-type="submit">保存</st-button>
          <st-button class="mg-l16" @click="skiptoedit" type="primary">继续 填写</st-button>
        </st-form-item>
      </a-col>
    </a-row>
  </st-form>
</template>
<script>
export default {
  name: 'StaffDetailBasics',
  data() {
    return {
      form: this.$form.createForm(this),
      basicInfoRuleList: {
        image_avatar: ['image_avatar', { initialValue: '' }],
        image_face: ['image_face', { initialValue: '' }],
        // 姓名
        usernameRule: [
          'staff_name',
          { rules: [{ required: true, message: '请填写姓名', max: 10 }] }
        ],
        // 昵称
        nicknameRule: [
          'nickname',
          { rules: [{ required: true, message: '请填写昵称' }] }
        ],
        // 国家编码
        country_codeRule: ['country_code_id', { initialValue: 37 }],
        // 手机号
        phoneRule: [
          'mobile',
          {
            rules: [
              {
                required: true,
                message: '手机号格式错误',
                pattern: /^1[34578]\d{9}$/
              }
            ]
          }
        ],
        // 工号
        staff_numRule: ['staff_num', { initialValue: '' }],
        // 性别
        genderRule: [
          'sex',
          {
            initialValue: 2,
            rules: [{ required: true, message: '请选择你的性别' }]
          }
        ],
        // 证件类型
        id_typeRule: ['id_type', { initialValue: 1 }],
        // 证件号码
        idcardRule: [
          'id_number',
          {
            rules: [
              {
                required: true,
                message: '请填写正确的身份证号',
                pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
              }
            ]
          }
        ],
        // 身份
        identityRule: ['identity', { initialValue: [1] }],
        // 部门
        departmentRule: ['department_id', { initialValue: 1 }],
        // 教练等级ID
        coach_levelRule: ['coach_level_id', { initialValue: 1 }],
        // 入职时间
        entry_dateRule: ['entry_date', { initialValue: '' }],
        // 所属门店 // 多选select
        shopRule: ['shop_id', { initialValue: [] }],
        // 职务
        working_postRule: ['working_post', { initialValue: '' }],
        // 工作性质
        nature_workRule: ['nature_workRule', { initialValue: 1 }],
        // 角色 // 多选select
        roleRule: ['role_id', { initialValue: [] }],
        // 系统权限
        is_permissionRule: ['is_permission', { initialValue: 0 }]
      },

      isAdd: [],
      addflag: true,
      isShowLevel: false, // 是否展示教练等级
      dateinit: '请输入身份证号码',
      isChoosePermission: false
    }
  },
  watch: {
    isAdd(a) {
      // 监听是否选中了教练
      let flag = a.some(val => {
        return val === 4 || val === 5
      })
      if (!flag) {
        this.$emit('deletStep')
        this.isShowLevel = false
        this.addflag = true
      } else {
        if (!this.addflag) return
        this.isShowLevel = true
        this.$emit('addStep')
        this.addflag = false
      }
    }
  },
  props: {
    codeList: {
      type: Object,
      default: () => []
    }
  },
  methods: {
    // 身份证 护照 选择事件
    chooseType(e) {
      let { tip1, tip2 } = {
        tip1: '请输入身份证号码',
        tip2: '请输入护照号码'
      }
      e === 1 ? (this.dateinit = tip1) : (this.dateinit = tip2)
    },
    // 员工职能 选择事件
    watchChooesed(e) {
      this.isAdd = e
      console.log(this.isAdd)
    },
    permissionChange(e) {
      this.isChoosePermission = e.target.checked
      this.$nextTick(() => {
        this.form.validateFields(['account'], { force: true })
        this.form.validateFields(['password'], { force: true })
        this.form.validateFields(['repeat_password'], { force: true })
      })
    },
    skiptoedit() {
      // this.$emit('skiptoedit', {
      //   // formData: this.form.getFieldsValue()
      // })
      // return
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          this.$emit('skiptoedit', this.form.getFieldsValue())
        }
      })
    },
    save(e) {
      // form submit
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          //  console.log('Received values of form: ', values)
          values.entry_date = values.entry_date
            ? values.entry_date.format('YYYY-MM-DD')
            : ''
          // console.log('Received values of form: ', values)
          let testData = {
            staff_name: '张三',
            nickname: '里斯',
            country_code_id: 37,
            mobile: '13012345678',
            mail: 'styn@sin.com',
            sex: 1,
            staff_num: '007',
            id_type: 1,
            id_number: 152716192809001122,
            department_id: 1,
            image_avatar: 'image_avatar',
            image_face: 'image_avatar',
            working_post: '董事长',
            identity: [1, 2, 3],
            coach_level_id: 1,
            nature_work: 1,
            entry_date: '1901-01-01',
            role_id: [1, 2, 3],
            shop_id: [1, 2, 3],
            is_permission: 1,
            account: '123',
            password: '123',
            repeat_password: '123'
          }
          this.$emit('basicInfoSave', values)
        }
      })
    }
  },
  mounted() {}
}
</script>
