<template>
  <st-panel app>
    <st-form :form="form" @submit="save" class="page-add-container">
      <a-row :gutter="8">
        <a-col :lg="10" :xs="22" :offset="1">
          <!-- <st-form-item label="门店">
            <a-input :disabled="true" v-decorator="rules.md"/>
          </st-form-item> -->
          <st-form-item label="姓名" required>
            <a-input placeholder="支持中英文,不超过15个字" v-decorator="rules.member_name"/>
          </st-form-item>
          <st-form-item label="手机号" required>
            <a-input-group compact>
              <a-select style="width:30%" v-model="country_prefix" v-if="countryList" placeholder="请选择">
                <a-select-option
                  :value="code.code_id"
                  v-for="code in countryList.code_list"
                  :key="code.code_id"
                >+{{code.phone_code}}</a-select-option>
              </a-select>
              <a-input style="width:70%" placeholder="请输入手机号" v-decorator="rules.mobile"/>
            </a-input-group>
          </st-form-item>
          <st-form-item label="来源类别">
            <a-select placeholder="请选择来源类别" v-decorator="rules.register_type" @change="onChangCategory">
              <a-select-option
                v-for="(item, index) in memberEnums.source_category.value"
                :key="index"
                :value="+index"
              >{{item}}</a-select-option>
            </a-select>
          </st-form-item>
          <st-form-item label="来源方式">
            <a-select placeholder="请选择来源方式" v-decorator="rules.register_way">
              <template v-if="source_category === 1">
                <a-select-option
                  v-for="(item, index) in memberEnums.online.value"
                  :key="index"
                  :value="+index"
                >{{item}}</a-select-option>
              </template>
              <template v-if="source_category === 2">
                <a-select-option
                  v-for="(item, index) in memberEnums.offline.value"
                  :key="index"
                  :value="+index"
                >{{item}}</a-select-option>
              </template>

            </a-select>
          </st-form-item>
        </a-col>
        <a-col :lg="10" :xs="22" :offset="1">
          <st-form-item label="用户人脸">
            <st-face-upload
              width="264px"
              height="264px"
              :list="faceList"
              placeholder="会员人脸信息"
              v-decorator="rules.faceInfo"
            ></st-face-upload>
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
          <st-form-item label="性别">
            <a-radio-group v-decorator="rules.sex">
               <a-radio
                v-for="(item, index) in staffEnums.sex.value"
                :key="index"
                :value="+index"
              >
                {{item}}
                <st-icon type="female" v-if="index == 1" style="color:#FF5E41"></st-icon>
                <st-icon type="male" v-if="index == 2"  style="color:#3F66F6"></st-icon>
              </a-radio>
            </a-radio-group>
          </st-form-item>
          <st-form-item label="生日">
            <a-date-picker v-decorator="rules.birthday" style="width:100%"/>
          </st-form-item>
          <st-form-item label="国籍">
            <a-select placeholder="请选择" v-decorator="rules.country_id">
              <a-select-option
                v-for="(item, index) in countryInfo"
                :key="index"
                :value="item.id"
              >{{item.name}}</a-select-option>
            </a-select>
          </st-form-item>
          <st-form-item label="民族">
            <a-select placeholder="请选择" v-decorator="rules.nation_id">
              <a-select-option
                v-for="(item, index) in nations"
                :key="index"
                :value="item.id"
              >{{item.name}}</a-select-option>
            </a-select>
          </st-form-item>
          <st-form-item label="学历">
            <a-select placeholder="请选择学历" v-decorator="rules.education_level">
              <a-select-option
                v-for="(item, index) in staffEnums.education.value"
                :key="index"
                :value="+index"
              >{{item}}</a-select-option>
            </a-select>
          </st-form-item>
          <st-form-item label="职业">
            <a-input placeholder="请输入职业" v-decorator="rules.jobs"/>
          </st-form-item>
          <st-form-item label="收入水平">
            <a-input placeholder="请输入收入水平" v-decorator="rules.income_level"/>
          </st-form-item>
          <st-form-item label="证件类型">
            <a-select v-decorator="rules.id_card_type" placeholder="请选择" @change="chooseType">
              <a-select-option
                v-for="(item, index) in staffEnums.id_type.value"
                :key="index"
                :value="+index"
              >{{item}}</a-select-option>
            </a-select>
          </st-form-item>
          <st-form-item label="证件号">
            <a-input :placeholder="dateinit ? dateinit : '请输入身份证号码'" v-decorator="rules.id_card"/>
          </st-form-item>
        </a-col>
        <a-col :lg="10" :xs="22" :offset="1">
          <st-form-item label="身高">
            <st-input-number v-decorator="rules.height" :float="true" placeholder="请输入身高">
              <template slot="addonAfter">CM</template>
            </st-input-number>
          </st-form-item>
          <st-form-item label="体重">
            <st-input-number v-decorator="rules.weight" :float="true" placeholder="请输入体重">
              <template slot="addonAfter">KG</template>
            </st-input-number>
          </st-form-item>
          <st-form-item label="健身目标">
            <a-input v-decorator="rules.fitness_goal" placeholder="请输入健身目标"/>
          </st-form-item>
          <st-form-item label="健身等级">
            <a-rate v-decorator="rules.fitness_level" allowHalf/>
          </st-form-item>
          <st-form-item label="婚姻状况">
            <a-select placeholder="请选择" v-decorator="rules.married_type">
              <a-select-option
                v-for="(item, index) in staffEnums.marry_status.value"
                :key="index"
                :value="+index"
              >{{item}}</a-select-option>
            </a-select>
          </st-form-item>
          <st-form-item label="子女状态">
            <a-select placeholder="请选择" v-decorator="rules.has_children">
              <a-select-option
                v-for="(item, index) in staffEnums.children_status.value"
                :key="index"
                :value="+index"
              >{{item}}</a-select-option>
            </a-select>
          </st-form-item>
          <st-form-item label="邮箱">
            <a-input placeholder="请输入邮箱" v-decorator="rules.email"/>
          </st-form-item>
          <st-form-item label="家庭住址">
            <a-cascader
              :options="options"
              v-decorator="rules.cascader"
              :fieldNames="fieldNames"
              @change="onChange"
              placeholder="请选择省/市/区/县"
            />
          </st-form-item>
          <st-form-item label="详细住址">
            <a-input placeholder="填写点什么吧" v-decorator="rules.living_address"></a-input>
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
      memberEnums: this.userService.memberEnums$,
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
        md: ['md'],
        member_name: [
          'member_name',
          { rules: [{ required: true, message: '用户名支持1-15位中英文数字', pattern: this.pattern.CN_EN_NUM_SPACE('1-15') }] }
        ],
        country_prefix: ['country_prefix', { initialValue: 37 }],
        mobile: [
          'mobile',
          {
            rules: [{ required: true, message: '请输入手机号', pattern: this.pattern.MOBILE }]
          }
        ],
        // 来源渠道
        register_type: ['register_type'],
        // 来源方式
        register_way: ['register_way'],
        faceInfo: ['faceInfo'],

        sex: ['sex'],
        birthday: ['birthday'],
        country_id: ['country_id'],
        nation_id: ['nation_id'],
        education_level: ['education_level'],
        jobs: ['jobs'],
        income_level: ['income_level'],
        id_card_type: ['id_card_type'],
        id_card: ['id_card', { rules: [{ message: '证件信息支持中英文输入', pattern: this.pattern.ID }] }],

        height: ['height'],
        weight: ['weight'],
        fitness_goal: ['fitness_goal'],
        fitness_level: ['fitness_level'],
        married_type: ['married_type'],
        has_children: ['has_children'],
        email: ['email', { rules: [{ message: '请输入正确的邮箱地址', pattern: this.pattern.EMAIL }] }],
        cascader: ['cascader'],
        living_address: ['living_address']

      },
      options: [],
      fieldNames: { label: 'name', value: 'id', children: 'children' },
      id_card_type: undefined,
      faceList: [],
      country_prefix: 37,
      source_category: -1
    }
  },
  methods: {
    // 来源方式发生改变
    onChangCategory(event) {
      this.source_category = event
    },
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
          values.province_id = values.cascader[0]
          values.city_id = values.cascader[1]
          values.district_id = values.cascader[2]
          // 身份前缀
          values.id_card_type = this.id_card_type
          // 人脸信息
          values.image_face = this.faceList[0] || {}
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
      const cascader = []
      if (obj.province_id) {
        cascader.push(cascader)
      }
      if (obj.city_id) {
        cascader.push(cascader)
      }
      if (obj.district_id) {
        cascader.push(cascader)
      }
      this.form.setFieldsValue({
        member_name: obj.member_name,
        sex: +obj.sex || undefined,
        country_id: +obj.country.id || undefined,
        nation_id: +obj.nation.id || undefined,
        birthday: obj.birthday ? moment(obj.birthday) : null,
        education_level: +obj.education_level || undefined,
        id_card_type: +obj.id_card_type || undefined,
        height: obj.height,
        weight: obj.weight,
        jobs: obj.jobs,
        id_card: obj.id_card,
        income_level: obj.income_level,
        married_type: +obj.married_type || undefined,
        fitness_goal: obj.fitness_goal,
        has_children: +obj.has_children || undefined,
        register_type: +obj.register_type || undefined,
        register_way: +obj.register_way || undefined,
        fitness_level: obj.fitness_level,
        email: obj.email,
        mobile: obj.mobile,
        wechat: obj.wechat,
        cascader: cascader,
        country_prefix: +obj.country_prefix || undefined,
        living_address: obj.living_address
      })
      this.id_card_type = +obj.id_card_type || undefined
      this.country_prefix = +obj.country_prefix || undefined
      this.id = obj.id
      this.faceList = [obj.image_face]
      this.source_category = +obj.register_type
    }
  },
  mounted() {
    this.options = JSON.parse(window.localStorage.getItem('regionTree'))
    this.editService.serviceInit(this.$route.query.id).subscribe(res => {
      setTimeout(() => {
        this.setEditInfo(this.info)
        this.form.validateFields()
      })
    })
  }
}
</script>
