<template>
  <st-form :form="form" @submit="save">
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
            v-decorator="rules.image_avatar"
          ></st-image-upload>
        </st-form-item>
        <st-form-item label="姓名" required>
          <a-input placeholder="支持中英文、数字、不超过15个字" max="15" v-decorator="rules.staff_name"/>
        </st-form-item>
        <st-form-item label="手机号" required>
          <a-input-group compact>
            <a-select style="width: 15%;" v-model="choosed_code_id">
              <template v-for="item in countryList">
                <a-select-option :key="item.code_id" :value="item.code_id">+{{ item.phone_code }}</a-select-option>
              </template>
            </a-select>
            <a-input style="width: 85%" v-decorator="rules.phone" placeholder="请输入手机号"/>
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
          <st-image-upload
            @change="faceChange"
            width="164px"
            height="164px"
            :list="faceList"
            :sizeLimit="2"
            placeholder="上传人脸"
            v-decorator="rules.image_face"
          ></st-image-upload>
        </st-form-item>
        <st-form-item label="昵称" required>
          <a-input placeholder="支持中英文、数字,不超过1   0个字" v-decorator="rules.nickname"/>
        </st-form-item>
        <st-form-item label="邮箱" required>
          <a-input placeholder="请输入邮箱" v-decorator="rules.mail"/>
        </st-form-item>
        <st-form-item label="证件" required>
          <a-input-group compact>
            <a-select style="width: 20%;" @change="onSelectIdtype" v-model="choosed_id_type">
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
        <st-form-item label="员工职能" required>
          <a-checkbox-group v-decorator="rules.identity" @change="watchChooesed">
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
          <a-tree-select
            showSearch
            :value="value"
            :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
            placeholder="请选择部门"
            allowClear
            treeDefaultExpandAll
            @change="onChange"
          >
            <a-tree-select-node value="parent 1" title="parent 1" key="0-1">
              <a-tree-select-node value="parent 1-0" title="parent 1-0" key="0-1-1">
                <a-tree-select-node :selectable="false" value="leaf1" title="my leaf" key="random"/>
                <a-tree-select-node value="leaf2" title="your leaf" key="random1"/>
              </a-tree-select-node>
              <a-tree-select-node value="parent 1-1" title="parent 1-1" key="random2">
                <a-tree-select-node value="sss" key="random3">
                  <b style="color: #08c" slot="title">sss</b>
                </a-tree-select-node>
              </a-tree-select-node>
            </a-tree-select-node>
          </a-tree-select>
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
            <template v-for="(item,key) in enums.nature_work.value">
              <a-select-option :key="item" :value="+key">{{ item }}</a-select-option>
            </template>
          </a-select>
        </st-form-item>
        <st-form-item label="教练等级" v-if="isShowLevel">
          <a-select v-decorator="rules.coach_levelRule" placeholder="请选择">
            <a-select-option :value="1">等级1</a-select-option>
            <a-select-option :value="2">等级2</a-select-option>
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
        <st-form-item label="所属门店">
          <span>门店维度下没有选择门店的权力记着加当前门店名称 0.0 </span>
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
        <st-form-item label="系统权限" required>
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
          <st-button type="primary" ghost html-type="submit">保存</st-button>
          <st-button class="mg-l16" @click="goNext" type="primary">继续 填写</st-button>
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
export default {
  name: 'StaffDetailBasics',
  serviceInject() {
    return {
      rules: RuleConfig,
      userservice: UserService,
      addservice: AddService,
      message: MessageService
    }
  },
  props: {
    enums: {
      type: Object
    }
  },
  data() {
    return {
      choosed_code_id: 37, // 手机号地域编号
      choosed_id_type: 1, // 选中证件类型编号
      form: this.$form.createForm(this),
      fileList: [],
      faceList: [],
      countryList: [],
      isChoosePermission: false,
      isAdd: [],
      addflag: true,
      isShowLevel: false, // 是否展示教练等级

      treeExpandedKeys: [],
      value: undefined
    }
  },
  watch: {
    isAdd(a) {
      // 监听是否选中了教练
      console.log('watch new', a)
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
  methods: {
    watchChooesed(e) {
      this.isAdd = e
      // console.log(this.isAdd)
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
    onSelectIdtype(e) {
      console.log('证件选择', e)
    },
    imageUploadChange(data) {
      this.form.setFieldsValue({
        image_avatar: {
          image_url: data.image_url ? data.image_url : ''
        }
      })
    },
    faceChange(data) {
      this.form.setFieldsValue({
        image_face: {
          image_url: data.image_url ? data.image_url : ''
        }
      })
    },
    // 继续填写跳转到编辑
    goNext() {
      e.preventDefault()
      // this.$emit('skiptoedit', {
      //   id: 1,
      //   isShowLevel: this.isShowLevel
      // })
      // return
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          this.submit(values, 1)
        }
      })
    },
    // 保存
    save(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.submit(values, 0)
        }
      })
    },
    /**
     * saveOrgoNext 0 保存 1 跳转到编辑
     */
    submit(data, saveOrgoNext) {
      // this.isChoosePermission ? (data.is_permission = 1) : (data.is_permission = 0)
      data.is_permission = +this.isChoosePermission
      data.entry_date = moment(data.entry_date).format('YYYY-MM-DD')
      data.country_code_id = this.choosed_code_id
      data.id_type = this.choosed_id_type
      this.addservice.addStaff(data).subscribe(res => {
        if (saveOrgoNext === 1) {
          console.log(res)
          //  this.$emit('skiptoedit', {
          //     id: 1,
          //     isShowLevel: this.isShowLevel
          //   })
        } else {
          this.message.success({ content: '添加员工成功' })
          this.$router.go(-1)
        }
      })
    }
  },
  mounted() {
    this.addservice.getCountryCodes().subscribe(res => {
      this.countryList = res.code_list
    })
  }
}
</script>
