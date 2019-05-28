<template>
  <st-panel app>
    <a-row :class="bstep()" class="mg-b48 mg-t48" :gutter="8">
      <a-col offset="1" :span="stepsSpan">
        <a-steps :current="currentIndex">
          <a-step
            v-for="item in stepArr"
            :key="item.key"
            :title="item.title"
            class="cursor-pointer"
          />
        </a-steps>
      </a-col>
    </a-row>
    <staff-detail-basics v-if="currentIndex == 0" @goNext="goNext" :enums="staffEnums" @addStep="addCoachInfo" @deletStep="deletStep" />
  </st-panel>
</template>

<script>
import StaffDetailBasics from './add#/add-detail-basicsInfo'
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
  name: 'addDetail',
  components: {
    StaffDetailBasics
  },
  mounted() {
    // console.log(this.staffEnums)
  },
  bem: {
    b: 'page-add-staff',
    bstep: 'page-add-staff-steps',
    bHeader: 'default-brand-header'
  },
  data() {
    return {
      stepsSpan: 18,
      currentIndex: 0,
      stepArr: [
        {
          title: '基础信息',
          key: 1
        },
        {
          title: '详细信息',
          key: 2
        }
      ]
    }
  },
  methods: {
    // 删除步骤轴
    deletStep(e) {
      this.stepsSpan = 12
      let index = this.stepArr.findIndex(function(value, index, arr) {
        return value.title === '教练信息'
      })
      if (index === -1) return
      this.stepArr.pop()
    },
    // 添加步骤轴
    addCoachInfo(e) {
      this.stepsSpan = 18
      this.stepArr.push({
        title: '教练信息',
        key: 3
      })
    },
    goNext(e) {
      // 切换提交信息
      let currentIndex = this.currentIndex
      console.log(currentIndex)
      this.currentIndex = currentIndex + 1
      console.log(currentIndex)
      if (this.currentIndex === 3) {
        this.currentIndex = 0
      }
    }
  }
}
</script>
