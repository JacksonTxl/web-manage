<template>
  <st-modal
    class="modal-reserved"
    title="预约详情"
    @ok="save"
    :footer="null"
    width="848px"
    v-model="show"
  >
    <a-row :gutter="24" class="modal-reserved-info">
      <a-col :lg="8">
        <st-info>
          <st-info-item label="上课教练">
            {{ reserveInfo.coach_name }}
          </st-info-item>

          <st-info-item label="上课时间">
            {{ reserveInfo.start_time }}
          </st-info-item>
          <st-info-item label="课时费">
            {{ reserveInfo.course_fee }}
          </st-info-item>
        </st-info>
      </a-col>
      <a-col :lg="8">
        <st-info>
          <st-info-item label="课程名称">
            {{ reserveInfo.course_name }}
          </st-info-item>
          <st-info-item label="最大人数">
            {{ reserveInfo.limit_num }}
          </st-info-item>
        </st-info>
      </a-col>
      <a-col :lg="8">
        <st-info>
          <st-info-item label="上课日期">
            {{ reserveInfo.start_date }}
          </st-info-item>
          <st-info-item label="预约人数">
            {{ reserveInfo.reserve.length }}
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
          <tr>
            <td class="st-form-table__add">
              <a-select
                slot="member"
                showSearch
                placeholder="搜索会员名"
                style="width: 120px"
                :defaultActiveFirstOption="false"
                :showArrow="false"
                :filterOption="false"
                @search="onSearch"
                @change="onChange"
                :notFoundContent="null"
              >
                <a-select-option
                  v-for="member in memberOptions"
                  :key="member.member_id"
                >
                  {{ member.member_name }}
                </a-select-option>
              </a-select>
            </td>
            <td>
              <a-select
                slot="consume_type"
                placeholder="选择消费方式"
                style="width: 120px"
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
            <td>未签到</td>
            <td>
              <a href="javascript:;" @click="addReserve">添加预约</a>
            </td>
          </tr>
          <tr v-for="(item, index) in reserveList" :key="index">
            <td>{{ item.member }}</td>
            <td>{{ item.consume_name }}</td>
            <td>{{ item.is_checkin_name }}</td>
            <td>
              <div>
                <a
                  class="mg-r8"
                  href="javascript:;"
                  @click="cancelReserve(item.id)"
                  v-if="
                    item.auth[
                      'shop:reserve:personal_team_course_reserve|checkin'
                    ]
                  "
                >
                  取消预约
                </a>
                <a
                  href="javascript:;"
                  @click="check(item.id)"
                  v-if="
                    item.auth['shop:reserve:personal_team_course_reserve|del']
                  "
                >
                  签到消费
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
          infoAuth &&
            infoAuth['shop:schedule:personal_team_course_schedule|del']
        "
        @confirm="cancelSchedule"
        okText="确认"
        cancelText="取消"
      >
        <div slot="title">
          是否取消课程？
          <div class="color-danger">将发送消息通知已报名用户并发起自动退款</div>
        </div>
        <st-button>取消课程</st-button>
      </a-popconfirm>
      <st-button
        v-if="
          infoAuth &&
            infoAuth['shop:schedule:personal_team_course_schedule|edit']
        "
        class="mg-l8"
        type="primary"
        @click="updateSchedule"
      >
        修改课程
      </st-button>
    </div>
  </st-modal>
</template>

<script>
import { switchMap } from 'rxjs/operators'
import { MessageService } from '@/services/message.service'
import { PersonalTeamScheduleCommonService as CommonService } from '@/views/pages/shop/product/course/schedule/personal-team/service#/common.service'
import { PersonalTeamScheduleReserveService as ReserveService } from '@/views/pages/shop/product/course/schedule/personal-team/service#/reserve.service'
import { PersonalTeamScheduleScheduleService as ScheduleService } from '@/views/pages/shop/product/course/schedule/personal-team/service#/schedule.service'
import { RouteService } from '@/services/route.service'
import SchedulePersonalTeamEdit from '@/views/biz-modals/schedule/personal-team/edit'
import { columns } from './reserve-info.config'
export default {
  name: 'ReserveInfo',
  modals: {
    SchedulePersonalTeamEdit
  },
  serviceInject() {
    return {
      commonService: CommonService,
      reserveService: ReserveService,
      scheduleService: ScheduleService,
      routeService: RouteService,
      messageService: MessageService
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
      query: this.routeService.query$,
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
    onSearch(value) {
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
    check(id) {
      const params = {
        id,
        checkin_method: 4
      }
      this.reserveService.check(params).subscribe(this.onCheckSuccess)
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
    cancelSchedule() {
      this.scheduleService.del(this.id).subscribe(this.onDelScheduleScuccess)
    },
    updateSchedule() {
      this.show = false
      this.$modalRouter.push({
        name: 'schedule-personal-team-edit',
        props: {
          info: this.reserveInfo
        },
        on: {
          ok: () => {
            this.$router.push({ query: this.query, force: true })
          }
        }
      })
    },
    getReserveInfo() {
      this.reserveService.getInfo(this.id).subscribe()
    },
    onAddReserveSuccess() {
      this.getReserveInfo()
    },
    onCancelReserveSuccess() {
      this.getReserveInfo()
    },
    onCheckSuccess() {
      this.getReserveInfo()
    },
    onDelScheduleScuccess() {
      this.$router.push({ query: this.query, force: true })
      this.show = false
    }
  }
}
</script>
