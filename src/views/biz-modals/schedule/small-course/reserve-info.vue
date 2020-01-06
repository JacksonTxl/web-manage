<template>
  <st-modal
    wrapClassName="modal-reserved-info"
    title="预约详情"
    @ok="save"
    :footer="null"
    v-model="show"
    width="710px"
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
              <a @click="addReserve" v-if="auth.add">
                添加预约
              </a>
            </td>
          </tr>
          <tr v-for="(item, index) in reserveList" :key="index">
            <td>{{ item.member_name }}</td>
            <td>{{ item.course_name }}</td>
            <td>
              {{
                item.reserve_status | enumFilter('small_course.reserve_status')
              }}
            </td>
            <td>
              <div
                v-if="
                  reserveInfo.small_course_type === 1 &&
                    item.reserve_status === 1
                "
              >
                <a
                  href="javascript:;"
                  @click="check(item.reserve_id)"
                  v-if="
                    item.auth['shop:reserve:small_class_course_reserve|checkin']
                  "
                >
                  签到
                </a>
                <a-divider type="vertical"></a-divider>
                <a
                  @click="leave(item.reserve_id)"
                  v-if="
                    item.auth['shop:reserve:small_class_course_reserve|leave']
                  "
                >
                  请假
                </a>
              </div>
              <div
                v-if="
                  reserveInfo.small_course_type === 2 &&
                    item.reserve_status === 1
                "
              >
                <a
                  href="javascript:;"
                  @click="check(item.reserve_id)"
                  v-if="
                    item.auth['shop:reserve:small_class_course_reserve|checkin']
                  "
                >
                  签到
                </a>
                <a-divider type="vertical"></a-divider>
                <a
                  @click="del(item.reserve_id)"
                  v-if="
                    item.auth['shop:reserve:small_class_course_reserve|del']
                  "
                >
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
                <a
                  @click="checkSign(item.reserve_id)"
                  v-if="
                    item.auth[
                      'shop:reserve:small_class_course_reserve|supplement_checkin'
                    ]
                  "
                >
                  补签到
                </a>
                <a-divider type="vertical"></a-divider>
                <a
                  @click="remedialCourse(item.reserve_id, reserveInfo.id)"
                  v-if="
                    item.auth[
                      'shop:reserve:small_class_course_reserve|supplement'
                    ]
                  "
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
                <a
                  @click="message(item.reserve_id)"
                  v-if="
                    item.auth[
                      'shop:reserve:small_class_course_reserve|get_supplement'
                    ]
                  "
                >
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
                  v-if="
                    item.auth[
                      'shop:reserve:small_class_course_reserve|supplement'
                    ]
                  "
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
                <a
                  href="javascript:;"
                  @click="message(item.reserve_id)"
                  v-if="
                    item.auth[
                      'shop:reserve:small_class_course_reserve|get_supplement'
                    ]
                  "
                >
                  查看补课
                </a>
              </div>
            </td>
          </tr>
        </tbody>
      </st-form-table>
    </st-container>
    <div class="mg-t24 ta-r">
      <a-popconfirm
        v-if="
          infoAuth && infoAuth['shop:schedule:small_class_course_schedule|del']
        "
        @confirm="cancelSchedule"
        okText="确认"
        cancelText="取消"
      >
        <div slot="title">
          是否取消课程？
          <div class="color-danger">将发送消息通知已报名用户</div>
        </div>
        <st-button>取消课程</st-button>
      </a-popconfirm>
      <st-button
        class="mg-l8"
        type="primary"
        @click="updateSchedule"
        v-if="
          infoAuth && infoAuth['shop:schedule:small_class_course_schedule|edit']
        "
      >
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
import ScheduleSmallCourseRemedialInfo from '@/views/biz-modals/schedule/small-course/remedial-info'
import { RemedialCourseInfoService } from './remedial-info.service'
import { columns } from './reserve-info.config'
export default {
  name: 'ReserveInfo',
  modals: {
    ScheduleSmallCourseReservedCourse,
    ScheduleSmallCourseRemedialCourse,
    ScheduleSmallCourseRemedialInfo
  },
  serviceInject() {
    return {
      commonService: CommonService,
      reserveService: ReserveService,
      scheduleService: ScheduleService,
      remedialInfoService: RemedialCourseInfoService
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
      reserveStatusOptions: this.remedialInfoService.reserveStatusOptions$,
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
      dataSource: [],
      keyword: '',
      show: false,
      info: {},
      isAdd: true
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
    console.log(this.reserveList)
    console.log(this.reserveInfo)
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
          member: value
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
    // 添加预约
    addReserve() {
      const params = {
        schedule_id: this.id,
        member_id: this.memberId,
        consume_type: this.consumeType,
        consume_id: this.consumeId
      }
      this.reserveService.add(params).subscribe(res => {
        this.onAddReserveSuccess()
      })
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
      this.scheduleService
        .cancelCustom(this.id)
        .subscribe(this.onDelScheduleScuccess)
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
    remedialCourse(reserve_id) {
      this.reserveService.courseInfo(reserve_id).subscribe(res => {
        this.$modalRouter.push({
          name: 'schedule-small-course-remedial-course',
          props: {
            info: res.info,
            id: res.info.schedule_id
          },
          on: {
            ok: () => {
              this.$router.reload()
            }
          }
        })
      })
      this.show = false
    },
    // 查看补课
    message(id) {
      this.reserveService.message(id).subscribe(res => {
        console.log(res)
        this.$modalRouter.push({
          name: 'schedule-small-course-remedial-info',
          props: {
            info: res.info
          }
        })
        this.show = false
      })
    },
    // 取消预约
    del(id) {
      this.reserveService.del(id).subscribe(this.onDelScheduleScuccess)
    },
    // 请假
    leave(id) {
      this.reserveService.leave(id).subscribe(this.getReserveInfo)
    },
    getReserveInfo() {
      console.log('重置搜索')
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
      this.$router.reload()
      this.show = false
    }
  }
}
</script>
