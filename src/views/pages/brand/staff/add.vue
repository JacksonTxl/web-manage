<template>
  <st-panel app>
    <a-row :class="bstep()" class="mg-b48" :gutter="8">
      <a-col offset="1" :span="stepsSpan"><Steps :value="currentIndex" :stepArr="stepArr" @skip="skip"/></a-col>
    </a-row>
    <StaffDetailBasics :defaultCode="defaultCode" :codeList="codeList" v-show="currentIndex == 0" @goNext="goNext" @save="onSave" @addStep="addCoachInfo" @deletStep="deletStep"/>
    <StaffDetailDetailedInfo v-show="currentIndex == 1" @goNext="goNext" @save="onSave"/>
    <StaffDetailCoachInfo v-show="currentIndex == 2" @goNext="goNext" @save="onSave"/>
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
  subscriptions() {
    return {
      state: this.addService.state$,
      codeList: this.addService.codeList$,
      defaultCode: this.addService.defaultCode$,
      loading: this.addService.loading$
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
    deletStep(e) {
      this.stepsSpan = 12
      this.stepArr.pop()
    },
    addCoachInfo(e) {
      this.stepsSpan = 18
      this.stepArr.push({
        title: '教练信息',
        key: 3
      })
    },
    skip(data) {
      console.log('跳页', data)
      this.currentIndex = data.index
      // this.loading.getCountryCodes
    },
    goNext(e) { // 下一步
      console.log(e)
      // this.submit(e.formData)
      let currentIndex = this.currentIndex
      this.currentIndex = currentIndex + 1
      if (this.currentIndex === 3) {
        this.currentIndex = 0
      }
    },
    submit(data) {
      this.addService.save(data).subscribe(res => {
        console.log('保存', res)
      })
    },
    onSave(form) { // 保存
      this.submit(form)
    }
    // staing(data) { // 跳页 下一个都调用下暂存
    //   this.staingData = data
    //   Object.keys(data).forEach((key) => {
    //     this.staingData[key] = data[key]
    //   })
    // }
  },
  mounted() {
    console.log(this.addService)
  }
}
</script>
