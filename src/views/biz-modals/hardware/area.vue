<template>
  <st-modal
    title="区域通行设置"
    v-model="show"
    @ok="putAreaSetting"
    size="small"
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
      <st-form-item label="出入人员范围" required class="page-a-form">
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
          @search="getWhiteList"
          notFoundContent="无搜索结果"
          v-decorator="decorators.white_list"
          placeholder="搜索指定员工"
        >
          <a-select-option v-for="(item, index) in whiteList" :key="index">
            {{ item.staff_name }}
          </a-select-option>
        </a-select>
      </st-form-item>
      <st-form-item label="离场限制" v-if="type === ENTRY.GATE">
        <a-checkbox
          v-decorator="decorators.leave_limit"
          :disabled="!isEdit"
        ></a-checkbox>
        未归还的临时储物柜，不允许离场
      </st-form-item>
      <st-form-item label="约课入场限制" required>
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
      <st-form-item label="入场签课">
        <a-checkbox
          v-decorator="decorators.checkin"
          :disabled="!isEdit"
        ></a-checkbox>
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
  serviceInject() {
    return {
      areaService: AreaService
    }
  },
  rxState() {
    return {
      rule: this.areaService.rule$
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
      info: {},
      list: [],
      whiteList: [],
      peopleType: '',
      type: '' // area类型
    }
  },
  created() {
    this.getSingleAreaList()
    this.getAreaInfo()
  },
  mounted() {},
  methods: {
    getSingleAreaList() {
      this.areaService.getSingleAreaList().subscribe(res => {
        this.list = res.list
      })
    },
    getWhiteList(val) {
      this.areaService.getWhiteList(val).subscribe(res => {
        this.whiteList = res.list
      })
    },
    getStaffList(val) {
      this.areaService.getStaffList(val).subscribe()
    },
    getCurAreaType(para) {
      this.list.forEach(item => {
        if (item.area_id === para) {
          this.type = item.area_type
        }
      })
    },
    getCurPeopleType(e) {
      this.rule.forEach(item => {
        if (item.value === e.target.value) {
          this.peopleType = item.value
        }
      })
    },
    putAreaSetting(e) {
      e.preventDefault()
      this.form.validate().then(values => {
        values.checkin = values.checkin ? 1 : 0
        values.leave_limit = values.leave_limit
          ? LEAVE_LIMIT.TRUE
          : LEAVE_LIMIT.FALSE
        this.areaService.putAreaSetting(values).subscribe(() => {
          this.$emit('success')
          this.show = false
        })
      })
    },
    getAreaInfo() {
      this.areaService.getAreaInfo(this.id).subscribe(res => {
        this.info = res.info
        this.form.setFieldsValue({
          area_id: this.info.area_id,
          people_type: this.info.people_type,
          leave_limit:
            this.info.leave_limit === LEAVE_LIMIT.TRUE ? true : false,
          course_time: this.info.course_time,
          checkin: this.info.checkin === CHECKIN.TRUE ? true : false,
          white_list: this.info.white_list
        })
        this.list.forEach(item => {
          if (item.area_id === this.info.area_id) {
            this.type = item.area_type
          }
        })
        this.rule.forEach(item => {
          if (item.value === this.info.people_type) {
            this.peopleType = item.value
          }
        })
      })
    }
  }
}
</script>
