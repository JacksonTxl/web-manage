<template>
  <st-panel app>
    <a-row :class="bstep()" class="mg-b48 mg-t48" :gutter="8">
      <a-col offset="1" :span="stepsSpan">
        <a-steps :current="currentIndex">
          <a-step
            v-for="item in stepArr"
            :key="item.key"
            :title="item.title"
            @click="changeStep(item.key)"
            class="cursor-pointer"
          />
        </a-steps>
      </a-col>
    </a-row>
    <edit-detail-basics-info
      v-if="currentIndex === 0"
      @goNext="goNext"
      @updateStaffInfo="updateStaffInfo"
      :enums="staffEnums"
      :data="staffInfo"
    />
    <edit-detail-detailed-info
      v-else-if="currentIndex === 1"
      @goNext="goNext"
      @back="onBack"
      :isPrivateCoach="isPrivateCoach"
      :enums="staffEnums"
      :data="staffInfo"
      @detailInfoSave="onDetailInfoSave"/>
    <edit-detail-coach-info
      v-else-if="currentIndex === 2 && isPrivateCoach"
      @back="onBack"
      :enums="staffEnums"
      :data="staffInfo"
      :staffSpecialty="staffSpecialty"
      @coachInfoSave="onCoachInfoSave"/>
  </st-panel>
</template>
<script>
import { UserService } from '@/services/user.service'
import EditDetailBasicsInfo from './edit#/edit-detail-basicsInfo'
import EditDetailDetailedInfo from './edit#/edit-detail-detailedInfo'
import EditDetailCoachInfo from './edit#/edit-detail-coachInfo'
import { EditService } from './edit.service'
export default {
  name: 'EditStaff',
  serviceInject() {
    return {
      userService: UserService,
      editService: EditService
    }
  },
  rxState() {
    return {
      staffEnums: this.userService.staffEnums$,
      staffInfo: this.editService.staffInfo$,
      codeList: this.editService.codeList$,
      staffSpecialty: this.editService.staffSpecialty$
    }
  },
  bem: {
    b: 'page-add-staff',
    bstep: 'page-add-staff-steps',
    bHeader: 'default-brand-header'
  },
  components: {
    EditDetailBasicsInfo, // 编辑基础信息
    EditDetailDetailedInfo, // 编辑详细信息
    EditDetailCoachInfo // 编辑教练信息
  },
  computed: {
    isShowCoach() {
      if (this.staffInfo.identity.length === 0) return false
      return this.staffInfo.identity.includes(3) || this.staffInfo.identity.includes(4)
    },
    isPrivateCoach() {
      if (this.staffInfo.identity.length === 0) return false
      return this.staffInfo.identity.includes(4)
    },
    id() {
      return this.staffInfo.staff_id
    }
  },
  watch: {
    isPrivateCoach(newVal) {
      if (newVal) {
        this.stepsSpan = 12
        this.stepArr.pop()
      }
    }
  },
  data() {
    return {
      stepsSpan: 18,
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
  mounted() {
    let { currentIndex } = this.$route.query
    if (!this.isPrivateCoach) {
      this.stepsSpan = 12
      this.stepArr.pop()
    }
    if (currentIndex) this.currentIndex = Number(currentIndex)
  },
  methods: {
    updateStaffInfo() {
      this.editService.editStaffInfo(this.id).subscribe()
    },
    onDetailInfoSave(data) {
      this.editService.updateDetailedInfo(this.id, data.data).subscribe(() => {
        if (!this.isPrivateCoach) {
          this.$router.push({ name: 'brand-staff-department' })
        } else {
          this.updateStaffInfo()
          this.goNext()
        }
      })
    },
    onCoachInfoSave(data) {
      this.editService.updateCoachInfo(this.id, data.data).subscribe(() => {
        this.$router.push({ name: 'brand-staff-department' })
      })
    },
    goNext() {
      if (this.currentIndex < 2) {
        this.currentIndex = this.currentIndex + 1
      }
    },
    onBack(step) {
      this.currentIndex = this.currentIndex - step
    },
    changeStep(step) {
      this.currentIndex = step
    }
  }
}
</script>
