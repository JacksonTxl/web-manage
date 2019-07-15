<template>
  <st-form :form="form" @submit="save" class="page-edit-container">
    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item label="毕业院校">
          <a-input placeholder="支持中英文、数字,不超过100个字" v-decorator="rules.graduated_school"/>
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
          <a-date-picker style="width:100%" v-decorator="rules.birthday" />
        </st-form-item>
        <st-form-item label="婚姻状况">
          <a-select placeholder="请选择" v-decorator="rules.marry_status">
            <a-select-option
              v-for="(item, key) in enums.marry_status.value"
              :value="+key"
              :key="key"
            >{{item}}</a-select-option>
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
            <a-select-option
              v-for="(item, index) in children_status_option"
              :value="item.value"
              :key="index"
            >{{item.label}}</a-select-option>
          </a-select>
        </st-form-item>
      </a-col>
    </a-row>

    <a-row :gutter="8" class="mg-t48">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item label="家庭住址">
          <a-cascader
            :options="regions"
            :fieldNames="fieldNames"
            v-decorator="rules.provinces"
            changeOnSelect
            placeholder="请选择"
          />
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
      <a-col :offset="1">
        <st-form-item label="  ">
          <st-button type="primary" class="mg-r16" ghost @click="onClickBack">上一步</st-button>
          <st-button class="mg-l16" @click="goNext" type="primary">{{!isPrivateCoach?'保存':'保存，继续填写'}}</st-button>
        </st-form-item>
      </a-col>
    </a-row>
  </st-form>
</template>

<script>
import { RuleConfig } from '@/constants/staff/rule'
import { RegionService } from '@/services/region.service'
import { EditService } from '../edit.service'
import { MessageService } from '@/services/message.service'
export default {
  name: 'EditDetailedInfo',
  serviceInject() {
    return {
      rules: RuleConfig,
      region: RegionService,
      service: EditService,
      message: MessageService
    }
  },
  props: {
    enums: {
      type: Object
    },
    isPrivateCoach: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object
    }
  },
  data() {
    return {
      form: this.$form.createForm(this),
      regions: [],
      fieldNames: { label: 'name', value: 'id', children: 'children' }
    }
  },
  computed: {
    children_status_option() {
      let list = []
      if (!this.enums.children_status) return list
      Object.entries(this.enums.children_status.value).forEach(o => {
        list.push({ value: +o[0], label: o[1] })
      })
      return [{ value: 0, label: '未填写' }, ...list]
    }
  },
  mounted() {
    this.setData(this.data)
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
    goNext(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          this.submit(values, 1)
        }
      })
    },
    // 坑爹的是后端还要城市名遍历了这么多次
    filterProvinces(arr) {
      if (arr.length) {
        return {
          province_id: arr[0],
          city_id: arr[1],
          district_id: arr[2]
        }
      }
    },
    save(e) {
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
    },
    submit(data, saveOrgoNext) {
      let obj = this.filterProvinces(data.provinces)
      let newData = Object.assign(data, obj)
      newData.birthday && (newData.birthday = newData.birthday.format('YYYY-MM-DD'))
      newData.birthday && (newData.graduation_time = newData.graduation_time.format('YYYY-MM-DD'))
      delete newData.provinces
      this.service.updateDetailedInfo(this.data.staff_id, newData).subscribe(() => {
        if (!this.isPrivateCoach) {
          this.$router.push({ name: 'shop-staff-list' })
        } else {
          this.$emit('gonext')
          this.$emit('updateStaffInfo')
        }
      })
    }
  }
}
</script>

<style>
</style>
