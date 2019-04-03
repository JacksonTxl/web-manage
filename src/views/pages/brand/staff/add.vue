<template>
  <st-panel app>
    <a-row class="mg-b48" :gutter="8">
      <a-col offset="1" :span="22"><Steps :value="currentIndex" :stepArr="stepArr" @skip="skip"/></a-col>
    </a-row>
    <StaffDetailBasics v-show="currentIndex == 0" @goNext="goNext" @save="save"/>
    <StaffDetailDetailedInfo v-show="currentIndex == 1" @goNext="goNext" @save="save"/>
    <StaffDetailCoachInfo v-show="currentIndex == 2" @goNext="goNext" @save="save"/>
  </st-panel>
</template>

<script>
import Steps from './add#/st-steps'
import StaffDetailBasics from './add#/add-detail-basicsInfo'
import StaffDetailDetailedInfo from './add#/add-detail-detailedInfo'
import StaffDetailCoachInfo from './add#/add-detail-coachInfo'
import { AddService } from './add.service'
export default {
  name: 'addDetail',
  components: {
    Steps,
    StaffDetailBasics,
    StaffDetailDetailedInfo,
    StaffDetailCoachInfo
  },
  serviceInject() {
    return {
      addService: AddService
    }
  },
  data() {
    return {
      currentIndex: 0,
      stepArr: [
        {
          title: '基础信息',
          key: 1
        },
        {
          title: '详细信息',
          key: 2
        },
        {
          title: '教练信息',
          key: 3
        }
      ],

      staingData: {}
    }
  },
  methods: {
    skip(data) {
      console.log('跳转', data)
      this.currentIndex = data.index
      // 记着保存
    },
    goNext(e) { // 切换提交信息
      let currentIndex = this.currentIndex
      console.log(currentIndex)
      this.currentIndex = currentIndex + 1
      console.log(currentIndex)
      if (this.currentIndex === 3) {
        this.currentIndex = 0
      }
    },
    onSave(form) {
      this.addService.getplicy({}).subscribe(res => {
        console.log('提ssss交', res)
      })
    },
    staing(data) { // 跳页 下一个都调用下暂存
      this.staingData = data
      Object.keys(data).forEach((key) => {
        this.staingData[key] = data[key]
      })
    }
  }
}
</script>
