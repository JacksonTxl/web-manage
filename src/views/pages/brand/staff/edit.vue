<template>
  <st-panel app>
    <a-row class="mg-b48 mg-t48" :gutter="8">
      <a-col offset="1" :span="22">
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
      v-show="currentIndex === 0"
      @goNext="goNext"
      :formData="formData.staff_info"
      @bacicInfoSave="onBasicsSave"
    />
    <edit-detail-detailed-info
      v-show="currentIndex === 1"
      @goNext="goNext"
      :formData="formData.staff_info"
      @detailInfoSave="onDetailInfoSave"/>
    <edit-detail-coach-info
      v-show="currentIndex === 2"
      @goNext="goNext"
      :formData="formData.staff_info"
      @coachInfoSave="onCoachInfoSave"/>
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
      let obk = {
        image_avatar: { image_id: 1, image_url: '1.xxx.com/xxxx' },
        image_face: { image_id: 1, image_url: '1.xxx.com/xxxx' },
        image_personal: [
          { image_id: 3, image_url: '1.xxx.com/xxxx' },
          { image_id: 4, image_url: '44.xxx.com/xxxx' }
        ],
        staff_id: 1,
        staff_name: '刘通',
        nickname: 'nickname',
        country_code_id: 37,
        mobile: '456644646',
        staff_num: '14561456',
        sex: 1,
        id_type: 1,
        mail: 'yllmvp@111.com',
        id_number: 132,
        department_id: 37,
        working_post: 'CEO',
        identity: [1, 2, 3],
        coach_level_id: 1,
        nature_work: 1,
        entry_date: '1970-05-05',
        role_id: [1, 2, 3],
        shop_id: [1, 2, 3],
        is_permission: 1,
        account: 'acb123',
        password: 'abc1233',
        repeat_password: 'abc1233',
        graduated_school: '清华111学',
        graduation_time: '2018-08-08',
        education: 2,
        profession: '计算几',
        birthday: 1978,
        native_place: '沪',
        marry_status: 1,
        children_status: 1,
        province_id: 111,
        province_name: '江苏省',
        city_id: '11111',
        city_name: '苏州市',
        district_id: '111121',
        district_name: '吴江区',
        address: '天上人间',
        description: '这里是测试员工',
        employment_time: '2018-08-08',
        specialty_id: [1, 2, 3],
        certification_name: ['证书1', 'zhengshu2'],
        introduction: 'fadsfads',
        is_show: 1,
        album_id: 0
      }
      this.editService.editBasicInfo(36, data.data).subscribe()
    },
    onDetailInfoSave(data) {
      console.log('员工详细信息保存', data)
      this.editService.editDetailInfo(36, data.data).subscribe()
    },
    onCoachInfoSave(data) {
      console.log('教练信息保存', data.data)
      this.editService.editCoachInfo(36, data.data).subscribe()
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
    let { currentIndex } = this.$route.query
    if (currentIndex) {
      this.currentIndex = currentIndex - 0
    }
  }
}
</script>
