<template>
  <st-modal
    title="区域通行设置"
    v-model="show"
    @ok="putAreaSetting"
    size="small"
    :loading="loading.init"
  >
    <st-form :form="form" labelWidth="100px">
      <st-form-item label="区域">
        <a-select
          @change="getCurAreaType"
          v-decorator="decorators.area_id"
          :disabled="!isEdit"
        >
          <a-select-option
            v-for="(item, index) in list"
            :key="index"
            :value="item.area_id"
          >
            {{ item.area_name }}
          </a-select-option>
        </a-select>
      </st-form-item>

      <st-form-item label="进入人员范围" required class="page-a-form">
        <a-radio-group
          @change="getCurPeopleType"
          v-decorator="decorators.people_type"
          :disabled="!isEdit"
        >
          <a-radio
            v-for="(item, index) in rule"
            :key="index"
            :value="item.value"
          >
            {{ item.label }}
          </a-radio>
        </a-radio-group>
      </st-form-item>

      <st-form-item label="指定员工" v-if="peopleType === PEOPLE_TYPE.ONLY">
        <a-select
          mode="multiple"
          showSearch
          :filterOption="false"
          :defaultActiveFirstOption="false"
          @search="getWhiteList"
          v-decorator="decorators.white_list"
          placeholder="搜索指定员工"
        >
          <a-select-option
            v-for="(item, index) in whiteList"
            :key="index"
            :value="item.staff_id"
          >
            {{ item.staff_name }}
          </a-select-option>
        </a-select>
      </st-form-item>

      <st-form-item label="离场限制" v-if="type === ENTRY.GATE">
        <st-checkbox
          v-decorator="decorators.leave_limit"
          :disabled="!isEdit"
        ></st-checkbox>
        未归还的临时储物柜，不允许离场
      </st-form-item>
      <st-form-item
        label="约课入场限制"
        required
        v-if="type !== ENTRY.VENUES && type !== ENTRY.GATE"
      >
        约课用户在课程开始前
        <st-input-number
          :min="0"
          :max="180"
          v-decorator="decorators.course_time"
          :disabled="!isEdit"
          style="width:50px;"
        ></st-input-number>
        分钟可入场
      </st-form-item>
      <st-form-item
        label="场地预约限制"
        required
        v-if="type === ENTRY.VENUES || type === ENTRY.GATE"
      >
        预约用户在预约开始前
        <st-input-number
          :min="0"
          :max="180"
          v-decorator="decorators.course_time"
          :disabled="!isEdit"
          style="width:50px;"
        ></st-input-number>
        分钟可入场
      </st-form-item>
      <st-form-item
        label="入场签课"
        v-if="type !== ENTRY.GATE && type !== ENTRY.VENUES"
      >
        <st-checkbox
          v-decorator="decorators.checkin"
          :disabled="!isEdit"
        ></st-checkbox>
        当预约课程与场地排期课程一致，在用户入场同时，
        在可签到时间内自动为用户完成此课程签到
      </st-form-item>
    </st-form>
  </st-modal>
</template>
<script>
import { ruleOptions } from './area.config'
import { AreaService } from './area.service'
import {
  LEAVE_LIMIT,
  CHECKIN,
  PEOPLE_TYPE,
  ENTRY
} from '@/constants/setting/hardware'

export default {
  name: 'Area',
  serviceProviders() {
    return [AreaService]
  },
  serviceInject() {
    return {
      areaService: AreaService
    }
  },
  rxState() {
    return {
      rule: this.areaService.rule$,
      list: this.areaService.list$,
      info: this.areaService.info$,
      loading: this.areaService.loading$,
      whiteList: this.areaService.whiteList$
    }
  },
  bem: {
    bPage: 'modal-shop-blacklist'
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    id: {
      type: Number
    }
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      show: false,
      form,
      decorators,
      LEAVE_LIMIT,
      ENTRY,
      CHECKIN,
      PEOPLE_TYPE,
      peopleType: 0,
      white_list: [],
      type: ENTRY.GATE // area类型
    }
  },
  mounted() {
    this.getWhiteList('')
    this.init()
  },
  methods: {
    getWhiteList(val) {
      this.areaService.getWhiteList(val).subscribe()
    },
    init() {
      this.areaService.init(this.id).subscribe(res => {
        this.peopleType = this.info.people_type
        this.list.forEach(item => {
          if (item.area_id === this.info.area_id) {
            this.type = item.area_type
          }
        })
        setTimeout(() => {
          if (this.type !== this.ENTRY.GATE) {
            this.form.setFieldsValue({
              checkin: this.info.checkin
            })
          }
          if (this.type === this.ENTRY.GATE) {
            this.form.setFieldsValue({
              leave_limit: this.info.leave_limit === LEAVE_LIMIT.TRUE ? 1 : 0
            })
          }
          if (this.peopleType === this.PEOPLE_TYPE.ONLY) {
            this.form.setFieldsValue({
              white_list: this.info.white_list
            })
          }
          this.form.setFieldsValue({
            area_id: this.info.area_id,
            course_time: this.info.course_time,
            people_type: this.info.people_type
          })
        })
      })
    },
    getCurAreaType(para) {
      this.list.forEach(item => {
        if (item.area_id === para) {
          this.type = item.area_type
        }
      })
    },
    getCurPeopleType(e) {
      this.peopleType = e.target.value
    },
    putAreaSetting(e) {
      if (!this.isEdit) {
        this.show = false
      }
      e.preventDefault()
      this.form.validate().then(values => {
        values.area_type = this.type
        values.leave_limit = values.leave_limit
          ? LEAVE_LIMIT.TRUE
          : LEAVE_LIMIT.FALSE
        this.areaService.putAreaSetting(values).subscribe(() => {
          this.$emit('success')
          this.show = false
        })
      })
    }
  }
}
</script>
