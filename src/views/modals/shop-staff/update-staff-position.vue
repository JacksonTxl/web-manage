<template>
  <st-modal title='更改员工职位'
    @ok='onSubmit'
    size="small"
    v-model='show'>
  <staff-info :staff="staff"></staff-info>
    <st-form labelWidth='60px' :form="form">
      <st-form-item label="工作性质">
        <a-select v-decorator="['nature_work']" placeholder="请选择工作性质">
          <a-select-option :value="item.id" v-for="item in natureWork" :key="item.id">
            {{item.name}}
          </a-select-option>
        </a-select>
      </st-form-item>
      <st-form-item label="员工职能" required>
        <a-select v-decorator="['identity']" mode="multiple" placeholder="请选择员工职能"  @change="onChangeIdentity" @deselect="onDeselectIndentity">
          <a-select-option :value="item.id" v-for="item in identityList" :key="item.id">
            {{item.name}}
          </a-select-option>
        </a-select>
      </st-form-item>
      <st-form-item label="教练等级">
        <a-select v-decorator="['coach_level_id']" placeholder="请选择教练等级">
          <a-select-option  :value="item.id" v-for="item in coachLevelList$" :key="item.id">
            {{item.name}}
          </a-select-option>
        </a-select>
      </st-form-item>
      <st-form-item label="薪资模板">
        <a-select class="mg-b16" v-decorator="['basic_salary']" placeholder="请选择底薪模版">
          <a-select-option :value="item.id" v-for="item in salaryBasic$" :key="item.id">
            {{item.name}}
          </a-select-option>
        </a-select>
        <a-select class="mg-b16" v-decorator="['sale_percentage']" placeholder="请选择薪资模板">
          <a-select-option :value="item.id" v-for="item in salarySale$" :key="item.id">
            {{item.name}}
          </a-select-option>
        </a-select>
        <a-select v-decorator="['course_percentage']" placeholder="请选择课程模板" v-show="isSalaryCourse">
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
import { MessageService } from '../../../services/message.service'

export default {
  serviceInject() {
    return {
      updateStaffPositionService: UpdateStaffPositionService,
      msg: MessageService
    }
  },
  rxState() {
    return {
      staffEnums$: this.updateStaffPositionService.staffEnums$,
      positionInfo$: this.updateStaffPositionService.positionInfo$,
      coachLevelList$: this.updateStaffPositionService.coachLevelList$,
      salaryBasic$: this.updateStaffPositionService.salaryBasic$,
      salarySale$: this.updateStaffPositionService.salarySale$,
      salaryCourse$: this.updateStaffPositionService.salaryCourse$
    }
  },
  name: 'UpdateStaffPosition',
  data() {
    return {
      show: false,
      isSalaryCourse: false,
      form: this.$form.createForm(this)
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
  watch: {
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
  mounted() {
    this.updateStaffPositionService.init(this.staff.id).subscribe(res => {
      const {
        basic_salary,
        coach_level_id,
        course_percentage,
        identity,
        nature_work,
        sale_percentage
      } = this.positionInfo$
      this.$nextTick(() => {
        let obj = {
          basic_salary,
          coach_level_id,
          course_percentage,
          identity,
          nature_work
        }
        this.isSalaryCourse = identity.includes(3) || identity.includes(4)
        if (this.isSalaryCourse) {
          obj = Object.assign(obj, {
            course_percentage
          })
        }
        this.form.setFieldsValue(obj)
      })
    })
  },
  methods: {
    onChangeIdentity(value) {
      this.isSalaryCourse = value.includes(3) || value.includes(4)
    },
    onDeselectIndentity(value) {
      this.updateStaffPositionService.validatStaffPosition(value).subscribe((res) => {
        let operate = res.operate
        if (!operate) {
          let obj = this.identity.filter(item => item.id === value)
          let identity = [...obj.map(item => item.id), ...this.form.getFieldValue('identity')]
          this.form.setFieldsValue({
            identity
          })
          this.msg.error({ content: '不能删除该职能' })
        }
      })
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
      let formData = this.form.getFieldsValue()
      console.log('formData', formData)
      this.updateStaffPositionService.putStaffBindPosition({ id: this.staff.id, ...formData }).subscribe(() => {
        this.show = false
      })
    }
  }
}
</script>
