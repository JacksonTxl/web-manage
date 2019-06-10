<template>
  <st-modal title='更改员工职位'
    confirmLoading
    @ok='onSubmit'
    size="small"
    v-model='show'>
    <section>
      <div class="staff-tag mg-b24">
        {{staff}}positionInfo: {{positionInfo}}staffEnums: {{staffEnums}}
        <st-tag v-for="item in identity" :key="item.id" class="mg-r4" :type="item.id | identityFilter"/>
        <st-t3>{{staff.staff_name}}</st-t3>
      </div>
    </section>
    <st-form labelWidth='60px'>
      <st-form-item   label="工作性质">
        <a-select placeholder="支持中英文、数字,不超过10个字">
          <a-select-option :value="item.id" v-for="item in positionInfo" :key="item.id">
            {{item.name}}
          </a-select-option>
        </a-select>
      </st-form-item>
      <st-form-item   label="工作性质">
        <a-select placeholder="支持中英文、数字,不超过10个字" />
      </st-form-item>
      <st-form-item label="教练等级">
        <a-select placeholder="">
          <a-select-option :value="item.id" v-for="item in coachLevelList" :key="item.id">
            {{item.name}}
          </a-select-option>
        </a-select>
      </st-form-item>
      <st-form-item  label="薪资模板">
        <a-input placeholder="支持中英文、数字,不超过10个字" class="mg-b8"/>
        <a-input placeholder="支持中英文、数字,不超过10个字" />
      </st-form-item>
    </st-form>
  </st-modal>
</template>
<script>
import { UpdateStaffPositionService } from './update-staff-position.service'
export default {
  serviceInject() {
    return {
      updateStaffPositionService: UpdateStaffPositionService
    }
  },
  rxState() {
    return {
      staffEnums: this.updateStaffPositionService.staffEnums$,
      positionInfo: this.updateStaffPositionService.positionInfo$,
      coachLevelList: this.updateStaffPositionService.coachLevelList$
    }
  },
  name: 'UpdateStaffPosition',
  data() {
    return {
      show: false,
      formdata: null
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
      return identityTag[key]
    }
  },
  computed: {
    identity() {
      return this.staff.identity
    }
  },
  methods: {
    onSubmit() {
      console.log('ok')
    }
  },
  mounted() {
    this.updateStaffPositionService.init(1).subscribe()
  }
}
</script>
