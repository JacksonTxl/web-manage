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
        <a-col :lg="6" :offset="1" style="text-align: right;" v-if="info.work_status.name === '在职'">
          <st-button class="mg-r8" type="primary" @click="editStaffInfo">编辑资料</st-button>
          <st-button v-if="info.has_card === 0" class="mg-r8">绑实体卡</st-button>
          <st-button v-if="info.has_card === 1" class="mg-r8">重绑实体卡</st-button>
          <a-dropdown>
            <a-menu slot="overlay" @click="handleMenuClick">
              <a-menu-item key="1">管理登录账号</a-menu-item>
              <a-menu-item key="2">职位变更</a-menu-item>
              <a-menu-item key="3">设置薪资账户</a-menu-item>
              <a-menu-item key="4">离职</a-menu-item>
            </a-menu>
            <a-button>
              更多操作
              <a-icon type="down"/>
            </a-button>
          </a-dropdown>
        </a-col>
      </a-row>
    </st-panel>
    <st-panel :tabs="list">
      <div slot="actions"></div>
      <router-view></router-view>
    </st-panel>
  </div>
</template>
<script>
import { InfoService } from './info.service'
import { forEach } from 'lodash-es'
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
      course: {
        label: '上课记录',
        route: { name: 'shop-staff-info-course', query: { id: this.info.id } }
      },
      follow: {
        label: '跟进记录',
        route: { name: 'shop-staff-info-follow', query: { id: this.info.id } }
      },
      sold: {
        label: '售卖订单',
        route: { name: 'shop-staff-info-sold', query: { id: this.info.id } }
      },
      member: {
        label: '服务课程',
        route: { name: 'shop-staff-info-member', query: { id: this.info.id } }
      },
      list: [
        {
          label: '员工资料',
          route: { name: 'shop-staff-info-basic', query: { id: this.info.id } }
        }
      ]
    }
  },
  methods: {
    handleMenuClick() {},
    editStaffInfo() {
      this.$router.push({
        name: 'brand-staff-edit',
        query: { staffId: this.info.id }
      })
    },
    flitertabs(identity) {
      let map = {}
      let obj = {
        // basic: [1, 2, 3, 4],
        course: [3, 4], // 上课记录
        follow: [2, 4], // 跟进记录
        member: [4], // 服务课程
        sold: [2, 4] // 售卖订单
      }
      let i = 0
      while (i < identity.length) {
        for (var j in obj) {
          if (obj[j].indexOf(identity[i]) !== -1) {
            map[j] = true
          }
        }
        i++
      }
      console.log('======', map)
      return map
    },
    showTabs(map) {
      for (let i in map) {
        if (map[i]) {
          this.list.push(this[i])
        }
      }
    }
  },
  created() {
    let { identity } = this.$route.meta.query
    this.showTabs(this.flitertabs(identity))
    this.$router.replace({
      name: 'shop-staff-info-basic',
      query: {
        id: this.info.id
      }
    })
  }
}
</script>
