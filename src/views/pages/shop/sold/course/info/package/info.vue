<template>
  <section :class="basic()">
    <st-panel title="课程包详情" >
      <div slot="actions">
        <st-button v-if="auth['shop:sold:sold_package_course|export_contract']" class="mgr-8" type="primary">查看合同</st-button>
        <st-button v-if="auth['shop:sold:sold_package_course|frozen']" class="mgr-8" @click="onFreeze">冻结</st-button>
        <st-button v-if="auth['shop:sold:sold_package_course|unfrozen']" class="mgr-8" @click="onUnfreeze">取消冻结</st-button>
        <a-dropdown>
            <a-menu slot="overlay">
              <a-menu-item v-if="auth['shop:sold:sold_package_course|course_num']" @click="onSurplus">修改剩余课时</a-menu-item>
              <a-menu-item v-if="auth['shop:sold:sold_package_course|transfer']" @click="onTransfer">转让</a-menu-item>
              <a-menu-item v-if="auth['shop:sold:sold_package_course|refund']" @click="onRefund">退款</a-menu-item>
            </a-menu>
            <a-button>
              更多操作
              <a-icon type="down"/>
            </a-button>
          </a-dropdown>
      </div>
      <a-row :gutter="24">
        <a-col :span="9">
          <st-info>
            <st-info-item label="课程名称">{{packageInfo.course_name}}</st-info-item>
            <st-info-item label="类型">{{packageInfo.type}}</st-info-item>
            <st-info-item label="剩余课时">{{packageInfo.team_course_remain}}节私教课,{{packageInfo.personal_course_remain}}节团体课</st-info-item>
            <st-info-item label="有效期">{{moment(packageInfo.course_buy_time*1000).format('YYYY-MM-DD HH:mm')}} 至 {{moment(packageInfo.course_end_time*1000).format('YYYY-MM-DD HH:mm')}}</st-info-item>
          </st-info>
        </a-col>
        <a-col :span="9">
          <st-info>
            <st-info-item label="所属会员">{{packageInfo.member_name}}</st-info-item>
            <st-info-item label="手机号">{{packageInfo.mobile}}</st-info-item>
            <st-info-item label="订单号">{{packageInfo.order_id}}</st-info-item>
            <st-info-item label="订单状态">{{packageInfo.order_status | enumFilter('sold.order_status')}}</st-info-item>
          </st-info>
        </a-col>
        <a-col :span="6">
          <st-info>
            <st-info-item label="允许转让">{{packageInfo.is_transferable | enumFilter('sold.is_transferable')}}</st-info-item>
            <st-info-item label="转让手续费" v-if="packageInfo.is_transferable !== 0">{{packageInfo.transfer_num}}{{packageInfo.transfer_unit | enumFilter('package_course.transfer_unit')}}</st-info-item>
            <st-info-item label="当前状态">{{packageInfo.course_status | enumFilter('sold.course_status')}}</st-info-item>
            <st-info-item label="上课范围">{{packageInfo.team_course_init}}节私教课,{{packageInfo.personal_course_init}}节团体课</st-info-item>
          </st-info>
        </a-col>
        <a-col :span="24">
          <st-info>
            <st-info-item label="备注" class="mg-b0">{{packageInfo.description||'无'}}</st-info-item>
          </st-info>
        </a-col>
      </a-row>
    </st-panel>
    <st-panel initial class="mgt-12" v-if="false"
      :tabs="[
        { label: '消费记录', route: { name: 'shop-sold-course-info-package-info-consumption-record', query: {id:infoService.id} } },
        { label: '操作日志', route: { name: 'shop-sold-course-info-package-info-operation-record', query: {id:infoService.id} } },
      ]"
    >
    <router-view></router-view>
  </st-panel>
  </section>
</template>
<script>
import { InfoService } from './info.service'
import moment from 'moment'
import { RouteService } from '@/services/route.service'
export default {
  name: 'PageShopSoldCoursePackageInfo',
  bem: {
    basic: 'page-shop-sold-info'
  },
  serviceInject() {
    return {
      infoService: InfoService,
      routeService: RouteService
    }
  },
  rxState() {
    return {
      packageInfo: this.infoService.packageInfo$,
      query: this.routeService.query$,
      auth: this.infoService.auth$
    }
  },
  methods: {
    moment,
    // 修改剩余课时
    onSurplus() {
      let data = {
        id: this.infoService.id,
        courseName: this.packageInfo.course_name,
        time: `${moment(this.packageInfo.course_buy_time * 1000).format('YYYY-MM-DD HH:mm')} 至 ${moment(this.packageInfo.course_end_time * 1000).format('YYYY-MM-DD HH:mm')}`
      }
      this.$modalRouter.push({
        name: 'sold-course-surplus',
        props: {
          courseType: 'coursePackage',
          courseData: data
        },
        on: {
          success: () => {
            this.$router.push({ force: true, query: this.query })
          }
        }
      })
    },
    // 冻结
    onFreeze() {
      this.$modalRouter.push({
        name: 'sold-course-freeze',
        props: {
          type: 'package',
          id: this.infoService.id,
          courseName: this.packageInfo.course_name,
          courseNum: this.packageInfo.remain_course_num,
          courseEndTime: moment(this.packageInfo.course_end_time * 1000),
          time: `${moment(this.packageInfo.course_buy_time * 1000).format('YYYY-MM-DD HH:mm')} 至 ${moment(this.packageInfo.course_end_time * 1000).format('YYYY-MM-DD HH:mm')}`
        },
        on: {
          success: () => {
            this.$router.push({ force: true, query: this.query })
          }
        }
      })
    },
    // 取消冻结
    onUnfreeze(record) {
      this.$confirm({
        title: '提示',
        content: '是否取消冻结？',
        maskClosable: true,
        onOk: () => {
          return this.infoService.unFreeze(this.infoService.id).toPromise().then(() => {
            this.$router.push({ force: true, query: this.query })
          })
        }
      })
    },
    // 转让
    onTransfer(record) {
      this.$modalRouter.push({
        name: 'sold-course-transfer',
        props: {
          type: 'package',
          id: this.infoService.id
        },
        on: {
          success() {
            this.$router.push({ force: true, query: this.query })
          }
        }
      })
    },
    // 退款
    onRefund(record) {
      this.$modalRouter.push({
        name: 'sold-course-refund',
        props: {
          id: this.infoService.id
        },
        on: {
          success() {
            this.$router.push({ force: true, query: this.query })
          }
        }
      })
    }
  }
}
</script>
