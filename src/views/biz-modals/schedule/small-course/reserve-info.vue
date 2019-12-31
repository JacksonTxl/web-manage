<template>
  <st-modal
    wrapClassName="modal-reserved-info"
    title="预约详情"
    @ok="save"
    :footer="null"
    v-model="show"
    width="700px"
  >
    <a-row :gutter="24">
      <a-col :lg="16">
        <st-info>
          <st-info-item label="课程名称">
            {{ reserveInfo.course_name }}
          </st-info-item>
        </st-info>
      </a-col>
      <a-col :lg="8">
        <st-info>
          <st-info-item :label="`上课${$c('coach')}`">
            {{ reserveInfo.coach_name }}
          </st-info-item>
        </st-info>
      </a-col>
    </a-row>
    <a-row>
      <a-col :lg="8">
        <st-info>
          <st-info-item label="上课日期">
            {{ reserveInfo.start_date }}
          </st-info-item>
        </st-info>
      </a-col>
      <a-col :lg="8">
        <st-info>
          <st-info-item label="上课时间">
            {{ reserveInfo.start_time }}
          </st-info-item>
        </st-info>
      </a-col>
      <a-col :lg="8">
        <st-info>
          <st-info-item label="预约人数">
            {{ reserveInfo.reserved_num }}
          </st-info-item>
        </st-info>
      </a-col>
    </a-row>
    <a-row>
      <a-col :lg="24">
        <st-info>
          <st-info-item label="最大人数">
            {{ reserveInfo.reserve_max }}
          </st-info-item>
        </st-info>
      </a-col>
    </a-row>
    <st-container>
      <st-form-table hoverable>
        <thead>
          <tr>
            <th v-for="col in columns" :key="col.dataIndex">{{ col.title }}</th>
          </tr>
        </thead>
        <tbody v-if="!loading.add">
          <tr v-if="reserveInfo.small_course_type === 2">
            <td class="st-form-table__add">
              <a-select
                slot="member"
                showSearch
                placeholder="搜索会员名"
                style="width: 120px"
                :defaultActiveFirstOption="false"
                :dropdownMatchSelectWidth="false"
                :showArrow="false"
                :filterOption="false"
                @search="onSearch"
                @change="onChange"
                :notFoundContent="null"
              >
                <a-select-option
                  v-for="member in memberOptions"
                  :key="member.id"
                >
                  <div class="st-form-table__add-option">
                    <span
                      class="item-name"
                      v-html="keywordFilter(member.member_name)"
                    ></span>
                    <span
                      class="item-phone"
                      v-html="keywordFilter(member.mobile)"
                    ></span>
                  </div>
                </a-select-option>
              </a-select>
            </td>
            <td>
              <a-select
                slot="consume_type"
                placeholder="选择消费方式"
                style="width: 280px"
                :dropdownMatchSelectWidth="false"
                @change="onChangeConsumeType"
              >
                <a-select-opt-group
                  v-for="consumeType in consumeOptions"
                  :key="consumeType.id"
                >
                  <span slot="label">
                    <a-icon type="snippets" />
                    {{ consumeType.name }}
                  </span>
                  <a-select-option
                    v-for="consume in consumeType.children"
                    :value="JSON.stringify(consume)"
                    :key="consume.id"
                  >
                    {{ consume.name }}
                  </a-select-option>
                </a-select-opt-group>
              </a-select>
            </td>
            <td>--</td>
            <td>
              <a href="javascript:;" @click="addReserve">添加预约</a>
            </td>
          </tr>
          <tr v-for="(item, index) in reserveList" :key="index">
            <td>{{ item.member_name }}</td>
            <td>{{ item.course_name }}</td>
            <td v-if="item.reserve_status === 1">未签到</td>
            <td v-if="item.reserve_status === 2">已签到</td>
            <td v-if="item.reserve_status === 3">旷课</td>
            <td v-if="item.reserve_status === 4">请假已补课</td>
            <td v-if="item.reserve_status === 5">请假未补课</td>
            <td>
              <div
                v-if="
                  reserveInfo.small_course_type === 1 &&
                    item.reserve_status === 1
                "
              >
                <a href="javascript:;" @click="check(item.reserve_id)">
                  签到
                </a>
                <a-divider type="vertical"></a-divider>
                <a href="javascript:;" @click="leave(item.reserve_id)">
                  请假
                </a>
              </div>
              <div
                v-if="
                  reserveInfo.small_course_type === 2 &&
                    item.reserve_status === 1
                "
              >
                <a href="javascript:;" @click="check(item.reserve_id)">
                  签到
                </a>
                <a-divider type="vertical"></a-divider>
                <a href="javascript:;" @click="del(item.reserve_id)">
                  取消预约
                </a>
              </div>
              <div
                v-if="
                  (reserveInfo.small_course_type === 1 &&
                    item.reserve_status === 2) ||
                    (reserveInfo.small_course_type === 2 &&
                      item.reserve_status === 2)
                "
              >
                --
              </div>
              <div
                v-if="
                  (reserveInfo.small_course_type === 1 &&
                    item.reserve_status === 3) ||
                    (reserveInfo.small_course_type === 2 &&
                      item.reserve_status === 3)
                "
              >
                <a href="javascript:;" @click="checkSign(item.reserve_id)">
                  补签到
                </a>
                <a-divider type="vertical"></a-divider>
                <a
                  href="javascript:;"
                  @click="remedialCourse(item.reserve_id, reserveInfo.id)"
                >
                  补课
                </a>
              </div>
              <div
                v-if="
                  reserveInfo.small_course_type === 1 &&
                    item.reserve_status === 4
                "
              >
                <a href="javascript:;" @click="message(item.reserve_id)">
                  查看补课
                </a>
              </div>
              <div
                v-if="
                  reserveInfo.small_course_type === 1 &&
                    item.reserve_status === 5
                "
              >
                <a
                  href="javascript:;"
                  @click="remedialCourse(item.reserve_id, reserveInfo.id)"
                >
                  补课
                </a>
              </div>
              <div
                v-if="
                  reserveInfo.small_course_type === 2 &&
                    item.reserve_status === 6
                "
              >
                <a href="javascript:;" @click="message(item.reserve_id)">
                  查看补课
                </a>
              </div>
              <div
                v-if="
                  reserveInfo.small_course_type === 1 &&
                    item.reserve_status === 5
                "
              >
                <a
                  href="javascript:;"
                  @click="remedialCourse(item.reserve_id, reserveInfo.id)"
                >
                  补课
                </a>
              </div>
            </td>
          </tr>
        </tbody>
      </st-form-table>
    </st-container>
    <!-- v-if="
          infoAuth &&
            infoAuth['shop:schedule:personal_team_course_schedule|del']
        "        v-if="
          infoAuth &&
            infoAuth['shop:schedule:personal_team_course_schedule|edit']
        " -->
    <div class="mg-t24 ta-r">
      <a-popconfirm @confirm="cancelSchedule" okText="确认" cancelText="取消">
        <div slot="title">
          是否取消课程？
          <div class="color-danger">将发送消息通知已报名用户</div>
        </div>
        <st-button>取消课程</st-button>
      </a-popconfirm>
      <st-button class="mg-l8" type="primary" @click="updateSchedule">
        修改课程
      </st-button>
    </div>
  </st-modal>
