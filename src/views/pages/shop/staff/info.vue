<template>
  <st-panel-layout class="pages-staffdata-container">
    <st-panel class="pages-staffdata-header">
      <a-row>
        <a-col :span="15" class="pages-staffdata-header-detail">
          <div class="staff-avatar-container st-preview-item">
            <img :src="image_avatar_url" />
            <div class="staff-avatar-tip">
              {{ info.work_status.name }}/{{ info.nature_work.name }}
            </div>
          </div>
          <div class="staff-info-container">
            <div class="staff-info-name">
              {{ info.staff_name }}（{{ info.nickname }}）
              <st-icon
                :type="info.sex === 1 ? 'female' : 'male'"
                :style="info.sex === 1 ? 'color:#FF5E41' : 'color:#3F66F6'"
              />
            </div>
            <div class="staff-info-cont">
              <span class="mg-r8">手机号：{{ info.mobile }}</span>
              <span class="mg-r8" v-if="info.staff_num">
                工号：{{ info.staff_num }}
              </span>
              <span v-if="info.coach_level">
                {{ $c('coach') }}等级：{{ info.coach_level }}
              </span>
            </div>
            <div class="staff-info-shops">
              <span class="mg-r8">所在部门: {{ info.department }}</span>
              <span>所在门店: {{ info.shop_num }}家门店</span>
            </div>
          </div>
        </a-col>
        <a-col
          :span="9"
          style="text-align: right;"
          v-if="info.work_status.name === '在职'"
        >
          <st-btn-actions :options="btnOptions"></st-btn-actions>
        </a-col>
      </a-row>
    </st-panel>
    <st-panel app :tabs="tabList">
      <div slot="actions"></div>
      <router-view></router-view>
    </st-panel>
  </st-panel-layout>
</template>
<script>
import { InfoService } from './info.service'
import ShopStaffBindCard from '@/views/biz-modals/shop-staff/bind-card'
import ShopStaffLeaveCurrentShop from '@/views/biz-modals/shop-staff/leave-current-shop'
import ShopStaffRePassword from '@/views/biz-modals/shop-staff/re-password'
import ShopStaffSalaryAccountSetting from '@/views/biz-modals/shop-staff/salary-account-setting'
import ShopStaffUpdateStaffPosition from '@/views/biz-modals/shop-staff/update-staff-position'
import StaffUpdateStaffPosition from '@/views/biz-modals/staff/update-staff-position'
import { forEach } from 'lodash-es'
export default {
  modals: {
    ShopStaffBindCard,
    ShopStaffLeaveCurrentShop,
    ShopStaffRePassword,
    ShopStaffSalaryAccountSetting,
    ShopStaffUpdateStaffPosition,
    StaffUpdateStaffPosition
  },
  serviceInject() {
    return {
      infoService: InfoService
    }
  },
  rxState() {
    return {
      info: this.infoService.info$,
      auth: this.infoService.auth$
    }
  },
  data() {
    return {
      basic: {
        label: '员工资料',
        route: {
          name: 'shop-staff-info-basic',
          query: { id: this.$searchQuery.id }
        }
      },
      course: {
        label: '上课记录',
        route: {
          name: 'shop-staff-info-course',
          query: { id: this.$searchQuery.id }
        }
      },
      follow: {
        label: '跟进记录',
        route: {
          name: 'shop-staff-info-follow',
          query: { id: this.$searchQuery.id }
        }
      },
      sold: {
        label: '售卖订单',
        route: {
          name: 'shop-staff-info-sold',
          query: { id: this.$searchQuery.id }
        }
      },
      member: {
        label: '服务课程',
        route: {
          name: 'shop-staff-info-member',
          query: { id: this.$searchQuery.id }
        }
      },
      tabList: []
    }
  },
  computed: {
    image_avatar_url() {
      return (
        (this.info &&
          this.info.image_avatar &&
          this.info.image_avatar.image_url) ||
        ''
      )
    },
    btnOptions() {
      return [
        {
          text: '编辑资料',
          click: this.editStaffInfo,
          if: this.auth['shop:staff:staff|edit']
        },
        {
          text: '绑定实体卡',
          click: this.openModalBindCard,
          if: this.auth['shop:staff:staff|bind_card']
        },
        {
          text: '重绑实体卡',
          click: this.openModalRebindCard,
          if: this.auth['shop:staff:staff|rebind_card']
        },
        {
          text: '职位和薪资变更',
          click: this.openModalPosition,
          if: this.auth['shop:staff:staff|position']
        },
        {
          text: '离职',
          click: this.openModalLeave,
          if: this.auth['shop:staff:staff|leave']
        },
        {
          text: '复职',
          click: this.openModalReinstate,
          if: this.auth['shop:staff:staff|reinstate']
        },
        {
          text: '管理登录账户',
          click: this.openModalSave,
          if: this.auth['shop:staff:account|save']
        },
        {
          text: '设置薪资账户',
          click: this.openModalSalary,
          if: this.auth['shop:staff:staff|salary']
        },
        {
          text: '解除门店关系',
          click: this.openModalShopLeave,
          if: this.auth['shop:staff:staff|shop_leave']
        }
      ]
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
    openModal(modalType) {
      const modalPathList = {
        bind_card: 'shop-staff-bind-card',
        rebind_card: 'shop-staff-bind-card',
        leave: 'shop-staff-turnover',
        reinstate: 'shop-staff-reinstatement',
        save: 'shop-staff-re-password',
        position: 'shop-staff-update-staff-position',
        salary: 'shop-staff-salary-account-setting',
        shop_leave: 'shop-staff-leave-current-shop'
      }
      const name = modalPathList[modalType]
      this.$modalRouter.push({
        name,
        props: { staff: this.info }
      })
    },
    openModalBindCard() {
      this.openModal('bind_card')
    },
    openModalRebindCard() {
      this.openModal('rebind_card')
    },
    openModalLeave() {
      this.openModal('leave')
    },
    openModalReinstate() {
      this.openModal('reinstate')
    },
    openModalSave() {
      this.openModal('save')
    },
    openModalPosition() {
      this.openModal('position')
    },
    openModalSalary() {
      this.openModal('salary')
    },
    openModalShopLeave() {
      this.openModal('shop_leave')
    },
    editStaffInfo() {
      this.$router.push({
        name: 'shop-staff-edit',
        query: { id: this.info.id }
      })
    }
  }
}
</script>
