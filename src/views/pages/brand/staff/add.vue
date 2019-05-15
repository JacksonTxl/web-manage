<template>
  <st-panel app>
    <a-row :class="bstep()" class="mg-b48" :gutter="8">
      <a-col offset="1" :span="stepsSpan"><Steps :value="currentIndex" :stepArr="stepArr" @skip="skip"/></a-col>
    </a-row>
    <StaffDetailBasics :codeList="countryList" v-show="currentIndex == 0" @skiptoedit="skiptoedit" @basicInfoSave="onBasicInfoSave" @addStep="addCoachInfo" @deletStep="deletStep" :staffEnumslist="staffEnums"/>
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
      userService: UserService,
      addService: AddService,
      messageService: MessageService
    }
  },
  rxState() {
    return {
      countryList: this.addService.countryList$,
      staffEnums: this.userService.staffEnums$
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
    // 继续填写跳转到编辑
    skiptoedit(e) {
      console.log('跳到编辑', e)
      this.submit(e, 'skip')
    },
    // 提交
    submit(data, saveOrskip) {
      this.addService.addBasicInfo(data).subscribe(res => {
        console.log('保存', res)
        console.log('ssdsd', typeof this.stepArr.length)
        if (saveOrskip === 'skip') {
          this.$router.push({
            name: 'brand-staff-edit',
            query: {
              staffId: res.staff_id,
              currentIndex: 1,
              isShowCoach: this.stepArr.length === 3 ? 1 : 0
            }
          })
        } else if (saveOrskip === 'save') {
          console.log('返回列表')
          this.messageService.success({ content: '保存成功' })
          this.$router.go(-1)
        }
      })
    },
    onBasicInfoSave(form) { // 保存
      console.log(form)
      this.submit(form, 'save')
    }
  },
  mounted() {
    console.log('===', this.staffEnums)
  }
}
</script>