</template>

<script>
import { SmallCourseScheduleCommonService as CommonService } from '@/views/pages/shop/product/course/schedule/small-course/service#/common.service'
import { SmallCourseScheduleReserveService as ReserveService } from '@/views/pages/shop/product/course/schedule/small-course/service#/reserve.service'
import { SmallCourseScheduleService as ScheduleService } from '@/views/pages/shop/product/course/schedule/small-course/service#/schedule.service'
import ScheduleSmallCourseReservedCourse from '@/views/biz-modals/schedule/small-course/reserved-course'
import ScheduleSmallCourseRemedialCourse from '@/views/biz-modals/schedule/small-course/remedial-course'
import { columns } from './reserve-info.config'
export default {
  name: 'ReserveInfo',
  modals: {
    ScheduleSmallCourseReservedCourse,
    ScheduleSmallCourseRemedialCourse
  },
  serviceInject() {
    return {
      commonService: CommonService,
      reserveService: ReserveService,
      scheduleService: ScheduleService
    }
  },
  rxState() {
    const commonService = this.commonService
    return {
      loading: this.reserveService.loading$,
      memberOptions: commonService.memberOptions$,
      consumeOptions: commonService.consumeOptions$,
      reserveList: this.reserveService.reserveList$,
      reserveInfo: this.reserveService.reserveInfo$,
      auth: this.reserveService.auth$,
      infoAuth: this.reserveService.infoAuth$
    }
  },
  props: {
    id: Number
  },
  data() {
    return {
      memberId: '',
      consumeType: '',
      consumeId: '',
      consumeTypeId: '',
      siteNumIds: [],
      dataSource: [],
      keyword: '',
      show: false,
      info: {}
    }
  },
  computed: {
    columns,
    courseId() {
      return this.reserveInfo.course_id
    },
    scheduleId() {
      return this.reserveInfo.id
    }
  },
  created() {
    this.getReserveInfo()
  },
  methods: {
    keywordFilter(str) {
      if (!this.keyword) return str
      str = str.replace(
        new RegExp(this.keyword),
        `<span class="color-primary">${this.keyword}</span>`
      )
      return str
    },
    onSearch(value) {
      this.keyword = value
      this.commonService
        .getMemberList({
          member_name: value
        })
        .subscribe()
    },
    onChange(value) {
      this.memberId = value
      this.commonService
        .getConsumeList({
          course_id: this.courseId,
          member_id: value
        })
        .subscribe()
    },
    onChangeConsumeType(val) {
      const obj = JSON.parse(val)
      this.consumeType = obj.consume_type
      this.consumeId = obj.id
    },
    // 补签到
    checkSign(id) {
      this.reserveService.checkSign(id).subscribe(this.getReserveInfo)
    },
    addReserve() {
      const form = {
        schedule_id: this.id,
        member_id: this.memberId,
        consume_type: this.consumeType,
        consume_id: this.consumeId
      }
      this.reserveService.add(form).subscribe(this.onAddReserveSuccess)
    },
    cancelReserve(id) {
      this.reserveService.cancel(id).subscribe(this.onCancelReserveSuccess)
    },
    // 签到
    check(id) {
      this.reserveService.check(id).subscribe(this.onCheckSuccess)
    },
    edit(key) {
      const newData = [...this.data]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        target.editable = true
        this.data = newData
      }
      target.editable = true
      this.data = newData
    },
    save(key) {
      const newData = [...this.data]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        delete target.editable
        this.data = newData
        this.cacheData = newData.map(item => ({ ...item }))
      }
    },
    // 取消排期
    cancelSchedule() {
      this.scheduleService.cancel(this.id).subscribe(this.onDelScheduleScuccess)
    },
    updateSchedule() {
      this.show = false
      this.$modalRouter.push({
        name: 'schedule-small-course-reserved-course',
        props: {
          item: this.reserveInfo
        },
        on: {
          ok: () => {
            this.$router.push({ query: this.$searchQuery })
          }
        }
      })
    },
    // 补课回显
    remedialCourse(reserve_id, id) {
      this.reserveService.courseInfo(reserve_id).subscribe(res => {
        this.$modalRouter.push({
          name: 'schedule-small-course-remedial-course',
          props: {
            info: res.info,
            id: id
          },
          on: {
            ok: () => {
              this.$router.push({ query: this.$searchQuery })
            }
          }
        })
      })
      this.show = false
    },
    // 取消预约
    del(id) {
      this.reserveService.del(id).subscribe(this.onDelScheduleScuccess)
    },
    // 请假
    leave(id) {
      this.reserveService.leave(id).subscribe(this.getReserveInfo)
    },
    // 查看补课
    message(id) {
      this.reserveService.message(id).subscribe(res => {
        this.$modalRouter.push({
          name: 'schedule-small-course-remedial-info',
          props: {
            info: res.info,
            id: id
          },
          on: {
            ok: () => {
              this.$router.push({ query: this.$searchQuery })
            }
          }
        })
      })
    },
    getReserveInfo() {
      this.reserveService.getInfo(this.id).subscribe()
    },
    onAddReserveSuccess() {
      this.memberId = undefined
      this.consumeType = undefined
      this.getReserveInfo()
    },
    onCancelReserveSuccess() {
      this.getReserveInfo()
    },
    onCheckSuccess() {
      this.getReserveInfo()
    },
    onDelScheduleScuccess() {
      console.log('取消课程!')
      this.$router.push({ query: this.$searchQuery })
      this.show = false
    }
  }
}
</script>
