<template>
  <div class="pages-staffdata-container">
    <st-panel class="pages-staffdata-header">
      <a-row :gutter="8">
        <a-col :lg="16" class="pages-staffdata-header-detail">
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
              <st-icon type="male" v-if="info.sex === 2"></st-icon>
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
        <a-col :lg="7" :offset="1" style="text-align: right;">
          <st-button class="mg-r8" v-if="auth['brand_shop:staff:staff|edit']" type="primary" @click="editStaffInfo">编辑资料</st-button>
          <st-button class="mg-r8" v-if="auth['brand_shop:staff:staff|bind_card']" v-modal-link="{ name: 'staff-bind-entity-card', props: {staff: info} }">绑定实体卡</st-button>
          <st-button class="mg-r8" v-if="auth['brand_shop:staff:staff|rebind_card']" v-modal-link="{ name: 'staff-bind-entity-card', props: {staff: info} }">重绑实体卡</st-button>
          <a-dropdown>
            <a-menu slot="overlay" @click="handleMenuClick">
              <a-menu-item v-if="auth['brand_shop:staff:staff|position']"><a href="#" @click="jumpToStaffPosition">职位变更</a></a-menu-item>
              <a-menu-item v-if="auth['brand_shop:staff:staff|leave']"><a v-modal-link="{ name: 'staff-turnover', props: {staff: info} } ">离职</a></a-menu-item>
              <a-menu-item v-if="auth['brand_shop:staff:staff|reinstate']"><a v-modal-link="{ name: 'staff-reinstatement', props: {staff: info} } ">复职</a></a-menu-item>
              <a-menu-item v-if="auth['brand_shop:staff:account|save']"><a v-modal-link="{ name: 'staff-re-password', props: {staff: info} }">管理登录账户</a></a-menu-item>
              <a-menu-item v-if="auth['brand_shop:staff:staff|salary']"><a v-modal-link="{ name: 'staff-salary-account-setting', props: {staff: info} }">设置薪资账户</a></a-menu-item>
            </a-menu>
            <a-button>
              更多操作
              <a-icon type="down"/>
            </a-button>
          </a-dropdown>
        </a-col>
      </a-row>
    </st-panel>
    <st-panel :tabs="identity">
      <div slot="actions"></div>
      <router-view></router-view>
    </st-panel>
  </div>
</template>
<script>
import { InfoService } from './info.service'
import { forEach } from 'lodash-es'
import { RouteService } from '@/services/route.service'

export default {
  serviceInject() {
    return {
      infoService: InfoService,
      routeService: RouteService
    }
  },
  rxState() {
    return {
      info: this.infoService.info$,
      auth: this.infoService.auth$,
      query: this.routeService.query$
    }
  },
  data() {
    return {
      identity: [],
      basic: {
        label: '员工资料',
        route: { name: 'brand-staff-info-basic', query: { id: this.query.id } }
      },
      course: {
        label: '上课记录',
        route: { name: 'brand-staff-info-course', query: { id: this.query.id } }
      },
      follow: {
        label: '跟进记录',
        route: { name: 'brand-staff-info-follow', query: { id: this.query.id } }
      },
      sold: {
        label: '售卖订单',
        route: { name: 'brand-staff-info-sold', query: { id: this.query.id } }
      },
      member: {
        label: '服务课程',
        route: { name: 'brand-staff-info-member', query: { id: this.query.id } }
      }
    }
  },
  created() {
    // 会籍销售：跟进记录、服务课程 、销售订单
    // 团课教练：上课记录
    // 私教教练：上课记录、跟进记录、服务课程 、销售订单

    // 1,普通员工 2-会籍销售；3-团课教练；4-私人教练
    let { identity } = this.info
    identity = identity.map(item => item.id)
    console.log('identity', identity)
    let indetitySet = new Set()
    if (Array.isArray(identity) && identity.length) {
      identity.forEach(ele => {
        if (ele === 2) {
          this.setIndentyList(['basic', 'member', 'sold'], indetitySet)
        } else if (ele === 3) {
          this.setIndentyList(['basic', 'course'], indetitySet)
        } else if (ele === 4) {
          this.setIndentyList(['basic', 'course', 'follow', 'member', 'sold'], indetitySet)
        }
      })
    } else {
      this.setIndentyList(['basic'], indetitySet)
    }
    this.identity = Array.from(indetitySet).map(key => this[key])
    this.$router.replace({
      name: 'brand-staff-info-basic',
      query: { id: this.query.id }
    })
  },
  methods: {
    handleMenuClick() {},
    jumpToStaffPosition() {
      this.$modalRouter.push({
        name: 'staff-update-staff-position',
        props: {
          staff: this.info
        }
      })
    },
    setIndentyList(arr, targetArr) {
      arr.forEach(key => targetArr.add(key, this[key]))
    },
    editStaffInfo() {
      this.$router.push({
        name: 'brand-staff-edit',
        query: { id: this.info.id }
      })
    }
  }
}
</script>
