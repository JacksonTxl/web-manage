<template>
  <st-panel app>
    <a-row class="mg-b48" :gutter="8">
      <a-col offset="1" :span="22"><Steps :value="currentIndex" :stepArr="stepArr" @skip="skip"/></a-col>
    </a-row>
    <StaffDetailBasics v-show="currentIndex == 0" @goNext="goNext" @save="onSave" @addStep="addCoachInfo" @deletStep="deletStep"/>
    <StaffDetailDetailedInfo v-show="currentIndex == 1" @goNext="goNext" @save="onSave"/>
    <StaffDetailCoachInfo v-show="currentIndex == 2" @goNext="goNext" @save="onSave"/>
    {{state}}
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
      loading: this.addService.loading$
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
        }
      ],
      staingData: {}
    }
  },
  methods: {
    deletStep(e) {
      this.stepArr.pop()
    },
    addCoachInfo(e) {
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
