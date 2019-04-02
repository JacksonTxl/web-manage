<template>

  <st-form :form="form" @submit="save" class="page-add-container">
    <a-row :gutter="8">
      <a-col :lg="10"
        :xs="22"
        :offset="1">
        <st-form-item label="员工头像">
          <a-upload class="page-add-upload" style="width:164px;display:inline-block;height:164px;"
            type="drag">
            <st-icon type="anticon:plus"></st-icon>
          </a-upload>
        </st-form-item>
        <st-form-item label="姓名" required>
          <a-input placeholder="支持中英文、数字,不超过1   0个字" v-decorator="basicInfoRuleList.usernameRule" />
        </st-form-item>
        <st-form-item label="手机号" required>
          <a-input-group compact>
            <a-select style="width: 15%;" v-decorator="basicInfoRuleList.country_codeRule">
              <a-select-option value="1">+86</a-select-option>
            </a-select>
            <a-input style="width: 85%" placeholder="请输入手机号" v-decorator="basicInfoRuleList.phoneRule"/>
          </a-input-group>
        </st-form-item>
        <st-form-item label="性别" required>
          <a-select v-decorator="basicInfoRuleList.genderRule" placeholder="请选择" >
            <a-select-option value="2">男</a-select-option>
            <a-select-option value="1">女</a-select-option>
          </a-select>
        </st-form-item>
      </a-col>
      <a-col :lg="10"
        :xs="22"
        :offset="1">
        <st-form-item label="员工人脸">
          <a-upload class="page-add-upload" style=""
            type="drag">
            <st-icon type="anticon:plus"></st-icon>
          </a-upload>
        </st-form-item>
        <st-form-item label="昵称" required>
          <a-input placeholder="请输入昵称"  v-decorator="basicInfoRuleList.nicknameRule"/>
        </st-form-item>
        <st-form-item label="工号" >
          <a-input placeholder="请输入员工工号" v-decorator="basicInfoRuleList.staff_numRule"></a-input>
        </st-form-item>
        <st-form-item label="证件" required>
          <a-input-group compact>
            <a-select  style="width:20%" v-decorator="basicInfoRuleList.id_typeRule">
              <a-select-option value="1">身份证</a-select-option>
              <a-select-option value="2">护照</a-select-option>
            </a-select>
            <a-input style="width: 80%" v-decorator="basicInfoRuleList.idcardRule"/>
          </a-input-group>
        </st-form-item>
      </a-col>
    </a-row>

    <a-row :gutter="8">
      <a-col :offset="1"
        :lg="22">
        <st-hr></st-hr>
      </a-col>
    </a-row>

    <a-row :gutter="8">
      <a-col :offset="1"
        :lg="22">
        <st-form-item
          label='身份'>
          <span slot="label">
            身份&nbsp;
            <a-tooltip placement="right"
              title="What do you want others to call you?">
              <st-icon type="anticon:question-circle-o" />
            </a-tooltip>
          </span>
          <a-checkbox-group v-decorator="basicInfoRuleList.identityRule">
            <a-checkbox value="1" :defaultChecked="defaultChecked">普通员工</a-checkbox>
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
        <st-form-item label="部门">
           <a-select v-decorator="basicInfoRuleList.departmentRule" placeholder="请选择" >
            <a-select-option value="1">黄埔</a-select-option>
            <a-select-option value="2">北大</a-select-option>
          </a-select>
        </st-form-item>
        <st-form-item label="教练等级" >
           <a-select v-decorator="basicInfoRuleList.coach_levelRule" placeholder="请选择" >
            <a-select-option value="male">男</a-select-option>
            <a-select-option value="female">女</a-select-option>
          </a-select>
        </st-form-item>
        <st-form-item label="入职时间" >
          <a-date-picker v-decorator="basicInfoRuleList.entry_dateRule"  />
        </st-form-item>
        <st-form-item label="所属门店" >
           <a-select v-decorator="basicInfoRuleList.shopRule" placeholder="请选择" >
            <a-select-option value="male">男</a-select-option>
            <a-select-option value="female">女</a-select-option>
          </a-select>
        </st-form-item>
      </a-col>
      <a-col :lg="10"
        :xs="22"
        :offset="2">
        <st-form-item label="职务">
          <a-input placeholder="填写点什么吧" v-decorator="basicInfoRuleList.working_postRule"></a-input>
        </st-form-item>
        <st-form-item label="工作性质" >
           <a-select v-decorator="basicInfoRuleList.nature_workRule" placeholder="请选择" >
             <!-- 1-全职；2-兼职；3-实习 -->
            <a-select-option value="1">全职</a-select-option>
            <a-select-option value="2">简直</a-select-option>
            <a-select-option value="3">实习</a-select-option>
          </a-select>
        </st-form-item>
        <st-form-item label="角色" >
           <a-select :v-decorator="basicInfoRuleList.roleRule" placeholder="请选择" >
            <a-select-option value="male">男</a-select-option>
            <a-select-option value="female">女</a-select-option>
          </a-select>
        </st-form-item>
      </a-col>
    </a-row>

    <a-row :gutter="8">
      <a-col :offset="1"
        :lg="22">
        <st-hr></st-hr>
      </a-col>
    </a-row>

    <a-row :gutter="8">
      <a-col :lg="10"
        :xs="22"
        :offset="1">
        <st-form-item label="系统权限">
          <a-checkbox :defaultChecked="defaultChecked" v-decorator="basicInfoRuleList.is_permissionRule">开通系统使用权限</a-checkbox>
        </st-form-item>
        <st-form-item label="登录账号" required>
          <a-input placeholder="6-18个字符，可使用字母、数字、下划线" v-decorator="basicInfoRuleList.loginRule"></a-input>
        </st-form-item>
        <st-form-item label="登录密码" required>
          <a-input placeholder="6-15个字符，区分大小写" v-decorator="basicInfoRuleList.passwordRule"></a-input>
        </st-form-item>
        <st-form-item label="确认密码" required>
          <a-input placeholder="请再次填写密码" v-decorator="basicInfoRuleList.comfirmPasswordRule"></a-input>
        </st-form-item>
      </a-col>
      <a-col :lg="10"
        :xs="22"
        :offset="2">
      </a-col>
    </a-row>

    <a-row :gutter="8">
      <a-col :offset="1"
        :lg="22">
        <st-hr></st-hr>
      </a-col>
    </a-row>

    <a-row :gutter="8">
      <a-col :offset="1">
        <st-form-item labelOffset>
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
  name: 'StaffDetailBasics',
  data() {
    return {
      form: this.$form.createForm(this),
      defaultChecked: true, // checkbox 默认选中
      basicInfoRuleList: {
        usernameRule: ['staff_name', { rules: [{ required: true, message: '请填写姓名' }] }], // 姓名
        nicknameRule: ['nickname', { rules: [{ required: true, message: '请填写昵称' }] }], // 昵称
        country_codeRule: ['country_code_id', { initialValue: '1' }], // 国家编码id，例如中国的id是37
        phoneRule: ['mobile', { rules: [{ required: true, message: '手机号格式错误', pattern: /^1[34578]\d{9}$/ }] }],
        staff_numRule: ['staff_num'], // 工号
        genderRule: ['sex', { rules: [{ required: true, message: '请选择你的性别' }] }], // 角色select rule
        id_typeRule: ['id_type', { initialValue: '1' }], // 证件类型
        idcardRule: ['id_number', { rules: [{ required: true, message: '请填写正确的身份证号', pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/ }] }],

        identityRule: ['identity'], // 身份
        departmentRule: ['department_id'], // 部门
        coach_levelRule: ['coach_level_id'], // 教练等级ID
        entry_dateRule: { // 入职时间
          rules: ['entry_date', { type: 'object', required: true, message: '请选择时间' }]
        },
        shopRule: ['shop_id'], // 所属门店
        working_postRule: ['working_post'], // 职务
        nature_workRule: ['nature_workRule'], // 工作性质
        roleRule: ['role_id'], // 角色

        is_permissionRule: ['is_permission'], // 系统权限
        loginRule: ['account', { rules: [{ required: true, message: '请输入登录账号' }] }],
        passwordRule: ['password', { rules: [{ required: true, message: '请输入登录密码' }] }],
        comfirmPasswordRule: ['repeat_password', { rules: [{ required: true, message: '请输入确认密码' }] }]
      }
    }
  },
  methods: {
    goNext() {
      this.$emit('goNext')
    },
    save(e) { // form submit
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$emit('save', {
            data: values
          })
        }
      })
    }
  }
}
</script>
