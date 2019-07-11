<template>
  <st-panel app>
    <st-form :form="form" @submit="save" class="page-add-container">
      <a-row :gutter="8">
        <a-col :lg="10" :xs="22" :offset="1">
          <!-- <st-form-item label="门店">
            <a-input :disabled="true" v-decorator="rules.md"/>
          </st-form-item> -->
          <st-form-item label="姓名" required>
            <a-input placeholder="支持中英文、数字,不超过10个字" v-decorator="rules.member_name"/>
          </st-form-item>
          <st-form-item label="手机号" required>
            <a-input-group compact>
              <a-select style="width: 80px;" v-decorator="rules.country_prefix">
                <!-- <a-select-option :value="37">+86</a-select-option> -->
                <a-select-option
                  :value="code.code_id"
                  v-for="code in countryList.code_list"
                  :key="code.code_id"
                >+{{code.phone_code}}</a-select-option>
              </a-select>
              <a-input style="width: calc(100% - 80px)" placeholder="请输入手机号" v-decorator="rules.mobile"/>
            </a-input-group>
          </st-form-item>
          <st-form-item label="来源渠道">
            <a-select placeholder="手动录入" v-decorator="rules.register_type">
              <a-select-option :value="1">渠道1</a-select-option>
            </a-select>
          </st-form-item>
          <st-form-item label="来源方式">
            <a-select placeholder="外出获取" v-decorator="rules.register_way">
              <a-select-option :value="1">方式1</a-select-option>
            </a-select>
          </st-form-item>
        </a-col>
        <a-col :lg="10" :xs="22" :offset="3">
          <st-form-item>
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
            <a-select placeholder="请选择" v-decorator="rules.sex">
              <a-select-option
                v-for="(item, index) in staffEnums.sex.value"
                :key="index"
                :value="+index"
              >{{item}}</a-select-option>
            </a-select>
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
            <st-input-number v-decorator="rules.height" :float="true">
              <template slot="addonAfter">CM</template>
            </st-input-number>
          </st-form-item>
          <st-form-item label="体重">
            <st-input-number v-decorator="rules.weight" :float="true">
              <template slot="addonAfter">KG</template>
            </st-input-number>
          </st-form-item>
          <st-form-item label="健身目标">
            <a-input placeholder v-decorator="rules.fitness_goal"/>
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
import { AddService } from './add.service'
import { UserService } from '@/services/user.service'
import { RegionService } from '@/services/region.service'
import { MessageService } from '@/services/message.service'
export default {
  serviceInject() {
    return {
      addService: AddService,
      userService: UserService,
      regionService: RegionService,
      messageService: MessageService
    }
  },
  rxState() {
    return {
      staffEnums: this.userService.staffEnums$,
      countryInfo: this.addService.countryInfo$,
      nations: this.addService.nations$,
      countryList: this.addService.countryList$
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
          { rules: [{ required: true, message: '请输入姓名' }] }
        ],
        country_prefix: ['country_prefix', { initialValue: 37 }],
        mobile: [
          'mobile',
          {
            rules: [{ required: true, message: '请输入手机号' }]
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
        id_card: ['id_card'],

        height: ['height'],
        weight: ['weight'],
        fitness_goal: ['fitness_goal'],
        fitness_level: ['fitness_level'],
        married_type: ['married_type'],
        has_children: ['has_children'],
        email: ['email'],
        cascader: ['cascader'],
        living_address: ['living_address']
      },
      options: [],
      fieldNames: { label: 'name', value: 'id', children: 'children' },
      faceList: []
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
      this.form.validateFields().then(res => {
        const cascader = res.cascader || []
        res.province_id = cascader[0] || 110000
        res.city_id = cascader[1] || 110100
        res.district_id = cascader[2] || 110101
        delete res.cascader
        delete res.md
        this.addService.addUser(res).subscribe(() => {
          this.messageService.success({ content: '添加成功' })
          this.$router.push({ name: 'shop-member-list', force: true })
        })
      })
    }
  },
  mounted() {
    this.regionService.getRegions().subscribe(() => {
      this.options = JSON.parse(window.localStorage.getItem('regionTree'))
    })
  }
}
</script>
