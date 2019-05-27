<template>
  <section :class="basic()">
    <st-panel title="课程包详情">
      <div slot="actions">
        <st-button class="mgr-8" type="primary" @click="onSurplus">修改剩余课时</st-button>
        <st-button class="mgr-8" type="primary" @click="onFreeze">冻结</st-button>
        <st-button class="mgr-8" type="primary" @click="onUnfreeze">取消冻结</st-button>
        <st-button class="mgr-8" type="primary" @click="onTransfer">转让</st-button>
        <st-button class="mgr-8" type="primary" @click="onRefund">退款</st-button>
        <st-button class="mgr-8" type="primary" @click="onEditCoach">修改教练</st-button>
      </div>
      <a-row :gutter="24">
        <a-col :span="9">
          <st-info>
            <st-info-item label="课程名称">{{personalInfo.course_name}}</st-info-item>
            <st-info-item label="类型">{{personalInfo.type}}</st-info-item>
            <st-info-item label="剩余课时">{{personalInfo.remain_course_num}}节</st-info-item>
            <st-info-item label="购买课时">{{personalInfo.init_course_num}}节</st-info-item>
            <st-info-item label="有效期">{{moment(personalInfo.buy_time*1000).format('YYYY:MM:DD hh:mm')}} 至 {{moment(personalInfo.end_time*1000).format('YYYY:MM:DD hh:mm')}}</st-info-item>
          </st-info>
        </a-col>
        <a-col :span="9">
          <st-info>
            <st-info-item label="所属会员">{{personalInfo.member_name}}</st-info-item>
            <st-info-item label="手机号">{{personalInfo.mobile}}</st-info-item>
            <st-info-item label="上课教练">{{personalInfo.coach_name}}</st-info-item>
            <st-info-item label="教练等级">{{personalInfo.coach_level}}</st-info-item>
            <st-info-item label="订单号">{{personalInfo.order_id}}</st-info-item>
          </st-info>
        </a-col>
        <a-col :span="6">
          <st-info>
            <st-info-item label="允许转让">{{personalInfo.is_transferable | enumFilter('sold.is_transferable')}}</st-info-item>
            <st-info-item label="转让手续费">{{personalInfo.transfer_num}}{{personalInfo.transfer_unit | enumFilter('package_course.transfer_unit')}}</st-info-item>
            <st-info-item label="当前状态">{{personalInfo.course_status | enumFilter('sold.course_status')}}</st-info-item>
            <st-info-item label="订单状态">{{personalInfo.order_status | enumFilter('sold.order_status')}}</st-info-item>
            <st-info-item label="时长">{{personalInfo.duration}}分钟</st-info-item>
          </st-info>
        </a-col>
        <a-col :span="24">
          <st-info>
            <st-info-item label="备注" class="mg-b0">{{personalInfo.description||'无'}}</st-info-item>
          </st-info>
        </a-col>
      </a-row>
    </st-panel>
    <st-panel initial class="mgt-12"
      :tabs="[
        { label: '消费记录', route: { name: 'shop-sold-course-info-personal-info-consumption-record', query: {id:infoService.id} } },
        { label: '操作日志', route: { name: 'shop-sold-course-info-personal-info-operation-record', query: {id:infoService.id} } },
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
  name: 'PageShopSoldCoursePersonalInfo',
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
      personalInfo: this.infoService.personalInfo$,
      query: this.routeService.query$
    }
  },
  methods: {
    moment,
    // 修改剩余课时
    onSurplus() {
      this.$modalRouter.push({
        name: 'sold-course-surplus-personal',
        props: {
          courseData: this.personalInfo
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
          type: 'personal',
          id: this.personalInfo.id,
          courseName: this.personalInfo.course_name,
          courseNum: this.personalInfo.remain_course_num,
          courseEndTime: moment(this.personalInfo.end_time * 1000),
          time: `${moment(this.personalInfo.buy_time * 1000).format('YYYY-MM-DD HH:mm')} 至 ${moment(this.personalInfo.end_time * 1000).format('YYYY-MM-DD HH:mm')}`
        },
        on: {
          success: () => {
            this.$router.push({ force: true, query: this.query })
          }
        }
      })
    },
    // 取消冻结
    onUnfreeze() {
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
    onTransfer() {
      this.$modalRouter.push({
        name: 'sold-course-transfer',
        props: {
          type: 'personal',
          id: this.personalInfo.id
        },
        on: {
          success: () => {
            this.$router.push({ force: true, query: this.query })
          }
        }
      })
    },
    // 退款
    onRefund() {
      this.$modalRouter.push({
        name: 'sold-course-refund',
        props: {
          type: 'personal',
          id: this.personalInfo.id
        },
        on: {
          success: () => {
            this.$router.push({ force: true, query: this.query })
          }
        }
      })
    },
    // 修改教练
    onEditCoach() {
      this.$modalRouter.push({
        name: 'sold-course-coach',
        props: {
          record: this.personalInfo
        },
        on: {
          success: () => {
            this.$router.push({ force: true, query: this.query })
          }
        }
      })
    }
  }
}
</script>
