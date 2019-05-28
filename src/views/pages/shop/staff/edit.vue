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
    <edit-basic-info v-show="currentIndex == 0" :enums="staffEnums"/>
    <edit-detailed-info  v-show="currentIndex == 1" :enums="staffEnums"/>
    <edit-coach-info  v-show="currentIndex == 2" :enums="staffEnums"/>
  </st-panel>
</template>

<script>
import EditCoachInfo from './edit#/edit-coach-info'
import EditDetailedInfo from './edit#/edit-detailed-info'
import EditBasicInfo from './edit#/edit-basic-info'
import { UserService } from '@/services/user.service'
import { MessageService } from '@/services/message.service'
export default {
  serviceInject() {
    return {
      userService: UserService,
      // regionService: RegionService,
      messageService: MessageService
    }
  },
  rxState() {
    return {
      staffEnums: this.userService.staffEnums$
    }
  },
  components: {
    EditCoachInfo,
    EditDetailedInfo,
    EditBasicInfo
  },
  methods: {
    changeStep(step) {
      this.currentIndex = step
    }
  },
  data() {
    return {
      stepsSpan: 18,
      currentIndex: 2,
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
  bem: {
    b: 'page-add-staff',
    bstep: 'page-add-staff-steps',
    bHeader: 'default-brand-header'
  }
}
</script>
