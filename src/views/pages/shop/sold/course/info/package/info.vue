<template>
  <section :class="basic()">
    <st-panel title="课程包详情">
      <div slot="actions">
        <st-button
          v-if="auth['shop:sold:sold_package_course|export_contract']"
          class="mgr-8"
          type="primary"
          @click="toContract"
        >
          查看合同
        </st-button>
        <st-button
          v-if="auth['shop:sold:sold_package_course|frozen']"
          class="mgr-8"
          @click="onFreeze"
        >
          冻结
        </st-button>
        <st-button
          v-if="auth['shop:sold:sold_package_course|unfrozen']"
          class="mgr-8"
          @click="onUnfreeze"
        >
          取消冻结
        </st-button>
        <a-dropdown>
          <a-menu slot="overlay">
            <a-menu-item
              v-if="auth['shop:sold:sold_package_course|course_num']"
              @click="onSurplus"
            >
              修改剩余课时
            </a-menu-item>
            <a-menu-item
              v-if="auth['shop:sold:sold_package_course|transfer']"
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
          <a-button>
            更多操作
            <a-icon type="down" />
          </a-button>
        </a-dropdown>
      </div>
      <a-row :gutter="24">
        <a-col :span="9">
          <st-info>
            <st-info-item label="课程名称">
              {{ packageInfo.course_name }}
            </st-info-item>
            <st-info-item label="类型">{{ packageInfo.type }}</st-info-item>
            <st-info-item label="剩余课时">
              {{ packageInfo.personal_course_remain }}节私教课,{{
                packageInfo.team_course_remain
              }}节团体课
            </st-info-item>
            <st-info-item label="有效期">
              {{
                moment(packageInfo.course_buy_time * 1000).format(
                  'YYYY-MM-DD HH:mm'
                )
              }}
              至
              {{
                moment(packageInfo.course_end_time * 1000).format(
                  'YYYY-MM-DD HH:mm'
                )
              }}
            </st-info-item>
          </st-info>
        </a-col>
        <a-col :span="9">
          <st-info>
            <st-info-item label="所属会员">
              {{ packageInfo.member_name }}
            </st-info-item>
            <st-info-item label="手机号">{{ packageInfo.mobile }}</st-info-item>
            <st-info-item label="订单号">
              {{ packageInfo.order_id }}
            </st-info-item>
            <st-info-item label="订单状态">
              {{ packageInfo.order_status | enumFilter('sold.order_status') }}
            </st-info-item>
          </st-info>
        </a-col>
        <a-col :span="6">
          <st-info>
            <st-info-item label="允许转让">
              {{
                packageInfo.is_transferable | enumFilter('sold.is_transferable')
              }}
            </st-info-item>
            <st-info-item
              label="转让手续费"
              v-if="packageInfo.is_transferable !== 0"
            >
              {{ packageInfo.transfer_num
              }}{{
                packageInfo.transfer_unit
                  | enumFilter('package_course.transfer_unit')
              }}
            </st-info-item>
            <st-info-item label="当前状态">
              {{ packageInfo.course_status | enumFilter('sold.course_status') }}
            </st-info-item>
            <st-info-item label="上课范围">
              <a-popover :title="packageInfo.course_range.range_name">
                <template slot="content">
                  <st-table
                    v-if="rangeType === 1"
                    :columns="courseColumns"
                    :dataSource="courseTabData"
                    :pagination="false"
                    :class="basic('popover-content')"
                  ></st-table>
                  <st-table
                    v-if="rangeType === 2"
                    :columns="courseColumns"
                    :dataSource="courseTabData"
                    :pagination="false"
                    :class="basic('popover-content')"
                  >
                    <st-table
                      slot="expandedRowRender"
                      slot-scope="text, index"
                      :columns="
                        index === 1 ? innerColumnsPersonal : innerColumnsTeam
                      "
                      :dataSource="
                        index === 1 ? innerDataPersonal : innerDataTeam
                      "
                      :pagination="false"
                    ></st-table>
                  </st-table>
                  <st-table
                    v-if="rangeType === 3"
                    :columns="courseColumns"
                    :dataSource="courseTabData"
                    :pagination="false"
                    :class="basic('popover-content')"
                  >
                    <st-table
                      slot="expandedRowRender"
                      slot-scope="text, index"
                      :columns="innerColumnsFix"
                      :dataSource="
                        index === 1 ? innerDataFixPersonal : innerDataFixTeam
                      "
                      :pagination="false"
                    ></st-table>
                  </st-table>
                </template>
                <a type="primary">{{ packageInfo.course_range.range_name }}</a>
              </a-popover>
            </st-info-item>
          </st-info>
        </a-col>
        <a-col :span="24">
          <st-info>
            <st-info-item label="备注" class="mg-b0">
              {{ packageInfo.description || '无' }}
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
            name: 'shop-sold-course-info-package-info-consumption-record',
            query: { id: infoService.id }
          }
        },
        {
          label: '操作日志',
          route: {
            name: 'shop-sold-course-info-package-info-operation-record',
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
  computed: {
    rangeType() {
      return this.packageInfo.course_range
        ? this.packageInfo.course_range.range_type
        : 1
    },
    courseColumns() {
      const list = [
        { title: '课程类型', dataIndex: 'course_name', key: 'course_name' },
        { title: '节数', dataIndex: 'course_num', key: 'course_num' },
        { title: '课时费', dataIndex: 'course_price', key: 'course_price' },
        { title: '小计', dataIndex: 'pay_amount', key: 'pay_amount' }
      ]
      if (this.rangeType === 3) {
        list.splice(2, 1)
      }
      return list
    },
    courseTabData() {
      const data = []
      const team = this.packageInfo.course_range
        ? this.packageInfo.course_range.team
        : {}
      const personal = this.packageInfo.course_range
        ? this.packageInfo.course_range.personal
        : {}
      data.push({
        key: 0,
        course_name: team.course_name,
        course_num: team.course_num,
        course_price: team.course_price,
        pay_amount: team.pay_amount
      })
      data.push({
        key: 1,
        course_name: personal.course_name,
        course_num: personal.course_num,
        course_price: personal.course_price,
        pay_amount: personal.pay_amount
      })
      return data
    },
    // 范围内课程团体课
    innerColumnsTeam() {
      const list = [
        { title: '课程名称', dataIndex: 'course_name', key: 'course_name' }
      ]
      return list
    },
    innerDataTeam() {
      const innerData = []
      for (
        let i = 0;
        i < this.packageInfo.course_range.team.courses.length;
        i++
      ) {
        innerData.push({
          key: i,
          course_name: this.packageInfo.course_range.team.courses[i]
        })
      }
      return innerData
    },
    // 范围内课程私教课
    innerColumnsPersonal() {
      const list = [
        { title: '课程名称', dataIndex: 'course_name', key: 'course_name' },
        { title: '教练等级', dataIndex: 'levels', key: 'levels' }
      ]
      return list
    },
    innerDataPersonal() {
      const innerData = []
      for (
        let i = 0;
        i < this.packageInfo.course_range.personal.courses.length;
        i++
      ) {
        innerData.push({
          key: i,
          course_name: this.packageInfo.course_range.personal.courses[i]
            .course_name,
          levels: this.packageInfo.course_range.personal.courses[i].levels.join(
            ','
          )
        })
      }
      return innerData
    },
    // 固定课程
    innerColumnsFix() {
      const list = [
        { title: '课程名称', dataIndex: 'course_name', key: 'course_name' },
        { title: '节数', dataIndex: 'course_num_init', key: 'course_num_init' },
        { title: '课时费', dataIndex: 'course_price', key: 'course_price' },
        { title: '总价', dataIndex: 'course_amount', key: 'course_amount' }
      ]
      return list
    },
    innerDataFixPersonal() {
      const innerData = []
      for (
        let i = 0;
        i < this.packageInfo.course_range.personal.courses.length;
        i++
      ) {
        innerData.push({
          key: i,
          course_name: this.packageInfo.course_range.personal.courses[i]
            .course_name,
          course_num_init: this.packageInfo.course_range.personal.courses[i]
            .course_num_init,
          course_price: this.packageInfo.course_range.personal.courses[i]
            .course_price,
          course_amount: this.packageInfo.course_range.personal.courses[i]
            .course_amount,
          levels: this.packageInfo.course_range.personal.courses[i].levels.join(
            ','
          )
        })
      }
      return innerData
    },
    innerDataFixTeam() {
      const innerData = []
      for (
        let i = 0;
        i < this.packageInfo.course_range.team.courses.length;
        i++
      ) {
        innerData.push({
          key: i,
          course_name: this.packageInfo.course_range.team.courses[i]
            .course_name,
          course_num_init: this.packageInfo.course_range.team.courses[i]
            .course_num_init,
          course_price: this.packageInfo.course_range.team.courses[i]
            .course_price,
          course_amount: this.packageInfo.course_range.team.courses[i]
            .course_amount
        })
      }
      return innerData
    }
  },
  methods: {
    moment,
    // 修改剩余课时
    onSurplus() {
      let data = {
        id: this.infoService.id,
        courseName: this.packageInfo.course_name,
        time: `${moment(this.packageInfo.course_buy_time * 1000).format(
          'YYYY-MM-DD HH:mm'
        )} 至 ${moment(this.packageInfo.course_end_time * 1000).format(
          'YYYY-MM-DD HH:mm'
        )}`
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
    // 跳转合同
    toContract() {
      let record = this.packageInfo
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
          type: 'package',
          id: this.infoService.id,
          courseName: this.packageInfo.course_name,
          courseNum: this.packageInfo.remain_course_num,
          courseEndTime: moment(this.packageInfo.course_end_time * 1000),
          time: `${moment(this.packageInfo.course_buy_time * 1000).format(
            'YYYY-MM-DD HH:mm'
          )} 至 ${moment(this.packageInfo.course_end_time * 1000).format(
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
    onUnfreeze(record) {
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
