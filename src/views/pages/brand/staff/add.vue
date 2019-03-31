<template>
  <st-panel app>
    <a-row :gutter="8">
      <a-col offset="1" :span="22"><Steps :value="currentIndex" :stepArr="stepArr" /></a-col>
    </a-row>

    <!-- 基础信息 -->
    <StaffDetailBasics v-if="currentIndex == 0" @goNext="goNext"/>
    <StaffDetailDetailedInfo v-if="currentIndex == 1" @goNext="goNext"/>
    <StaffDetailCoachInfo v-if="currentIndex == 2" @goNext="goNext"/>
  </st-panel>
</template>

<script>
import Steps from './add#/st-steps'
import StaffDetailBasics from './add#/add-detail-basicsInfo'
import StaffDetailDetailedInfo from './add#/add-detail-detailedInfo'
import StaffDetailCoachInfo from './add#/add-detail-coachInfo'
export default {
  name: 'addDetail',
  components: {
    Steps,
    StaffDetailBasics,
    StaffDetailDetailedInfo,
    StaffDetailCoachInfo
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
      ]
    }
  },
  methods: {
    goNext(e) { // 切换提交信息
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
