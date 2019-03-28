<template>
  <div class="page-staffDetail">
    <section class="page-staffDetail-lf">这是步骤轴。。。。。。。。。。。{{     }}</section>
    <!-- 基础信息 -->
    <StaffDetailBasics v-if="currentIndex == 1" @goNext="goNext"/>
    <StaffDetailDetailedInfo v-if="currentIndex == 2" @goNext="goNext"/>
    <StaffDetailCoachInfo v-if="currentIndex == 3" @goNext="goNext"/>
    <!-- <div class="page-staffDetail-divider"></div>
    <section class="page-staffDetail-lf">这是详细信息...................</section>
    <div class="page-staffDetail-divider"></div>
    <section class="page-staffDetail-lf">这是权限信息...................</section> -->
  </div>
</template>

<script>

import StaffDetailBasics from './add#/staff-detail-basicsInfo'
import StaffDetailDetailedInfo from './add#/staff-detail-detailedInfo'
import StaffDetailCoachInfo from './add#/staff-detail-coachInfo'
export default {
  name: 'staffDetail',
  components: {
    StaffDetailBasics,
    StaffDetailDetailedInfo,
    StaffDetailCoachInfo
  },
  data() {
    return {
      currentIndex: 1
    }
  },
  methods: {
    goNext(e) { // 切换提交信息
      let currentIndex = this.currentIndex
      console.log(currentIndex)
      this.currentIndex = currentIndex + 1
      console.log(currentIndex)
      if (this.currentIndex === 4) {
        this.currentIndex = 1
      }
    }
  }
}
</script>
