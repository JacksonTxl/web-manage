<template>
  <div class="pages-staffdata-container">
    <st-panel class="pages-staffdata-header">
      <a-row :gutter="8">
        <a-col :lg="17" class="pages-staffdata-header-detail">
          <div class="staff-avatar-container st-preview-item">
            <img
              src="//styd-saas-test.oss-cn-shanghai.aliyuncs.com/image/20190411/nmdNRC_cVqWSjCNg.png?x-oss-process=image/resize,interlace_1,m_fill,w_208,h_208"
            >
            <div class="staff-avatar-tip">{{ info.work_status.name }}/{{ info.nature_work.name }}</div>
          </div>
          <div class="staff-info-container">
            <div class="staff-info-name">
              {{ info.staff_name }}（{{ info.nickname }}）
              <st-icon v-if="info.sex === 1" type="female" style="color:#FF5E41;"></st-icon>
              <st-icon type="man" v-if="info.sex === 2"></st-icon>
            </div>
            <div class="staff-info-cont">
              <span class="mg-r8">手机号：{{ info.mobile }}</span>
              <span class="mg-r8">工号：{{ info.staff_num }}</span>
              <span>教练等级：{{ info.coach_level }}</span>
            </div>
            <div class="staff-info-shops">
              <span># {{ info.department }} /</span>
              <span>所在{{ info.shop_num }}家门店</span>
            </div>
          </div>
        </a-col>
        <a-col :lg="6" :offset="1" style="text-align: right;">
          <st-button class="mg-r8" type="primary" @click="editStaffInfo">编辑资料</st-button>
          <st-button class="mg-r8">绑实体卡</st-button>
          <a-dropdown>
            <a-menu slot="overlay" @click="handleMenuClick">
              <a-menu-item key="1">1st item</a-menu-item>
              <a-menu-item key="2">2nd item</a-menu-item>
              <a-menu-item key="3">3rd item</a-menu-item>
            </a-menu>
            <a-button>
              更多操作
              <a-icon type="down"/>
            </a-button>
          </a-dropdown>
        </a-col>
      </a-row>
    </st-panel>
    <st-panel
      :tabs="[
          { label: '上课记录', route: { name: 'brand-staff-info-course' ,query: { id: info.id}}},
          { label: '跟进记录', route: { name: 'brand-staff-info-follow',query: { id: info.id} } },
          { label: '售卖订单', route: { name: 'brand-staff-info-sold',query: { id: info.id} } },
          { label: '服务课程', route: { name: 'brand-staff-info-member',query: { id: info.id} } },
          { label: '员工资料', route: { name: 'brand-staff-info-basic' ,query: { id: info.id}}}
        ]"
    >
      <div slot="actions"></div>
      <router-view></router-view>
    </st-panel>
  </div>
</template>
<script>
import { InfoService } from './info.service'
export default {
  serviceInject() {
    return {
      infoService: InfoService
    }
  },
  rxState() {
    return {
      info: this.infoService.info$
    }
  },
  data() {
    return {}
  },
  methods: {
    handleMenuClick() {},
    editStaffInfo() {
      this.$router.push({
        name: 'brand-staff-edit',
        query: { staffId: this.info.id }
      })
    }
  },
  mounted() {
    console.log('=========', this.info.id)
  }
}
</script>
