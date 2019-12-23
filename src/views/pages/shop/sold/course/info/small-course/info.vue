<template>
  <st-panel-layout :class="basic()">
    <st-panel title="小班课详情">
      <div slot="actions">
        <st-btn-actions
          :options="[
            {
              //if: auth['shop:sold:sold_personal_course|export_contract'],
              text: '查看合同',
              click: toContract
            },
            {
              //if: auth['shop:sold:sold_personal_course|transfer'],
              text: '转让',
              click: onTransfer
            },
            {
              //if: auth['brand_shop:order:order|refund'],
              text: '退款',
              click: onRefund
            }
          ]"
        ></st-btn-actions>
      </div>
      <a-row :gutter="24">
        <a-col :span="9">
          <st-info>
            <st-info-item label="课程名称">
              {{ info.course_name }}
            </st-info-item>
            <st-info-item label="类型">{{ info.type }}</st-info-item>
            <st-info-item label="剩余课时">
              {{ info.remain_course_num }}节
            </st-info-item>
            <st-info-item label="购买课时">
              {{ info.init_course_num }}节
            </st-info-item>
            <st-info-item label="班级时间">
              {{ info.buy_time }} 至 {{ info.end_time }}
            </st-info-item>
          </st-info>
        </a-col>
        <a-col :span="9">
          <st-info>
            <st-info-item label="所属会员">
              {{ info.member_name }}
            </st-info-item>
            <st-info-item label="家长手机号">
              {{ info.mobile }}
            </st-info-item>
            <st-info-item :label="`家长姓名`">
              {{ info.coach_name }}
            </st-info-item>
            <st-info-item label="订单号">
              {{ info.order_id }}
            </st-info-item>
            <st-info-item label="合同编号">
              {{ info.contract_number }}
            </st-info-item>
          </st-info>
        </a-col>
        <a-col :span="6">
          <st-info>
            <st-info-item label="允许转让">
              {{
                info.is_transferable | enumFilter('sold_common.is_transferable')
              }}
            </st-info-item>
            <st-info-item label="转让手续费">
              {{ info.transfer_num
              }}{{
                info.transfer_unit | enumFilter('package_course.transfer_unit')
              }}
            </st-info-item>
            <st-info-item label="当前状态">
              {{ info.course_status | enumFilter('sold_common.course_status') }}
            </st-info-item>
            <st-info-item label="订单状态">
              {{ info.order_status | enumFilter('sold_common.order_status') }}
            </st-info-item>
          </st-info>
        </a-col>
        <a-col :span="24">
          <st-info>
            <st-info-item label="备注" class="mg-b0">
              {{ info.description || '无' }}
            </st-info-item>
          </st-info>
        </a-col>
      </a-row>
    </st-panel>
    <st-panel app class="mg-t12" :tabs="authTabs">
      <router-view></router-view>
    </st-panel>
  </st-panel-layout>
</template>
<script>
import { InfoService } from './info.service'
import moment from 'moment'
import SoldCourseCoach from '@/views/biz-modals/sold/course/coach'
import SoldCourseFreeze from '@/views/biz-modals/sold/course/freeze'
import SoldCourseRefund from '@/views/biz-modals/sold/course/refund'
import SoldCourseSurplusPersonal from '@/views/biz-modals/sold/course/surplus-personal'
import SoldCourseTransfer from '@/views/biz-modals/sold/course/transfer'
import SoldCourseActivated from '@/views/biz-modals/sold/course/activated'
import SoldCourseLease from '@/views/biz-modals/sold/course/lease'

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
    SoldCourseTransfer,
    SoldCourseActivated,
    SoldCourseLease
  },
  serviceInject() {
    return {
      infoService: InfoService
    }
  },
  rxState() {
    return {
      info: this.infoService.info$,
      pageAuthTabs: this.infoService.pageAuthTabs$,
      auth: this.infoService.auth$
    }
  },
  computed: {
    showMore() {
      return (
        this.auth['shop:sold:sold_personal_course|course_num'] ||
        this.auth['shop:sold:sold_personal_course|transfer'] ||
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
          courseData: this.info
        },
        on: {
          success: () => {
            this.$router.reload()
          }
        }
      })
    },
    // 跳转合同
    toContract() {
      let record = this.info
      let url = `${window.location.origin}/common/contract-preview?id=${
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
          id: this.info.id,
          courseName: this.info.course_name,
          courseNum: this.info.remain_course_num,
          courseEndTime: moment(this.info.end_time * 1000),
          time: `${moment(this.info.buy_time * 1000).format(
            'YYYY-MM-DD HH:mm'
          )} 至 ${moment(this.info.end_time * 1000).format('YYYY-MM-DD HH:mm')}`
        },
        on: {
          success: () => {
            this.$router.reload()
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
              this.$router.reload()
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
          id: this.info.id
        },
        on: {
          success: () => {
            this.$router.reload()
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
          id: this.info.id
        },
        on: {
          success: () => {
            this.$router.reload()
          }
        }
      })
    },
    // 修改教练
    onEditCoach() {
      this.$modalRouter.push({
        name: 'sold-course-coach',
        props: {
          record: this.info
        },
        on: {
          success: () => {
            this.$router.reload()
          }
        }
      })
    },
    // 重新激活
    onActivated() {
      this.$modalRouter.push({
        name: 'sold-course-activated',
        props: {
          type: 'personal',
          id: this.info.id
        },
        on: {
          success: () => {
            this.$router.reload()
          }
        }
      })
    },
    // 延长有效期
    onLease(record) {
      this.$modalRouter.push({
        name: 'sold-course-lease',
        props: {
          type: 'personal',
          id: this.info.id
        },
        on: {
          success: () => {
            this.$router.reload()
          }
        }
      })
    }
  }
}
</script>
