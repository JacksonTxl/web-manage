<template>
  <st-form :form="form" @submit="save">
    <a-row :gutter="8">
      <a-col :lg="10"
        :xs="22"
        :offset="1">
        <st-form-item label="毕业学校">
          <a-input placeholder="支持中英文、数字,不超过10个字" v-decorator="detailedInfoRule.graduated_schoolRule"></a-input>
        </st-form-item>
        <st-form-item label="学历">
           <a-select v-decorator="detailedInfoRule.educationRule" placeholder="请选择学历">
            <a-select-option v-for="(item, index) in educationList" :value="item.value" :key="index">{{item.cont}}</a-select-option >
          </a-select>
        </st-form-item>
        <st-form-item label="生日">
           <a-select v-decorator="detailedInfoRule.birthdayRule" placeholder="请选择">
            <a-select-option value="male">男</a-select-option>
            <a-select-option value="female">女</a-select-option>
          </a-select>
        </st-form-item>
        <st-form-item label="婚姻状况">
           <a-select v-decorator="detailedInfoRule.marry_statusRule" placeholder="请选择" >
            <a-select-option value="0">未填写</a-select-option>
            <a-select-option value="1">已婚</a-select-option>
            <a-select-option value="2">未婚</a-select-option>
          </a-select>
        </st-form-item>
      </a-col>
      <a-col :lg="10"
        :xs="22"
        :offset="1">
        <st-form-item label="毕业时间">
          <a-input placeholder="填写点什么吧" v-decorator="detailedInfoRule.graduation_timeRule"></a-input>
        </st-form-item>
        <st-form-item label="专业">
          <a-input placeholder="填写点什么吧" v-decorator="detailedInfoRule.professionRule"></a-input>
        </st-form-item>
        <st-form-item label="籍贯" >
          <a-input placeholder="填写点什么吧" v-decorator="detailedInfoRule.native_placeRule"></a-input>
        </st-form-item>
        <st-form-item label="子女状态" >
           <a-select v-decorator="detailedInfoRule.children_statusRule" placeholder="请选择">
            <a-select-option value="0">未填写</a-select-option>
            <a-select-option value="1">有</a-select-option>
            <a-select-option value="2">没有</a-select-option>
          </a-select>
        </st-form-item>
      </a-col>
    </a-row>

    <a-row :gutter="8" class="mg-t48">
      <a-col :lg="10"
        :xs="22"
        :offset="1">
        <st-form-item label="家庭住址">
          <a-select :defaultValue="province" style="width: 120px;margin-right: 24px;" @change="handleProvinceChange">
            <a-select-option v-for="(item, index) in provinceData" :value="index" :key="item.province_id">{{ item.province }}</a-select-option>
          </a-select>

          <a-select style="width: 120px;margin-right: 24px;" v-model="city" @change="handleCityChange">
            <a-select-option v-for="(item, index) in cities" :value="index" :key="index">{{ item.city }}</a-select-option>
          </a-select>

          <a-select style="width: 120px" v-model="district">
            <a-select-option v-for="qu in qus" :key="qu">{{qu}}</a-select-option>
          </a-select>
        </st-form-item>
        <st-form-item label="详细住址">
          <a-input placeholder="填写点什么吧" v-decorator="detailedInfoRule.addressRule"></a-input>
        </st-form-item>
        <st-form-item label="备注">
          <a-input type="textarea" :autosize="{ minRows: 10, maxRows: 16 }" placeholder="填写点什么吧" v-decorator="detailedInfoRule.descriptionRule"></a-input>
        </st-form-item>
      </a-col>
      <a-col :lg="10"
        :xs="22"
        :offset="2">
      </a-col>
    </a-row>

    <a-row :gutter="8" class="mg-t32">
      <a-col :offset="1">
        <st-form-item labelOffset>
          <st-button type="primary"
            ghost>保存</st-button>
          <st-button class="mg-l16"
            @click="goNext"
            type="primary">继续 填写</st-button>
        </st-form-item>
      </a-col>
    </a-row>
  </st-form>
</template>
<script>
const provinceData = [{
  province: '江苏省',
  province_id: '1'
}, {
  province: '内蒙古',
  province_id: '2'
}]

const cityData = {
  1: [ // 江苏省
    {
      city: '南京',
      city_id: '11'
    },
    {
      city: '杭州',
      city_id: '12'
    }
  ],
  2: [ // 内蒙古
    {
      city: '呼和浩特',
      city_id: '21'
    },
    {
      city: '鄂尔多斯',
      city_id: '22'
    }
  ]
}

const quData = {
  11: [{
    district: '南京1区',
    district_id: '111'
  }, {
    district: '南京2区',
    district_id: '112'
  }],
  12: [{
    district: '杭州1区',
    district_id: '121'
  }, {
    district: '杭州2区',
    district_id: '122'
  }],
  21: [{
    district: '呼和浩特1区',
    district_id: '211'
  }, {
    district: '呼和浩特2区',
    district_id: '212'
  }],
  22: [{
    district: '东胜区',
    district_id: '221'
  }, {
    district: '铁西区',
    district_id: '222'
  }]
}

export default {
  name: 'StaffDetailDetailedInfo',
  data() {
    return {
      form: this.$form.createForm(this),
      detailedInfoRule: {
        graduated_schoolRule: ['graduated_school'], // 毕业院校
        educationRule: ['education'], // 学历
        birthdayRule: ['birthday'], // 生日
        graduation_timeRule: ['graduation_time'], // 毕业时间
        marry_statusRule: ['marry_status'], // 婚姻状态
        professionRule: ['profession'], // 专业
        native_placeRule: ['native_place'], // 籍贯
        children_statusRule: ['children_status'], // 子女状态

        wocao: ['wocao'],
        addressRule: ['address'], // 详细地址
        descriptionRule: ['description']// 备注
      },
      educationList: [{
        value: 0,
        cont: '未填写'
      }, {
        value: 1,
        cont: '小学'
      }, {
        value: 2,
        cont: '初中'
      }, {
        value: 3,
        cont: '高中'
      }, {
        value: 4,
        cont: '中专'
      }, {
        value: 5,
        cont: '大专'
      }, {
        value: 6,
        cont: '本科'
      }, {
        value: 7,
        cont: '硕士'
      }, {
        value: 8,
        cont: '博士'
      }],

      provinceData,
      cities: [],
      qus: [],
      province: provinceData[0]['province'],
      province_id: provinceData[0]['province_id'],
      city: cityData[provinceData[0]['province_id']][0]['city'],
      city_id: cityData[provinceData[0]['province_id']][0]['city_id'],
      district: quData[cityData[provinceData[0]['province_id']][0]['city_id']][0]['district'],
      district_id: quData[cityData[provinceData[0]['province_id']][0]['city_id']][0]['district_id']
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
          console.log('form submit: ', values)
        }
        // this.$emit('save', {
        //   data: values
        // })
      })
    },
    handleProvinceChange(value) {
      console.log('province', provinceData[value])
      this.province = provinceData[value]['province']
      this.province_id = provinceData[value]['province_id']
      this.cities = cityData[provinceData[value]['province_id']]
      this.city = cityData[provinceData[value]['province_id']][0]['city']
    },
    handleCityChange(value) {
      console.log('city', cityData[value])
      console.log(quData)
      this.qus = quData[cityData[value]['city_id']]
    }
  }
}
</script>
