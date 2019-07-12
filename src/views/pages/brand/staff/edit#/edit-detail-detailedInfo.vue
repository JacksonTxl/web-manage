<template>
  <st-form :form="form" class="page-edit-container">
    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item label="毕业院校" >
          <a-input placeholder="支持中英文、数字,不超过1   0个字" v-decorator="rules.graduated_school"/>
        </st-form-item>
        <st-form-item label="学历">
          <a-select placeholder="请选择" v-decorator="rules.education">
            <a-select-option
              v-for="(item, key) in enums.education.value"
              :value="+key"
              :key="key"
            >{{item}}</a-select-option>
          </a-select>
        </st-form-item>
        <st-form-item label="生日">
          <a-date-picker style="width:100%" v-decorator="rules.birthday"/>
        </st-form-item>
        <st-form-item label="婚姻状况">
          <a-select placeholder="请选择" v-decorator="rules.marry_status">
            <a-select-option :value="0">未填写</a-select-option>
            <a-select-option :value="1">已婚</a-select-option>
            <a-select-option :value="2">未婚</a-select-option>
          </a-select>
        </st-form-item>
      </a-col>
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item label="毕业时间">
          <a-date-picker style="width:100%" v-decorator="rules.graduation_time"/>
        </st-form-item>
        <st-form-item label="专业">
          <a-input placeholder="请输入专业名称" v-decorator="rules.profession"/>
        </st-form-item>
        <st-form-item label="籍贯">
          <a-input placeholder="请输入籍贯" v-decorator="rules.native_place"/>
        </st-form-item>
        <st-form-item label="子女状态">
          <a-select placeholder="请选择" v-decorator="rules.children_status">
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
          <a-cascader
            :options="regions"
            :fieldNames="fieldNames"
            v-decorator="rules.provinces"
            changeOnSelect
            placeholder="请填写家庭住址"/>
        </st-form-item>
        <st-form-item label="详细住址">
          <a-input placeholder="填写点什么吧" v-decorator="rules.address"/>
        </st-form-item>
        <st-form-item label="备注">
          <st-textarea
            :maxlength="300"
            :rows="10"
            v-decorator="rules.description"
            placeholder="填写点什么吧"/>
        </st-form-item>
      </a-col>
      <a-col :lg="10" :xs="22" :offset="2"></a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :offset="2">
        <st-form-item class="mg-l24" labelOffset>
          <st-button type="primary" ghost @click="onClickBack">上一步</st-button>
          <st-button class="mg-l16" @click="saveAndGoNext" type="primary">{{!isShowCoach?'保存':'保存，继续填写'}}</st-button>
        </st-form-item>
      </a-col>
    </a-row>
  </st-form>
</template>

<script>
import { RegionService } from '@/services/region.service'
import { RuleConfig } from '@/constants/staff/rule'

export default {
  name: 'EditDetailDetailedInfo',
  serviceInject() {
    return {
      rules: RuleConfig,
      region: RegionService
    }
  },
  props: {
    enums: {
      type: Object
    },
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
      regions: [],
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
      },
      fieldNames: { label: 'name', value: 'id', children: 'children' }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.setData(this.data)
    })
    this.region.regionApi.getRegions().subscribe(v => {
      this.regions = v
    })
  },
  methods: {
    onClickBack() {
      this.$emit('back', 1)
    },
    setData(obj) {
      this.form.setFieldsValue({
        graduated_school: obj.graduated_school,
        graduation_time: obj.graduation_time ? moment(obj.graduation_time) : moment(),
        education: obj.education,
        profession: obj.profession,
        birthday: obj.birthday ? moment(obj.birthday) : moment(),
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
        city_id: arr[1],
        district_id: arr[2]
      }
    },
    saveAndGoNext(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          let obj = this.filterProvinces(values.provinces)
          let newData = Object.assign(values, obj)
          newData.birthday && (newData.birthday = newData.birthday.format('YYYY-MM-DD'))
          newData.graduation_time && (newData.graduation_time = newData.graduation_time.format('YYYY-MM-DD'))
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
