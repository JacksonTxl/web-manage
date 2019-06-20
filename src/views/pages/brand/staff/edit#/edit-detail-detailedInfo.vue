<template>
  <st-form :form="form" @submit="save" class="page-edit-container">
    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item label="毕业院校" >
          <a-input placeholder="支持中英文、数字,不超过1   0个字" v-decorator="detailRules.graduated_school"/>
        </st-form-item>
        <st-form-item label="学历">
          <a-select placeholder="请选择" v-decorator="detailRules.education">
            <a-select-option
              v-for="(item, index) in xl"
              :value="item.value"
              :key="index"
            >{{item.cont}}</a-select-option>
          </a-select>
        </st-form-item>
        <st-form-item label="生日">
          <a-date-picker style="width:100%" v-decorator="detailRules.birthday"/>
        </st-form-item>
        <st-form-item label="婚姻状况">
          <a-select placeholder="请选择" v-decorator="detailRules.marry_status">
            <a-select-option :value="0">未填写</a-select-option>
            <a-select-option :value="1">已婚</a-select-option>
            <a-select-option :value="2">未婚</a-select-option>
          </a-select>
        </st-form-item>
      </a-col>
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item label="毕业时间">
          <a-date-picker style="width:100%" v-decorator="detailRules.graduation_time"/>
        </st-form-item>
        <st-form-item label="专业">
          <a-input placeholder="请输入专业名称" v-decorator="detailRules.profession"/>
        </st-form-item>
        <st-form-item label="籍贯">
          <a-input placeholder="请输入籍贯" v-decorator="detailRules.native_place"/>
        </st-form-item>
        <st-form-item label="子女状态">
          <a-select placeholder="请选择" v-decorator="detailRules.children_status">
            <a-select-option :value="0">未填写</a-select-option>
            <a-select-option :value="1">有</a-select-option>
            <a-select-option :value="2">没有</a-select-option>
          </a-select>
        </st-form-item>
      </a-col>
    </a-row>

    <a-row :gutter="8" class="mg-t48">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item label="家庭住址" >
          <a-cascader :options="options" @change="onChange" v-decorator="detailRules.provinces" changeOnSelect placeholder="请选择" />
        </st-form-item>
        <st-form-item label="详细住址">
          <a-input placeholder="填写点什么吧" v-decorator="detailRules.address"/>
        </st-form-item>
        <st-form-item label="备注">
          <a-input type="textarea" v-decorator="detailRules.description" :autosize="{ minRows: 10, maxRows: 16 }" placeholder="填写点什么吧"/>
        </st-form-item>
      </a-col>
      <a-col :lg="10" :xs="22" :offset="2"></a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :offset="2">
        <st-form-item class="mg-l24" labelOffset>
          <st-button type="primary" ghost html-type="submit">上一步</st-button>
          <st-button class="mg-l16" @click="goNext" type="primary">{{!isShowCoach?'保存':'保存，继续填写'}}</st-button>
        </st-form-item>
      </a-col>
    </a-row>
  </st-form>
</template>

<script>
const xl = [
  {
    value: 0,
    cont: '未填写'
  },
  {
    value: 1,
    cont: '小学'
  },
  {
    value: 2,
    cont: '初中'
  },
  {
    value: 3,
    cont: '高中'
  },
  {
    value: 4,
    cont: '中专'
  },
  {
    value: 5,
    cont: '大专'
  },
  {
    value: 6,
    cont: '本科'
  },
  {
    value: 7,
    cont: '硕士'
  },
  {
    value: 8,
    cont: '博士'
  }
]
export default {
  name: 'EditDetailDetailedInfo',
  props: {
    data: {
      type: Object
    },
    isShowCoach: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      form: this.$form.createForm(this),
      xl,
      options: [
        {
          value: 1,
          label: '浙江',
          children: [
            {
              value: 11,
              label: '杭州',
              children: [
                {
                  value: 111,
                  label: '西湖区'
                }
              ]
            }
          ]
        },
        {
          value: 2,
          label: '江苏',
          children: [
            {
              value: 21,
              label: '南京',
              children: [
                {
                  value: 211,
                  label: '中华门'
                }
              ]
            }
          ]
        }
      ],
      detailRules: {
        // 毕业院校
        graduated_school: ['graduated_school'],
        // 毕业时间
        graduation_time: ['graduation_time'],
        // 学历
        education: ['education'],
        // 专业
        profession: ['profession'],
        // 生日
        birthday: ['birthday'],
        // 籍贯
        native_place: ['native_place'],
        // 婚姻状态
        marry_status: ['marry_status'],
        // 有无子女
        children_status: ['children_status'],
        // 详细地址
        address: ['address'],
        // 描述
        description: ['description'],
        // 省市区
        provinces: ['provinces']
      }
    }
  },
  mounted() {
    this.setData(this.data)
  },
  methods: {
    setData(obj) {
      console.log('detail', obj)
      this.form.setFieldsValue({
        graduated_school: obj.graduated_school,
        graduation_time: obj.graduation_time ? moment(obj.graduation_time) : '',
        education: obj.education,
        profession: obj.profession,
        birthday: obj.birthday ? moment(obj.birthday) : '',
        native_place: obj.native_place,
        marry_status: obj.marry_status,
        children_status: obj.children_status,
        address: obj.address,
        description: obj.description,
        provinces: [obj.province_id, obj.city_id, obj.district_id]
      })
    },
    onChange(value) {
      console.log(value)
    },
    goNext() {
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          this.$emit('goNext', {
            data: this.form.getFieldsValue()
          })
        }
      })
    },
    filterProvinces(arr) {
      return {
        province_id: arr[0],
        province_name: 'lallala',
        city_id: arr[1],
        city_name: 'shgsahhsa',
        district_id: arr[2],
        district_name: 'sajkdsjds'
      }
    },
    save(e) {
      // form submit
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          let obj = this.filterProvinces(values.provinces)
          let newData = Object.assign(values, obj)
          newData.birthday = newData.birthday.format('YYYY-MM-DD')
          newData.graduation_time = newData.graduation_time.format('YYYY-MM-DD')
          delete newData.provinces
          this.$emit('detailInfoSave', {
            data: newData
          })
        }
      })
    }
  }
}
</script>

<style>
</style>
