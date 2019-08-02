<template>
  <section :class="basic()">
    <st-panel title="私教课详情">
      <div slot="actions">
        <st-button
          v-if="auth['shop:sold:sold_personal_course|export_contract']"
          class="mgr-8"
          type="primary"
          @click="toContract"
        >
          查看合同
        </st-button>
        <st-button
          v-if="auth['shop:sold:sold_personal_course|frozen']"
          class="mgr-8"
          @click="onFreeze"
        >
          冻结
        </st-button>
        <st-button
          v-if="auth['shop:sold:sold_personal_course|unfrozen']"
          class="mgr-8"
          @click="onUnfreeze"
        >
          取消冻结
        </st-button>
        <st-button
          v-if="auth['shop:sold:sold_personal_course|change_coach']"
          class="mgr-8"
          @click="onEditCoach"
        >
          修改教练
        </st-button>
        <a-dropdown v-if="showMore">
          <a-button>
            更多操作
            <a-icon type="down" />
          </a-button>
          <a-menu slot="overlay">
            <a-menu-item
              v-if="auth['shop:sold:sold_personal_course|course_num']"
              @click="onSurplus"
            >
              修改剩余课时
            </a-menu-item>
            <a-menu-item
              v-if="auth['shop:sold:sold_personal_course|transfer']"
              @click="onTransfer"
            >
              转让
            </a-menu-item>
            <a-menu-item
              v-if="auth['brand_shop:order:order|refund']"
              @click="onRefund"
            >
              退款
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
      <a-row :gutter="24">
        <a-col :span="9">
          <st-info>
            <st-info-item label="课程名称">
              {{ personalInfo.course_name }}
            </st-info-item>
            <st-info-item label="类型">{{ personalInfo.type }}</st-info-item>
            <st-info-item label="剩余课时">
              {{ personalInfo.remain_course_num }}节
            </st-info-item>
            <st-info-item label="购买课时">
              {{ personalInfo.init_course_num }}节
            </st-info-item>
            <st-info-item label="有效期">
              {{ personalInfo.buy_time }} 至 {{ personalInfo.end_time }}
            </st-info-item>
          </st-info>
        </a-col>
        <a-col :span="9">
          <st-info>
            <st-info-item label="所属会员">
              {{ personalInfo.member_name }}
            </st-info-item>
            <st-info-item label="手机号">
              {{ personalInfo.mobile }}
            </st-info-item>
            <st-info-item label="上课教练">
              {{ personalInfo.coach_name }}
            </st-info-item>
            <st-info-item label="教练等级">
              {{ personalInfo.coach_level }}
            </st-info-item>
            <st-info-item label="订单号">
              {{ personalInfo.order_id }}
            </st-info-item>
          </st-info>
        </a-col>
        <a-col :span="6">
          <st-info>
            <st-info-item label="允许转让">
              {{
                personalInfo.is_transferable
                  | enumFilter('sold.is_transferable')
              }}
            </st-info-item>
            <st-info-item label="转让手续费">
              {{ personalInfo.transfer_num
              }}{{
                personalInfo.transfer_unit
                  | enumFilter('package_course.transfer_unit')
              }}
            </st-info-item>
            <st-info-item label="当前状态">
              {{
                personalInfo.course_status | enumFilter('sold.course_status')
              }}
            </st-info-item>
            <st-info-item label="订单状态">
              {{ personalInfo.order_status | enumFilter('sold.order_status') }}
            </st-info-item>
            <st-info-item label="时长">
              {{ personalInfo.duration }}分钟
            </st-info-item>
          </st-info>
        </a-col>
        <a-col :span="24">
          <st-info>
            <st-info-item label="备注" class="mg-b0">
              {{ personalInfo.description || '无' }}
            </st-info-item>
          </st-info>
        </a-col>
      </a-row>
    </st-panel>
    <st-panel
      initial
      class="mgt-12"
      v-if="false"
      :tabs="[
        {
          label: '消费记录',
          route: {
            name: 'shop-sold-course-info-personal-info-consumption-record',
            query: { id: infoService.id }
          }
        },
        {
          label: '操作日志',
          route: {
            name: 'shop-sold-course-info-personal-info-operation-record',
            query: { id: infoService.id }
          }
        }
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
import SoldCourseCoach from '@/views/biz-modals/sold/course/coach'
import SoldCourseFreeze from '@/views/biz-modals/sold/course/freeze'
import SoldCourseRefund from '@/views/biz-modals/sold/course/refund'
import SoldCourseSurplusPersonal from '@/views/biz-modals/sold/course/surplus-personal'
import SoldCourseTransfer from '@/views/biz-modals/sold/course/transfer'
export default {
  name: 'PageShopSoldCoursePersonalInfo',
  bem: {
    basic: 'page-shop-sold-info'
  },
  modals: {
    SoldCourseCoach,
    SoldCourseFreeze,
    SoldCourseRefund,
    SoldCourseSurplusPersonal,
    SoldCourseTransfer
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
      query: this.routeService.query$,
      auth: this.infoService.auth$
    }
  },
  computed: {
    showMore() {
      return (
        this.auth['shop:sold:sold_personal_course|course_num'] &&
        this.auth['shop:sold:sold_personal_course|transfer'] &&
        this.auth['brand_shop:order:order|refund']
      )
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
    // 跳转合同
    toContract() {
      let record = this.personalInfo
      let url = `${window.location.origin}/extra/contract-preview?id=${
        record.order_id
      }`
      window.open(url)
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
          time: `${moment(this.personalInfo.buy_time * 1000).format(
            'YYYY-MM-DD HH:mm'
          )} 至 ${moment(this.personalInfo.end_time * 1000).format(
            'YYYY-MM-DD HH:mm'
          )}`
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
          return this.infoService
            .unFreeze(this.infoService.id)
            .toPromise()
            .then(() => {
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
