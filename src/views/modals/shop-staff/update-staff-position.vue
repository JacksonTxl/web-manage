<template>
  <st-modal title='更改员工职位'
    @ok='onSubmit'
    size="small"
    v-model='show'>
  <staff-info :staff="staff"></staff-info>
    <st-form labelWidth='60px'>
      <st-form-item   label="工作性质">
        <a-select v-model="form.nature_work" placeholder="请选择工作性质">
          <a-select-option :value="item.id" v-for="item in natureWork" :key="item.id">
            {{item.name}}
          </a-select-option>
        </a-select>
      </st-form-item>
      <st-form-item   label="员工职能" required>
        <a-select v-model="form.identity" mode="multiple" placeholder=""  @change="onChangeIdentity">
          <a-select-option   :value="item.id" v-for="item in identityList" :key="item.id">
            {{item.name}}
          </a-select-option>
        </a-select>
      </st-form-item>
      <st-form-item  label="教练等级">
        <a-select v-model="form.coach_level_id" placeholder="">
          <a-select-option  :value="item.id" v-for="item in coachLevelList$" :key="item.id">
            {{item.name}}
          </a-select-option>
        </a-select>
      </st-form-item>
      <st-form-item   label="薪资模板">
        <a-select placeholder="" v-model="form.basic_salary" class="mg-b16">
          <a-select-option :value="item.id" v-for="item in salaryBasic$" :key="item.id">
            {{item.name}}
          </a-select-option>
        </a-select>
        <a-select v-model="form.sale_percentage"  class="mg-b16" placeholder="">
          <a-select-option :value="item.id" v-for="item in salarySale$" :key="item.id">
            {{item.name}}
          </a-select-option>
        </a-select>
        <a-select v-model="form.class_percentage"   placeholder="" v-if="isSalaryCourse">
          <a-select-option :value="item.id" v-for="item in salaryCourse$" :key="item.id">
            {{item.name}}
          </a-select-option>
        </a-select>
      </st-form-item>
    </st-form>
  </st-modal>
</template>
<script>
import { UpdateStaffPositionService } from './update-staff-position.service'
import { UserService } from '../../../services/user.service'
import StaffInfo from './staff-info'

export default {
  serviceInject() {
    return {
      updateStaffPositionService: UpdateStaffPositionService
    }
  },
  rxState() {
    const {
      staffEnums$,
      positionInfo$,
      coachLevelList$,
      salaryBasic$,
      salarySale$,
      salaryCourse$
    } = this.updateStaffPositionService
    return {
      staffEnums$,
      positionInfo$,
      coachLevelList$,
      salaryBasic$,
      salarySale$,
      salaryCourse$
    }
  },
  name: 'UpdateStaffPosition',
  data() {
    return {
      show: false,
      form: {},
      isSalaryCourse: false
    }
  },
  props: {
    staff: {
      type: Object,
      default: () => {}
    }
  },
  filters: {
    identityFilter(key) {
      const identityTag = ['role-staff', 'role-saler', 'coach-personal', 'coach-team', 'swimming-coach']
      return identityTag[key - 1]
    }
  },
  wtach: {
    identity(newval) {
      this.isSalaryCourse = newval.includes(3) || newval.includes(4)
    }
  },
  components: {
    StaffInfo
  },
  computed: {
    identityList() {
      return this.computedList('identity')
    },
    natureWork() {
      return this.computedList('nature_work')
    },
    identity() {
      return this.staff.identity
    }
  },
  methods: {
    onChangeIdentity(value) {
      this.isSalaryCourse = value.includes(3) || value.includes(4)
    },
    computedList(key) {
      let arr = []
      let value = this.staffEnums$[key].value
      for (let key in value) {
        arr.push({
          id: +key,
          name: value[key]
        })
      }
      return arr
    },
    onSubmit() {
      this.updateStaffPositionService.putStaffBindPosition({ id: this.staff.id, ...this.form }).subscribe(() => {
        this.show = false
      })
    }
  },
  mounted() {
    this.updateStaffPositionService.init(this.staff.id).subscribe(res => {
      this.form = this.positionInfo$
    })
  }
}
</script>
