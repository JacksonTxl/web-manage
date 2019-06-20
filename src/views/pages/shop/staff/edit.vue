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
    <edit-basic-info v-show="currentIndex == 0" :enums="staffEnums" :data="staffInfo" @gonext="gonext"/>
    <edit-detailed-info  :isShowCoach="isShowCoach" v-show="currentIndex == 1" :enums="staffEnums" :data="staffInfo" @gonext="gonext"/>
    <edit-coach-info  v-if="isShowCoach" v-show="currentIndex == 2" :enums="staffEnums" :data="staffInfo" @gonext="gonext"/>
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
    if (this.isShowCoach) {
      console.log('展示')
    } else {
      console.log('不展示')
      this.stepsSpan = 12
      this.stepArr.pop()
    }
    if (currentIndex) {
      this.currentIndex = currentIndex - 0
      // if(!isShowCoach){
      //   console.log('不展示')
      //   this.stepArr.pop()
      // }else{
      //   console.log('展示')
      // }
    }
  },
  methods: {
    gonext() {
      if (this.currentIndex < 2) {
        this.currentIndex = this.currentIndex + 1
      }
    },
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
