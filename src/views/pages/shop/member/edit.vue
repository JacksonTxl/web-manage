<template>
  <st-panel app>
    <st-form :form="form" @submit="save" class="page-add-container">
      <a-row :gutter="8">
        <a-col :lg="10" :xs="22" :offset="1">
          <st-form-item label="姓名" required>
            <a-input placeholder="支持中英文,不超过15个字" v-decorator="rules.member_name" />
          </st-form-item>
          <st-form-item label="性别">
            <a-radio-group v-decorator="rules.sex">
              <a-radio
                v-for="(item, index) in staffEnums.sex.value"
                :key="index"
                :value="+index"
              >{{item}}</a-radio>
            </a-radio-group>
          </st-form-item>
          <st-form-item label="生日" >
            <a-date-picker style="width:100%" v-decorator="rules.birthday"/>
          </st-form-item>
          <st-form-item label="证件">
            <a-input-group compact>
              <a-select style="width:25%" v-model="id_card_type" @change="chooseType">
                <a-select-option v-for="(item, index) in staffEnums.id_type.value" :key="index" :value="+index">{{item}}</a-select-option>
              </a-select>
              <a-input style="width: 75%" :placeholder="dateinit ? dateinit : '请输入身份证号码'" v-decorator="rules.id_card"/>
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
              <a-select-option v-for="(item, index) in countryInfo" :key="index" :value="+item.id">{{item.name}}</a-select-option>
            </a-select>
          </st-form-item>
          <st-form-item label="民族">
            <a-select placeholder="请选择" v-decorator="rules.nation">
              <a-select-option v-for="(item, index) in nations" :key="index" :value="item.id">{{item.name}}</a-select-option>
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
            <a-input-group compact>
              <a-select style="width:25%" v-model="country_prefix">
                <a-select-option
                  :value="code.code_id"
                  v-for="code in countryList"
                  :key="code.code_id"
                >+{{code.phone_code}}</a-select-option>
              </a-select>
              <a-input style="width:75%"  placeholder="请输入手机号" v-decorator="rules.mobile"/>
            </a-input-group>
          </st-form-item>
          <!-- 这个版本不上 -->
          <!-- <st-form-item label="微信号" >
            <a-input placeholder="支持中英文、数字,不超过10个字" v-decorator="rules.wechat" :disabled="true"/>
          </st-form-item> -->
           <st-form-item label="详细住址" >
            <a-input placeholder="请输入详细住址" v-decorator="rules.living_address"/>
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
import { MessageService } from '@/services/message.service'
import { PatternService } from '@/services/pattern.service'
export default {
  serviceInject() {
    return {
      editService: EditService,
      userService: UserService,
      regionService: RegionService,
      messageService: MessageService,
      pattern: PatternService
    }
  },
  rxState() {
    return {
      info: this.editService.info$,
      staffEnums: this.userService.staffEnums$,
      countryInfo: this.editService.countryInfo$,
      nations: this.editService.nations$,
      countryList: this.editService.countryList$
    }
  },
  data() {
    return {
      form: this.$form.createForm(this),
      dateinit: '',
      rules: {
        member_name: ['member_name', { rules: [{ required: true, message: '用户名支持1-15位中英文数字', pattern: this.pattern.CN_EN_NUM_SPACE('1-15') }] }],
        sex: ['sex'],
        country_id: ['country_id'],
        nation: ['nation'],
        birthday: ['birthday'],
        education_level: ['education_level'],
        id_card_type: ['id_card_type'],
        jobs: ['jobs'],
        id_card: ['id_card', { rules: [{ message: '证件信息支持中英文输入', pattern: this.pattern.ID }] }],
        income_level: ['income_level'],
        married_type: ['married_type'],
        fitness_goal: ['fitness_goal'],
        has_children: ['has_children'],
        fitness_level: ['fitness_level'],
        email: ['email', { rules: [{ message: '请输入正确的邮箱地址', pattern: this.pattern.EMAIL }] }],
        mobile: ['mobile', { rules: [{ required: true, message: '请输入正确的手机号', pattern: this.pattern.MOBILE }] }],
        wechat: ['wechat'],
        cascader: ['cascader'],
        country_prefix: ['country_prefix'],
        living_address: ['living_address']
      },
      options: [],
      fieldNames: { label: 'name', value: 'id', children: 'children' },
      id_card_type: '',
      country_prefix: ''
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
          values.province_id = values.cascader[0] || 110000
          values.city_id = values.cascader[1] || 110100
          values.district_id = values.cascader[2] || 110101
          // 身份前缀
          values.id_card_type = this.id_card_type
          // 手机前缀
          values.country_prefix = this.country_prefix
          delete values.cascader
        }
        this.editService.updateMemberEdit(this.id, values).subscribe(res => {
          this.messageService.success({ content: '修改成功' })
          this.$router.go(-1)
        })
      })
    },
    setEditInfo(obj) {
      console.log(obj)
      this.form.setFieldsValue({
        member_name: obj.member_name,
        sex: obj.sex === 0 ? 1 : obj.sex,
        country_id: obj.country.id === 0 ? 1 : obj.country.id,
        nation: obj.nation.id === 0 ? 1 : obj.nation.id,
        birthday: obj.birthday ? moment(obj.birthday) : null,
        education_level: +obj.education_level,
        id_card_type: obj.id_card_type === 0 ? 1 : obj.id_card_type,
        jobs: obj.jobs,
        id_card: obj.id_card,
        income_level: obj.income_level,
        married_type: obj.married_type,
        fitness_goal: obj.fitness_goal,
        has_children: obj.has_children === 0 ? 1 : obj.has_children,
        fitness_level: obj.fitness_level,
        email: obj.email,
        mobile: obj.mobile,
        wechat: obj.wechat,
        cascader: [obj.province_id, obj.city_id, obj.district_id],
        country_prefix: obj.country_prefix === 0 ? 1 : obj.country_prefix,
        living_address: obj.living_address
      })
      this.id_card_type = obj.id_card_type === 0 ? 1 : obj.id_card_type
      this.country_prefix = obj.country_prefix === 0 ? 1 : obj.country_prefix
      this.id = obj.id
    }
  },
  mounted() {
    this.options = JSON.parse(window.localStorage.getItem('regionTree'))
    this.editService.serviceInit(this.$route.query.id).subscribe(res => {
      setTimeout(() => {
        this.setEditInfo(this.info)
      })
    })
  }
}
</script>
