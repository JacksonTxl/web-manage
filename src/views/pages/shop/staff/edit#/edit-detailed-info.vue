<template>
  <st-form :form="form" @submit.prevent="save" class="page-edit-container">
    <a-row :gutter="8">
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item label="毕业院校">
          <a-input
            placeholder="支持中英文、数字,不超过100个字"
            v-decorator="decorators.graduated_school"
          />
        </st-form-item>
        <st-form-item label="学历">
          <a-select placeholder="请选择" v-decorator="decorators.education">
            <a-select-option
              v-for="(item, key) in enums.education.value"
              :value="+key"
              :key="key"
            >
              {{ item }}
            </a-select-option>
          </a-select>
        </st-form-item>
        <st-form-item label="生日">
          <a-date-picker style="width:100%" v-decorator="decorators.birthday" />
        </st-form-item>
        <st-form-item label="婚姻状况">
          <a-select placeholder="请选择" v-decorator="decorators.marry_status">
            <a-select-option
              v-for="(item, key) in enums.marry_status.value"
              :value="+key"
              :key="key"
            >
              {{ item }}
            </a-select-option>
          </a-select>
        </st-form-item>
      </a-col>
      <a-col :lg="10" :xs="22" :offset="1">
        <st-form-item label="毕业时间">
          <a-date-picker
            style="width:100%"
            v-decorator="decorators.graduation_time"
          />
        </st-form-item>
        <st-form-item label="专业">
          <a-input
            placeholder="请输入专业名称"
            v-decorator="decorators.profession"
          />
        </st-form-item>
        <st-form-item label="籍贯">
          <a-input
            placeholder="请输入籍贯"
            v-decorator="decorators.native_place"
          />
        </st-form-item>
        <st-form-item label="子女状态">
          <a-select
            placeholder="请选择"
            v-decorator="decorators.children_status"
          >
            <a-select-option
              v-for="(item, key) in enums.children_status.value"
              :value="+key"
              :key="key"
            >
              {{ item }}
            </a-select-option>
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
            v-decorator="decorators.provinces"
            changeOnSelect
            placeholder="请选择"
          />
        </st-form-item>
        <st-form-item label="详细住址">
          <a-input
            placeholder="填写点什么吧"
            v-decorator="decorators.address"
          />
        </st-form-item>
        <st-form-item label="备注">
          <st-textarea
            :maxlength="300"
            :rows="10"
            v-decorator="decorators.description"
            placeholder="填写点什么吧"
          />
        </st-form-item>
      </a-col>
      <a-col :lg="10" :xs="22" :offset="2"></a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :offset="1">
        <st-form-item labelFix>
          <st-button type="primary" class="mg-r16" ghost @click="onClickBack">
            上一步
          </st-button>
          <st-button class="mg-l16" @click="goNext" type="primary">
            {{ !isPrivateCoach ? '保存' : '保存，继续填写' }}
          </st-button>
        </st-form-item>
      </a-col>
    </a-row>
  </st-form>
</template>

<script>
import { RegionService } from '@/services/region.service'
import { EditService } from '../edit.service'
import { MessageService } from '@/services/message.service'
import { get } from 'lodash-es'
import { PatternService } from '@/services/pattern.service'
import { ruleOptions } from '../staff-form.config.ts'
export default {
  name: 'EditDetailedInfo',
  serviceProviders() {
    return [EditService]
  },
  serviceInject() {
    return {
      pattern: PatternService,
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
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      regions: [],
      fieldNames: { label: 'name', value: 'id', children: 'children' }
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
        graduation_time: obj.graduation_time
          ? moment(obj.graduation_time)
          : undefined,
        education: obj.education || undefined,
        profession: obj.profession,
        birthday: obj.birthday ? moment(obj.birthday) : undefined,
        native_place: obj.native_place,
        marry_status: obj.marry_status || undefined,
        children_status: obj.children_status || undefined,
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
    save(e) {
      this.form.validateFields((err, values) => {
        if (!err) {
          let obj = this.filterProvinces(values.provinces)
          let newData = Object.assign(values, obj)
          newData.birthday &&
            (newData.birthday = newData.birthday.format('YYYY-MM-DD'))
          newData.graduation_time &&
            (newData.graduation_time = newData.graduation_time.format(
              'YYYY-MM-DD'
            ))
          delete newData.provinces
          this.$emit('detailInfoSave', {
            data: newData
          })
        }
      })
    },
    submit(data, saveOrgoNext) {
      data.province_id = get(data, 'provinces.0')
      data.city_id = get(data, 'provinces.1')
      data.district_id = get(data, 'provinces.2')
      data.birthday && (data.birthday = data.birthday.format('YYYY-MM-DD'))
      data.birthday &&
        (data.graduation_time = data.graduation_time.format('YYYY-MM-DD'))

      this.service
        .updateDetailedInfo(this.data.staff_id, data)
        .subscribe(() => {
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

<style></style>
