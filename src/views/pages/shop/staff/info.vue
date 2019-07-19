<template>
  <div class="pages-staffdata-container">
    <st-panel class="pages-staffdata-header">
      <a-row>
        <a-col :span="15" class="pages-staffdata-header-detail">
          <div class="staff-avatar-container st-preview-item">
            <img :src="image_avatar_url">
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
              <span class="mg-r8" v-if="info.staff_num">工号：{{ info.staff_num }}</span>
              <span v-if="info.coach_level">教练等级：{{ info.coach_level }}</span>
            </div>
            <div class="staff-info-shops">
              <span class="mg-r8">所在部门: {{ info.department }}</span>
              <span>所在门店: {{ info.shop_num }}家门店</span>
            </div>
          </div>
        </a-col>
        <a-col :span="9" style="text-align: right;" v-if="info.work_status.name === '在职'">
          <st-button class="mg-r8" v-if="auth['brand_shop:staff:staff|edit']" type="primary" @click="editStaffInfo">编辑资料</st-button>
          <st-button class="mg-r8" v-if="auth['brand_shop:staff:staff|bind_card']" v-modal-link="{ name: 'shop-staff-bind-card', props: {staff: info} }">绑实体卡</st-button>
          <st-button class="mg-r8" v-if="auth['brand_shop:staff:staff|rebind_card']" v-modal-link="{ name: 'shop-staff-bind-card', props: {staff: info} }">重绑实体卡</st-button>
          <a-dropdown>
            <a-menu slot="overlay" @click="handleMenuClick">
              <a-menu-item>
                <a v-if="auth['brand_shop:staff:account|save']"
                  v-modal-link="{ name: 'shop-staff-re-password', props: {staff: info} }">管理登录账号</a>
              </a-menu-item>
              <a-menu-item>
                <a v-if="auth['brand_shop:staff:staff|position']" @click="jumpToStaffPosition">职位变更</a>
              </a-menu-item>
              <a-menu-item>
                <a v-if="auth['brand_shop:staff:staff|salary']"
                  v-modal-link="{ name: 'shop-staff-salary-account-setting', props: {staff: info} }">设置薪资账户</a>
              </a-menu-item>
              <a-menu-item>
                <a v-if="auth['brand_shop:staff:staff|shop_leave']"
                  v-modal-link="{ name: 'shop-staff-leave-current-shop', props: {staff: info} }">解除门店关系</a>
              </a-menu-item>
            </a-menu>
            <a-button>
              更多操作
              <a-icon type="down"/>
            </a-button>
          </a-dropdown>
        </a-col>
      </a-row>
    </st-panel>
    <st-panel :tabs="tabList">
      <div slot="actions"></div>
      <router-view></router-view>
    </st-panel>
  </div>
</template>
<script>
import { InfoService } from './info.service'
import { RouteService } from '@/services/route.service'

import { forEach } from 'lodash-es'
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
      basic: {
        label: '员工资料',
        route: { name: 'shop-staff-info-basic', query: { id: this.query.id } }
      },
      course: {
        label: '上课记录',
        route: { name: 'shop-staff-info-course', query: { id: this.query.id } }
      },
      follow: {
        label: '跟进记录',
        route: { name: 'shop-staff-info-follow', query: { id: this.query.id } }
      },
      sold: {
        label: '售卖订单',
        route: { name: 'shop-staff-info-sold', query: { id: this.query.id } }
      },
      member: {
        label: '服务课程',
        route: { name: 'shop-staff-info-member', query: { id: this.query.id } }
      },
      tabList: []
    }
  },
  computed: {
    image_avatar_url() {
      return (this.info && this.info.image_avatar && this.info.image_avatar.image_url) || ''
    }
  },
  created() {
    // 团课教练：上课记录
    // 私教教练：上课记录、跟进记录、服务课程 、销售订单
    // 会籍销售：跟进记录、服务课程 、销售订单
    // 1,普通员工 2-会籍销售；3-团课教练；4-私人教练
    let { identity } = this.info
    identity = identity.map(item => item.id)
    let tabSet = new Set()
    this.setIndentyList(['basic'], tabSet)
    if (Array.isArray(identity) && identity.length) {
      identity.forEach(ele => {
        if (ele === 2) {
          this.setIndentyList(['member', 'sold'], tabSet)
        } else if (ele === 3) {
          this.setIndentyList(['course'], tabSet)
        } else if (ele === 4) {
          this.setIndentyList(['course', 'follow', 'member', 'sold'], tabSet)
        }
      })
    }
    this.tabList = Array.from(tabSet).map(key => this[key])
  },
  methods: {
    setIndentyList(arr, targetArr) {
      arr.forEach(key => targetArr.add(key, this[key]))
    },
    jumpToStaffPosition(info) {
      console.log(this.info)
      this.$modalRouter.push({
        name: 'shop-staff-update-staff-position',
        props: {
          staff: this.info
        }
      })
    },
    handleMenuClick() {},
    editStaffInfo() {
      this.$router.push({
        name: 'shop-staff-edit',
        query: { id: this.info.id }
      })
    }
  }
}
</script>
