<template>
  <st-panel app>
    <a-row :class="bstep()" class="mg-b48" :gutter="8">
      <a-col offset="1" :span="stepsSpan"><Steps :value="currentIndex" :stepArr="stepArr" /></a-col>
    </a-row>
    <StaffDetailBasics v-show="currentIndex == 0" @skiptoedit="skipToEdit" @addStep="addCoachInfo" @deletStep="deletStep"/>
  </st-panel>
</template>

<script>
import Steps from './add#/st-steps'
import StaffDetailBasics from './add#/add-detail-basicsInfo'
import { AddService } from './add.service'
import { UserService } from '@/services/user.service'
import { MessageService } from '@/services/message.service'
export default {
  name: 'addDetail',
  components: {
    Steps,
    StaffDetailBasics
  },
  serviceInject() {
    return {
      addService: AddService,
      messageService: MessageService
    }
  },
  rxState() {
    return {
      codeList: this.addService.codeList$
    }
  },
  bem: {
    b: 'page-add-staff',
    bstep: 'page-add-staff-steps',
    bHeader: 'default-brand-header'
  },
  data() {
    return {
      currentIndex: 0,
      stepsSpan: 12,
      stepArr: [
        {
          title: '基础信息',
          key: 1
        },
        {
          title: '详细信息',
          key: 2
        }
      ],
      staingData: {}
    }
  },
  methods: {
    // 删除步骤轴
    deletStep(e) {
      this.stepsSpan = 12
      let index = this.stepArr.findIndex((ele) => {
        return ele.title === '教练信息'
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
    }
  }
}
</script>
