<template>
  <st-panel app>
    <a-row class="mg-b48 mg-t48" :gutter="8">
      <a-col offset="1" :span="22" >
        <a-steps :current="currentIndex">
          <a-step v-for="item in stepArr" :key="item.key" :title="item.title"
            @click="changeStep(item.key)" class="cursor-pointer"/>
        </a-steps>
      </a-col>
    </a-row>
    <edit-detail-basics-info v-show="currentIndex === 0" @goNext="goNext" :formData="formData.staff_info" @bacicInfoSave="onBasicsSave"/>
    <edit-detail-detailed-info v-show="currentIndex === 1" @goNext="goNext"/>
    <edit-detail-coach-info v-show="currentIndex === 2" @goNext="goNext"/>
  </st-panel>
</template>
<script>
import EditDetailBasicsInfo from './edit#/edit-detail-basicsInfo'
import EditDetailDetailedInfo from './edit#/edit-detail-detailedInfo'
import EditDetailCoachInfo from './edit#/edit-detail-coachInfo'
import { EditService } from './edit.service'
export default {
  serviceInject() {
    return {
      editService: EditService
    }
  },
  subscriptions() {
    return {
      formData: this.editService.formData$,
      countryList: this.editService.countryList$
    }
  },
  components: {
    EditDetailBasicsInfo, // 编辑基础信息
    EditDetailDetailedInfo, // 编辑详细信息
    EditDetailCoachInfo // 编辑教练信息
  },
  data() {
    return {
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
  methods: {
    onBasicsSave(data) {
      console.log('员工基础信息保存', data)
      this.editService.editBasicInfo(1, data.data)
    },
    goNext() {
      if (this.currentIndex < 2) {
        this.currentIndex = this.currentIndex + 1
      }
    },
    changeStep(step) {
      this.currentIndex = step
    }
  },
  mounted() {
    console.log('editall', this)
  }
}
</script>
