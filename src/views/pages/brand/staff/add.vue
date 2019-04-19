<template>
  <st-panel app>
    <a-row :class="bstep()" class="mg-b48" :gutter="8">
      <a-col offset="1" :span="stepsSpan"><Steps :value="currentIndex" :stepArr="stepArr" @skip="skip"/></a-col>
    </a-row>
    <StaffDetailBasics :codeList="countryList" v-show="currentIndex == 0" @skiptoedit="skiptoedit" @basicInfoSave="onBasicInfoSave" @addStep="addCoachInfo" @deletStep="deletStep"/>
    <!-- <StaffDetailDetailedInfo v-show="currentIndex == 1" @goNext="goNext" />
    <StaffDetailCoachInfo v-show="currentIndex == 2" @goNext="goNext" /> -->
  </st-panel>
</template>

<script>
import Steps from './add#/st-steps'
import StaffDetailBasics from './add#/add-detail-basicsInfo'
// import StaffDetailDetailedInfo from './add#/add-detail-detailedInfo'
// import StaffDetailCoachInfo from './add#/add-detail-coachInfo'
import { AddService } from './add.service'
export default {
  name: 'addDetail',
  components: {
    Steps,
    StaffDetailBasics
    // StaffDetailDetailedInfo,
    // StaffDetailCoachInfo
  },
  serviceInject() {
    return {
      addService: AddService
    }
  },
  rxState() {
    console.log(this.addService.countryList$)
    return {
      countryList: this.addService.countryList$
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
    deletStep(e) { //
      this.stepsSpan = 12
      let index = this.stepArr.findIndex(function(value, index, arr) {
        return value.title === '教练信息'
      })
      if (index === -1) return
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
    },
    skiptoedit(e) { // 下一步
      console.log('跳到编辑', e)
      this.submit(e, 'skip')
    },
    submit(data, saveOrskip) {
      this.addService.addBasicInfo(data).subscribe(res => {
        console.log('保存', res)
        console.log('ssdsd', typeof this.stepArr.length)
        if (saveOrskip === 'skip') {
          this.$router.push({
            name: 'brand-staff-edit',
            query: {
              staffId: res.staff_id,
              currentIndex: 1
            }
          })
        } else if (saveOrskip === 'save') {
          console.log('返回列表')
          // this.$router.go(-1)
        }
      })
    },
    onBasicInfoSave(form) { // 保存
      console.log(form)
      this.submit(form, 'save')
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
