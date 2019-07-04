<template>
  <st-modal class="modal-reserved" title="预约详情" @ok="save" :footer="null" width="848px" v-model="show">
    <a-row :gutter="24" class="modal-reserved-info">
      <a-col :lg="8">
        <st-info>
          <st-info-item label="上课教练">{{info.coach_name}}</st-info-item>
          <st-info-item label="上课时间">{{info.start_time}}</st-info-item>
        </st-info>
      </a-col>
      <a-col :lg="8">
        <st-info>
          <st-info-item label="课程名称">{{info.course_name}}</st-info-item>
          <st-info-item label="最大人数">{{info.limit_num}}</st-info-item>
        </st-info>
      </a-col>
      <a-col :lg="8">
        <st-info>
          <st-info-item label="上课场地">{{info.court_name}}</st-info-item>
          <st-info-item label="预约人数">{{info.reserved_num}}</st-info-item>
        </st-info>
      </a-col>
    </a-row>
    <st-form-table hoverable>
      <thead>
        <tr>
          <th v-for="col in columns" :key="col.dataIndex">{{col.title}}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="st-form-table__add">
            <a-select
              slot="member"
              showSearch
              v-model="memberId"
              placeholder="搜索会员名"
              style="width: 120px"
              :defaultActiveFirstOption="false"
              :showArrow="false"
              :filterOption="false"
              @search="onSearch"
              @change="onChange"
              :notFoundContent="null">
              <a-select-option v-for="member in memberOptions" :key="member.id">{{member.member_name}}</a-select-option>
            </a-select>
          </td>
          <td>
            <a-select
              slot="consume_type"
              placeholder="选择消费方式"
              style="width: 120px"
              @change="onChangeConsumeType">
              <a-select-opt-group v-for="consumeType in consumeOptions" :key="consumeType.id">
                <span slot="label"><a-icon type="snippets"/>{{consumeType.name}}</span>
                <a-select-option v-for="consume in consumeType.children" :value="JSON.stringify(consume)" :key="consume.id">{{consume.name}}</a-select-option>
              </a-select-opt-group>
            </a-select>
          </td>
          <td>
            <a-select
              slot="site_num_list"
              mode="multiple"
              placeholder="选择座位"
              style="width: 120px"
              @change="onChangeSiteNumList">
              <a-select-option v-for="siteNum in unUsedSeatOptions" :key="siteNum.id">{{siteNum.name}}</a-select-option>
            </a-select>
          </td>
          <td>
            <span slot="current_reservation_num" >
              {{currentReservationNum}}人
            </span>
          </td>
          <td>未签到</td>
          <td>
            <a href="javascript:;" @click="onClickReserve">添加预约</a>
          </td>
        </tr>
        <tr v-for="(item, index) in list" :key="index">
          <td>{{item.member}}</td>
          <td>{{item.consume_name}}</td>
          <td>{{item.site_num_list | siteNumListFilter}}</td>
          <td>{{item.current_reservation_num}}人</td>
          <td>{{item.is_checkin_name}}</td>
          <td>
            <div>
              <a  class="mg-r8" href="javascript:;" @click="onClickCancel(item.reserve_id)" v-if="auth.cancel">取消预约</a>
              <a  href="javascript:;" v-if="auth.checkIn && !item.is_checkin" @click="onClickCheckIn(item.reserve_id)">签到消费</a>
            </div>
          </td>
        </tr>
      </tbody>
    </st-form-table>
  </st-modal>
</template>

<script>
import { TeamService } from '../../../pages/shop/product/course/schedule/team.service'
import { switchMap } from 'rxjs/operators'
import { MessageService } from '@/services/message.service'
import { TeamScheduleCommonService } from '../../../pages/shop/product/course/schedule/team.service#/common.service'
import { TeamScheduleReserveService } from '../../../pages/shop/product/course/schedule/team.service#/reserve.service'
export default {
  name: 'OrderInfo',
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
      auth: this.teamScheduleReserveService.auth$,
      memberOptions: common.memberOptions$,
      consumeOptions: common.consumeOptions$,
      unUsedSeatOptions: common.unUsedSeatOptions$
    }
  },
  props: {
    id: String
  },
  filters: {
    siteNumListFilter(val) {
      console.log(val)
      return val.split(',').map(item => {
        if (item === '0') {
          return '无座位'
        }
        return item
      }).join(',')
    }
  },
  data() {
    return {
      memberId: '',
      consumeType: '',
      consumeId: '',
      consumeTypeId: '',
      siteNumIds: [],
      currentReservationNumOptions: [{ id: 1, name: '1人' }, { id: 2, name: '2人' }, { id: 3, name: '3人' }],
      currentReservationNum: 0,
      columns: [{
        title: '会员姓名',
        dataIndex: 'member',
        width: '20%',
        scopedSlots: { customRender: 'member' }
      }, {
        title: '消费方式',
        dataIndex: 'consume_type',
        scopedSlots: { customRender: 'consume_type' }
      }, {
        title: '座位号',
        dataIndex: 'site_num_list',
        scopedSlots: { customRender: 'site_num_list' },
        width: '20%'
      }, {
        title: '预约人数',
        dataIndex: 'current_reservation_num',
        scopedSlots: { customRender: 'current_reservation_num' }
      }, {
        title: '签到状态',
        dataIndex: 'is_checkin',
        width: '20%'
      }, {
        title: '操作',
        dataIndex: 'action',
        scopedSlots: { customRender: 'action' }
      }],
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
  methods: {
    onSearch(value) {
      this.teamScheduleCommonService.getMemberList({ member_name: value }).subscribe()
    },
    onClickCancel(id) {
      this.teamScheduleReserveService.del(id).subscribe(() => {
        this.getReserve()
      })
    },
    onClickCheckIn(id) {
      this.teamScheduleReserveService.check({ id, checkin_method: 2 }).subscribe(() => {
        this.getReserve()
      })
    },
    onChange(value) {
      this.teamScheduleCommonService.getConsumeList({ course_id: this.courseId, member_id: value }).subscribe()
    },
    onChangeConsumeType(val) {
      const obj = JSON.parse(val)
      this.consumeType = obj.consume_type
      this.consumeId = obj.id
    },
    onChangeSiteNumList(val) {
      let tempArr = []
      this.unUsedSeatOptions.forEach(item => {
        if (val.includes(item.id)) {
          let value = item.name
          if (item.name === '无座位') value = -1
          this.siteNumIds.push(value)
          tempArr = this.siteNumIds.filter(item => item === -1)
        }
        const arr = Array.from(new Set(this.siteNumIds)).filter(item => item !== -1)
        this.siteNumIds = [...arr, ...tempArr]
      })
      if (val.length > 3) {
        this.siteNumIds.pop()
        this.messageService.error({
          content: `最多预约三个座位`
        })
      }
      this.currentReservationNum = val.length
    },
    onClickReserve() {
      const form = {
        schedule_id: this.id,
        member_id: this.memberId,
        seat: this.siteNumIds,
        consume_type: this.consumeType,
        consume_id: this.consumeId
      }
      this.teamScheduleReserveService.add(form)
        .subscribe(() => {
          this.getReserve()
        })
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
      ss.getInfo(this.id).pipe(
        switchMap(state => {
          this.info = state.info
          this.list = state.list
          return this.teamScheduleCommonService.getUnusedSeatList({ schedule_id: state.info.id, court_site_id: state.info.court_site_id })
        }))
        .subscribe()
    }
  },
  mounted() {
    this.getReserve()
  }
}
</script>
