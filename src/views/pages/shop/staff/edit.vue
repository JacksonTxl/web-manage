<template>
  <st-panel app>
    <a-row :class="bstep()" class="mg-b48 mg-t48" :gutter="8">
      <a-col offset="1" :span="stepsSpan">
        <a-steps :current="currentIndex">
          <a-step
            v-for="item in stepArr"
            @click="changeStep(item.key)"
            :key="item.key"
            :title="item.title"
            class="cursor-pointer"
          />
        </a-steps>
      </a-col>
    </a-row>
    <edit-basic-info
      v-if="currentIndex == 0"
      :enums="staffEnums"
      :data="staffInfo"
      :roleList="roleList"
      :codeList="codeList"
      :department="department"
      @gonext="gonext"
      @bacicInfoSave="onBasicsSave"/>
    <edit-detailed-info
      v-else-if="currentIndex == 1"
      :isShowCoach="isShowCoach"
      :enums="staffEnums"
      :data="staffInfo"
      @back="onBack"
      @gonext="gonext"
      @detailInfoSave="onDetailInfoSave"/>
    <edit-coach-info
      v-else-if="currentIndex == 2 && isShowCoach"
      :enums="staffEnums"
      :data="staffInfo"
      @back="onBack"
      @gonext="gonext"
      @coachInfoSave="onCoachInfoSave"/>
  </st-panel>
</template>

<script>
import EditCoachInfo from './edit#/edit-coach-info'
import EditDetailedInfo from './edit#/edit-detailed-info'
import EditBasicInfo from './edit#/edit-basic-info'
import { UserService } from '@/services/user.service'
import { MessageService } from '@/services/message.service'
import { EditService } from './edit.service.ts'

export default {
  bem: {
    b: 'page-add-staff',
    bstep: 'page-add-staff-steps',
    bHeader: 'default-brand-header'
  },
  serviceInject() {
    return {
      userService: UserService,
      messageService: MessageService,
      services: EditService
    }
  },
  rxState() {
    return {
      staffEnums: this.userService.staffEnums$,
      staffInfo: this.services.staffInfo$,
      roleList: this.services.roleList$,
      codeList: this.services.codeList$,
      department: this.services.department$
    }
  },
  components: {
    EditCoachInfo,
    EditDetailedInfo,
    EditBasicInfo
  },
  data() {
    return {
      stepsSpan: 18,
      currentIndex: 0,
      stepArr: [
        {
          title: '基础信息',
          key: 0
        },
        {
          title: '详细信息',
          key: 1
        },
        {
          title: '教练信息',
          key: 2
        }
      ]
    }
  },
  computed: {
    isShowCoach() {
      if (this.staffInfo.identity.length === 0) return false
      return this.staffInfo.identity.includes(3) || this.staffInfo.identity.includes(4)
    },
    id() {
      return this.staffInfo.staff_id
    }
  },
  watch: {
    isShowCoach(newVal) {
      if (newVal) {
        this.stepsSpan = 12
        this.stepArr.pop()
      }
    }
  },
  created() {
    let { currentIndex } = this.$route.query
    if (!this.isShowCoach) {
      console.log('不展示')
      this.stepsSpan = 12
      this.stepArr.pop()
    }
    if (currentIndex) this.currentIndex = Number(currentIndex)
  },
  methods: {
    onBasicsSave(data) {
      this.editService.updateBasicInfo(this.id, data.data).subscribe(() => {
        this.editService.editStaffInfo()
      })
    },
    onDetailInfoSave(data) {
      this.editService.updateDetailedInfo(this.id, data.data).subscribe(() => {
        if (!this.isShowCoach) {
          this.$router.push({ name: 'brand-staff-department' })
        } else {
          this.editService.editStaffInfo()
          this.goNext()
        }
      })
    },
    onCoachInfoSave(data) {
      this.editService.updateCoachInfo(this.id, data.data).subscribe(() => {
        this.$router.push({ name: 'brand-staff-department' })
      })
    },
    onBack(step) {
      this.currentIndex = this.currentIndex - step
    },
    gonext() {
      if (this.currentIndex < 2) {
        this.currentIndex = this.currentIndex + 1
      }
    },
    changeStep(step) {
      this.currentIndex = step
    }
  }
}
</script>
