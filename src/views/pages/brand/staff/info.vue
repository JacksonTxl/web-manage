<template>
  <div class="pages-staffdata-container ">
    <st-panel class="pages-staffdata-header">
        <a-row :gutter="8">
          <a-col :lg="17" class="pages-staffdata-header-detail">
            <div class="staff-avatar-container st-preview-item" >
              <img src="//styd-saas-test.oss-cn-shanghai.aliyuncs.com/image/20190411/nmdNRC_cVqWSjCNg.png?x-oss-process=image/resize,interlace_1,m_fill,w_208,h_208"/>
              <div class="staff-avatar-tip">
                在职/全职
              </div>
            </div>
            <div class="staff-info-container">
              <div class="staff-info-name">张三（二麻子）</div>
              <div class="staff-info-cont">
                <span class="mg-r8">手机号：123 1231 123</span>
                <span class="mg-r8">工号：st1223</span>
                <span>教练等级：SSR</span>
              </div>
              <div class="staff-info-shops">
                <span># 私教部 / </span>
                <span>所在三家门店</span>
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
                更多操作 <a-icon type="down" />
              </a-button>
            </a-dropdown>
          </a-col>
        </a-row>
      </st-panel>
    <st-panel
        :tabs="[
          { label: '上课记录', route: { name: 'brand-staff-info-course' }},
          { label: '跟进记录', route: { name: 'brand-staff-info-follow' } },
          { label: '售卖订单', route: { name: 'brand-staff-info-sold' } },
          { label: '服务会员', route: { name: 'brand-staff-info-member' } },
          { label: '员工资料', route: { name: 'brand-staff-info-basic' }}
        ]"
      >
        <div slot="actions">
        </div>
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
    return {

    }
  },
  methods: {
    handleMenuClick() {},
    editStaffInfo() {
      this.$router.push({ name: 'brand-staff-edit', query: { staffId: this.info.staff_id } })
    }
  },
  mounted() {
    console.log('=========', this.info)
  }
}
</script>
