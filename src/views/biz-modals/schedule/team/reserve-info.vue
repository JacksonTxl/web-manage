<template>
  <st-modal
    class="modal-reserved"
    title="预约详情"
    @ok="save"
    width="878px"
    v-model="show"
  >
    <a-row :gutter="24" class="modal-reserved-info">
      <a-col :lg="8">
        <st-info>
          <st-info-item :label="`上课${$c('coach')}`">
            {{ info.coach_name }}
          </st-info-item>
          <st-info-item label="上课时间">{{ info.start_time }}</st-info-item>
          <st-info-item label="课时费">{{ info.course_fee }}元</st-info-item>
        </st-info>
      </a-col>
      <a-col :lg="8">
        <st-info>
          <st-info-item label="课程名称">{{ info.course_name }}</st-info-item>
          <st-info-item label="最大人数">{{ info.limit_num }}</st-info-item>
        </st-info>
      </a-col>
      <a-col :lg="8">
        <st-info>
          <st-info-item label="上课场地">
            {{ info.court_name }}
            <span v-if="info.court_site_name">
              • {{ info.court_site_name }}
            </span>
          </st-info-item>
          <st-info-item label="预约人数">{{ info.reserved_num }}</st-info-item>
        </st-info>
      </a-col>
    </a-row>
    <st-container class="modal-reserved-info__table">
      <st-form-table hoverable>
        <thead>
          <tr>
            <th v-for="col in columns" :key="col.dataIndex">
              {{ col.title }}
              <st-help-tooltip
                v-if="col.dataIndex == 'site_num_list'"
                id="TSGC002"
              />
            </th>
          </tr>
        </thead>
        <tbody v-if="isAdd">
          <tr>
            <td width="140px" class="mg-l0 st-form-table__add-td">
              <a-select
                slot="member"
                showSearch
                placeholder="搜索会员名"
                style="width:149px"
                :defaultActiveFirstOption="false"
                :dropdownMatchSelectWidth="false"
                :showArrow="false"
                :filterOption="false"
                @search="onSearch"
                @change="onChange"
                notFoundContent="无搜索结果"
              >
                <a-select-option
                  v-for="member in memberOptions"
                  :key="member.id"
                >
                  <div class="st-form-table__add-option">
                    <span
                      class="item-name"
                      v-html="keywordFilter(member)"
                    ></span>
                  </div>
                </a-select-option>
              </a-select>
            </td>
            <td width="240px" class="mg-l0 st-form-table__add-td">
              <a-select
                slot="consume_type"
                placeholder="请选择消费方式"
                style="width: 240px"
                v-model="showConsumeType"
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
            <td width="120px" class="mg-l0 st-form-table__add-td">
              <a-select
                slot="site_num_list"
                mode="multiple"
                placeholder="请选择座位"
                style="width: 100px"
                v-model="showSite"
                :maxTagCount="3"
                @change="onChangeSiteNumList"
              >
                <a-select-option
                  v-for="siteNum in unUsedSeatOptions"
                  :key="siteNum.id"
                >
                  {{ siteNum.name }}
                </a-select-option>
              </a-select>
            </td>
            <td width="120px">
              <span slot="current_reservation_num">
                {{ currentReservationNum }}人
              </span>
            </td>
            <td width="120px">未签到</td>
            <td width="120px">
              <a
                href="javascript:;"
                @click="onClickReserve"
                v-if="infoAuth['shop:reserve:team_course_reserve|add']"
              >
                添加预约
              </a>
            </td>
          </tr>
          <tr v-for="(item, index) in list" :key="index">
            <td>{{ item.member }}</td>
            <td>{{ item.consume_name }}</td>
            <td>{{ item.site_num_list | siteNumListFilter }}</td>
            <td>{{ item.current_reservation_num }}人</td>
            <td>{{ item.is_checkin_name }}</td>
            <td>
              <div>
                <a
                  class="mg-r8"
                  href="javascript:;"
                  @click="onClickCancel(item.reserve_id)"
                  v-if="item.auth['shop:reserve:team_course_reserve|del']"
                >
                  取消预约
                </a>
                <a
                  href="javascript:;"
                  v-if="item.auth['shop:reserve:team_course_reserve|checkin']"
                  @click="onClickCheckIn(item.reserve_id)"
                >
                  签到消费
                </a>
              </div>
            </td>
          </tr>
        </tbody>
      </st-form-table>
    </st-container>
    <div slot="footer" class="ta-r">
      <st-button
        @click="onClickCancelCourse"
        v-if="infoAuth['shop:schedule:team_course_schedule|del']"
        class="mg-r8"
      >
        取消课程
      </st-button>
      <st-button
        @click="onClickEditCourse"
        v-if="infoAuth['shop:schedule:team_course_schedule|edit']"
        type="primary"
      >
        修改课程
      </st-button>
    </div>
  </st-modal>
</template>

<script>
import { switchMap } from 'rxjs/operators'
import { MessageService } from '@/services/message.service'
import { TeamScheduleCommonService } from '@/views/pages/shop/product/course/schedule/team/service#/common.service'
import { TeamScheduleReserveService } from '@/views/pages/shop/product/course/schedule/team/service#/reserve.service'
import ScheduleTeamCancelCourse from '@/views/biz-modals/schedule/team/cancel-course'
import ScheduleTeamEditCourse from '@/views/biz-modals/schedule/team/edit-course'

