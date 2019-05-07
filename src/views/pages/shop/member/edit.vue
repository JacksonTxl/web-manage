<template>
  <st-panel app>
    <st-form :form="form" @submit="save" class="page-add-container">
      <a-row :gutter="8">
        <a-col :lg="10" :xs="22" :offset="1">
          <st-form-item label="姓名" required>
            <a-input placeholder="支持中英文、数字,不超过10个字" v-decorator="rules.member_name" />
          </st-form-item>
          <st-form-item label="性别">
            <a-select placeholder="请选择" v-decorator="rules.sex">
              <a-select-option v-for="(item, index) in staffEnums.sex.value" :key="index" :value="+index">{{item}}</a-select-option>
            </a-select>
          </st-form-item>
          <st-form-item label="生日" >
            <a-date-picker style="width:100%" v-decorator="rules.birthday"/>
          </st-form-item>
          <st-form-item label="证件">
            <a-input-group compact>
              <a-select style="width:20%" v-decorator="rules.id_card_type" change="chooseType">
                <a-select-option v-for="(item, index) in staffEnums.id_type.value" :key="index" :value="+index">{{item}}</a-select-option>
              </a-select>
              <a-input style="width: 80%" :placeholder="dateinit ? dateinit : '请输入身份证号码'" v-decorator="rules.id_card"/>
            </a-input-group>
          </st-form-item>
          <st-form-item label="婚姻状况">
            <a-select placeholder="请选择" v-decorator="rules.married_type">
               <a-select-option v-for="(item, index) in staffEnums.marry_status.value" :key="index" :value="+index">{{item}}</a-select-option>
            </a-select>
          </st-form-item>
          <st-form-item label="子女状态">
            <a-select placeholder="请选择" v-decorator="rules.has_children">
             <a-select-option v-for="(item, index) in staffEnums.children_status.value" :key="index" :value="+index">{{item}}</a-select-option>
            </a-select>
          </st-form-item>
          <st-form-item label="健身等级" >
             <a-rate v-decorator="rules.fitness_level" allowHalf />
          </st-form-item>
        </a-col>
        <a-col :lg="10" :xs="22" :offset="1">
          <st-form-item label="国籍">
            <a-select placeholder="请选择" v-decorator="rules.country_id">
              <a-select-option :value="0">未选择</a-select-option>
              <a-select-option :value="2">男</a-select-option>
              <a-select-option :value="1">女</a-select-option>
            </a-select>
          </st-form-item>
          <st-form-item label="民族">
            <a-select placeholder="请选择" v-decorator="rules.nation">
              <a-select-option :value="0">未选择</a-select-option>
              <a-select-option :value="2">男</a-select-option>
              <a-select-option :value="1">女</a-select-option>
            </a-select>
          </st-form-item>
          <st-form-item label="学历">
            <a-select placeholder="请选择学历" v-decorator="rules.education_level">
               <a-select-option v-for="(item, index) in staffEnums.education.value" :key="index" :value="+index">{{item}}</a-select-option>
            </a-select>
          </st-form-item>
          <st-form-item label="职业">
            <a-input placeholder="支持中英文、数字,不超过10个字" v-decorator="rules.jobs"/>
          </st-form-item>
          <st-form-item label="收入水平">
            <a-input placeholder=""  v-decorator="rules.income_level"/>
          </st-form-item>
          <st-form-item label="健身目标">
            <a-input placeholder="" v-decorator="rules.fitness_goal"/>
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
          <st-form-item label="手机号" required>
            <a-input placeholder="支持中英文、数字,不超过10个字" v-decorator="rules.mobile"/>
          </st-form-item>
          <st-form-item label="微信号" >
            <a-input placeholder="支持中英文、数字,不超过10个字" v-decorator="rules.wechat"/>
          </st-form-item>
        </a-col>
        <a-col :lg="10" :xs="22" :offset="1">
          <st-form-item label="邮箱">
            <a-input placeholder="支持中英文、数字,不超过10个字"  v-decorator="rules.email"/>
          </st-form-item>
          <st-form-item label="家庭住址" >
            <a-cascader :options="options" v-decorator="rules.cascader" :fieldNames="fieldNames" @change="onChange" placeholder="请选择省/市/区/县"/>
          </st-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="8">
        <a-col :offset="2">
          <st-form-item class="mg-l24" labelOffset>
            <st-button type="primary" ghost html-type="submit">保存</st-button>
          </st-form-item>
        </a-col>
      </a-row>
    </st-form>
  </st-panel>
</template>
<script>
import { EditService } from './edit.service'
import { UserService } from '@/services/user.service'
import { RegionService } from '@/services/region.service'
export default {
  serviceInject() {
    return {
      editService: EditService,
      userService: UserService,
      regionService: RegionService
    }
  },
  rxState() {
    return {
      info: this.editService.info$,
      staffEnums: this.userService.staffEnums$
    }
  },
  data() {
    return {
      form: this.$form.createForm(this),
      dateinit: '',
      rules: {
        member_name: ['member_name'],
        sex: ['sex'],
        country_id: ['country_id'],
        nation: ['nation'],
        birthday: ['birthday'],
        education_level: ['education_level'],
        id_card_type: ['id_card_type'],
        jobs: ['jobs'],
        id_card: ['id_card'],
        income_level: ['income_level'],
        married_type: ['married_type'],
        fitness_goal: ['fitness_goal'],
        has_children: ['has_children'],
        fitness_level: ['fitness_level'],
        email: ['email'],
        mobile: ['mobile'],
        wechat: ['wechat'],
        cascader: ['cascader']

      },
      options: [],
      fieldNames: { label: 'name', value: 'id', children: 'children' }
    }
  },
  methods: {
    onChange(e) {},
    chooseType(e) {
      let { tip1, tip2 } = {
        tip1: '请输入身份证号码',
        tip2: '请输入护照号码'
      }
      e === 1 ? (this.dateinit = tip1) : (this.dateinit = tip2)
    },
    save(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          values.birthday = values.birthday
            ? values.birthday.format('YYYY-MM-DD')
            : ''
          values.id = this.id
          values.province_id = values.cascader[0]
          values.city_id = values.cascader[1]
          values.district_id = values.cascader[2]
          delete values.cascader
          console.log('==============', values)
        }
        this.editService.updateMemberEdit(this.id, values).subscribe(res => {
          console.log('12333333333333')
        })
      })
    },
    setEditInfo(obj) {
      console.log('=========', obj)
      this.form.setFieldsValue({
        member_name: obj.member_name,
        sex: obj.sex - 0,
        country_id: obj.country.id,
        nation: obj.nation,
        birthday: obj.birthday ? moment(obj.birthday) : '',
        education_level: obj.education_level,
        id_card_type: obj.id_card_type,
        jobs: obj.jobs,
        id_card: obj.id_card,
        income_level: obj.income_level,
        married_type: obj.married_type,
        fitness_goal: obj.fitness_goal,
        has_children: obj.has_children,
        fitness_level: obj.fitness_level,
        email: obj.email,
        mobile: obj.mobile,
        wechat: obj.wechat
      })
      this.id = obj.id
    }
  },
  mounted() {
    this.options = JSON.parse(window.localStorage.getItem('regionTree'))
    this.setEditInfo(this.info)
  }
}
</script>
