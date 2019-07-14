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
      @updateStaffInfo="updateStaffInfo"
      @gonext="gonext"/>
    <edit-detailed-info
      v-else-if="currentIndex == 1"
      :isShowCoach="isShowCoach"
      :enums="staffEnums"
      :data="staffInfo"
      @updateStaffInfo="updateStaffInfo"
      @back="onBack"
      @gonext="gonext"/>
    <edit-coach-info
      v-else-if="currentIndex == 2 && isPrivateCoach"
      :enums="staffEnums"
      :data="staffInfo"
      :staffSpecialty="staffSpecialty"
      @back="onBack"
      @gonext="gonext"/>
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
      staffSpecialty: this.services.staffSpecialty$
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
    isPrivateCoach() {
      if (this.staffInfo.identity.length === 0) return false
      return this.staffInfo.identity.includes(4)
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
      this.stepsSpan = 12
      this.stepArr.pop()
    }
    if (currentIndex) this.currentIndex = Number(currentIndex)
  },
  methods: {
    updateStaffInfo() {
      console.log('updateStaffInfo')
      this.services.getStaffInfo(this.id).subscribe()
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
