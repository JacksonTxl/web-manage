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
    <edit-basic-info v-show="currentIndex == 0" :enums="staffEnums" :data="staffInfo.staff_info"/>
    <edit-detailed-info  v-show="currentIndex == 1" :enums="staffEnums" :data="staffInfo.staff_info"/>
    <edit-coach-info  v-show="currentIndex == 2" :enums="staffEnums" :data="staffInfo.staff_info"/>
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
  serviceInject() {
    return {
      userService: UserService,
      // regionService: RegionService,
      messageService: MessageService,
      services: EditService
    }
  },
  rxState() {
    return {
      staffEnums: this.userService.staffEnums$,
      staffInfo: this.services.staffInfo$
    }
  },
  components: {
    EditCoachInfo,
    EditDetailedInfo,
    EditBasicInfo
  },
  mounted() {
    console.log('=======', this.staffInfo.staff_info)
    console.log(this.$route.meta.query)
    let { id, currentIndex, isshowcoach } = this.$route.meta.query
    this.currentIndex = currentIndex - 0
    if (isshowcoach === 'false') {
      let idx = this.stepArr.findIndex((item) => {
        return item.key === 2
      })
      this.stepArr.splice(idx, 1)
      this.stepsSpan = 12
      console.log(idx)
    }
  },
  methods: {
    changeStep(step) {
      this.currentIndex = step
    }
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
  bem: {
    b: 'page-add-staff',
    bstep: 'page-add-staff-steps',
    bHeader: 'default-brand-header'
  }
}
</script>