export default {
  name: 'ReserveInfo',
  modals: {
    ScheduleTeamCancelCourse,
    ScheduleTeamEditCourse
  },
  serviceInject() {
    return {
      teamScheduleCommonService: TeamScheduleCommonService,
      teamScheduleReserveService: TeamScheduleReserveService,
      messageService: MessageService
    }
  },
  rxState() {
    const common = this.teamScheduleCommonService
    return {
      infoAuth: this.teamScheduleReserveService.infoAuth$,
      memberOptions: common.memberOptions$,
      consumeOptions: common.consumeOptions$,
      unUsedSeatOptions: common.unUsedSeatOptions$
    }
  },
  props: {
    id: Number
  },
  filters: {
    siteNumListFilter(val) {
      return val
        .split(',')
        .map(item => {
          if (item === '0') {
            return '无座位'
          }
          return item
        })
        .join(',')
    }
  },
  data() {
    return {
      isAdd: true,
      showConsumeType: '',
      memberId: '',
      showSite: [],
      consumeType: '',
      keyword: '',
      consumeId: '',
      consumeTypeId: '',
      siteNumIds: [],
      currentReservationNumOptions: [
        { id: 1, name: '1人' },
        { id: 2, name: '2人' },
        { id: 3, name: '3人' }
      ],
      currentReservationNum: 0,
      columns: [
        {
          title: '会员姓名',
          dataIndex: 'member',
          width: '20%',
          scopedSlots: { customRender: 'member' }
        },
        {
          title: '消费方式',
          dataIndex: 'consume_type',
          scopedSlots: { customRender: 'consume_type' }
        },
        {
          title: '座位号',
          dataIndex: 'site_num_list',
          scopedSlots: { customRender: 'site_num_list' },
          width: '20%'
        },
        {
          title: '预约人数',
          dataIndex: 'current_reservation_num',
          scopedSlots: { customRender: 'current_reservation_num' }
        },
        {
          title: '签到状态',
          dataIndex: 'is_checkin',
          width: '20%'
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      dataSource: [],
      show: false,
      info: {},
      list: []
    }
  },
  computed: {
    courseId() {
      return this.info.course_id
    },
    scheduleId() {
      return this.info.id
    },
    courtSiteId() {
      return this.info.court_site_id
    }
  },
  watch: {
    showSite(n, o) {
      if (n.length > 3) {
        this.showSite = o
      }
    }
  },
  methods: {
    keywordFilter(item) {
      let str
      if (item.is_minors === 1) {
        str = `${item.member_name}(未成年) ${item.parent_mobile}(${
          item.parent_user_role
        })`.replace(
          new RegExp(this.keyword),
          `<span class="color-primary">${this.keyword}</span>`
        )
      } else {
        str = `${item.member_name} ${item.mobile}`.replace(
          new RegExp(this.keyword),
          `<span class="color-primary">${this.keyword}</span>`
        )
      }
      return str
    },
    onClickCancelCourse() {
      this.$modalRouter.push({
        name: 'schedule-team-cancel-course',
        props: { id: this.info.id }
      })
      this.show = false
    },
    onClickEditCourse() {
      this.$modalRouter.push({
        name: 'schedule-team-edit-course',
        props: { id: this.info.id },
        on: {
          ok: () => {
            this.$router.reload()
          }
        }
      })
      this.show = false
    },
    onSearch(value) {
      this.keyword = value
      this.teamScheduleCommonService
        .getMemberList({ member: value })
        .subscribe()
    },
    onClickCancel(id) {
      this.teamScheduleReserveService.del(id).subscribe(() => {
        this.getReserve()
      })
    },
    onClickCheckIn(id) {
      this.teamScheduleReserveService
        .check({ id, checkin_method: 2 })
        .subscribe(() => {
          this.getReserve()
        })
    },
    onChange(value) {
      this.memberId = value
      this.showConsumeType = ''
      this.teamScheduleCommonService
        .getConsumeList({ course_id: this.courseId, member_id: value })
        .subscribe()
    },
    onChangeConsumeType(val) {
      const obj = JSON.parse(val)
      this.consumeType = obj.consume_type
      this.consumeId = obj.id
    },
    onChangeSiteNumList(val) {
      let tempArr = []
      if (val.length > 3) {
        this.messageService.error({
          content: `最多预约三个座位`
        })
        return
      }
      const unSeatArr = this.unUsedSeatOptions
        .map(item => (item.name === '无座位' ? item.id : -1))
        .filter(item => item !== -1)
      this.siteNumIds = val.map(item => {
        let value
        this.unUsedSeatOptions.forEach(ele => {
          if (item === ele.id && ele.name !== '无座位') {
            value = ele.name
          }
        })
        return unSeatArr.includes(item) ? -1 : value
      })
      this.currentReservationNum = this.showSite.length
    },
    onClickReserve() {
      const form = {
        schedule_id: this.id,
        member_id: this.memberId,
        seat: this.siteNumIds,
        consume_type: this.consumeType,
        consume_id: this.consumeId
      }
      this.currentReservationNum = 0
      this.isAdd = false
      this.teamScheduleReserveService.add(form).subscribe(
        () => {
          this.isAdd = true
          this.showSite = []
          this.siteNumIds = []
          this.consumeType = ''
          this.showConsumeType = ''
          this.memberId = ''
          this.getReserve()
        },
        err => {
          console.log(err)
          this.isAdd = true
          this.showSite = []
          this.siteNumIds = []
          this.consumeType = ''
          this.showConsumeType = ''
          this.memberId = ''
        }
      )
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
    getReserve() {
      const ss = this.teamScheduleReserveService
      ss.getInfo(this.id)
        .pipe(
          switchMap(state => {
            this.info = state.info
            this.list = state.list
            return this.teamScheduleCommonService.getUnusedSeatList({
              schedule_id: state.info.id,
              court_site_id: state.info.court_site_id
            })
          })
        )
        .subscribe()
    }
  },
  mounted() {
    this.getReserve()
  }
}
</script>
