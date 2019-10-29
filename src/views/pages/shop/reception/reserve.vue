<template>
  <st-panel app :class="bPage()">
    <div slot="title">
      <st-input-search
        placeholder="输入用户姓名、手机号"
        v-model="query.keyword"
        @search="onKeywordsSearch('keyword', $event)"
      />
    </div>
    <div slot="prepend">
      <st-search-panel @search="onSearchNative" @reset="onReset">
        <st-search-panel-item label="预约类型：">
          <st-search-radio
            class="value"
            v-model="query.reserve_type"
            :options="reserveType$"
          />
        </st-search-panel-item>
        <st-search-panel-item label="预约时间：">
          <st-range-picker
            :disabledDays="60"
            @change="onChangeRangeTime"
            :value="selectTime"
            class="value"
          ></st-range-picker>
        </st-search-panel-item>
      </st-search-panel>
    </div>
    <div>
      <st-button
        @click="onAddReverse"
        type="primary"
        class="shop-member-list-button"
        icon="add"
      >
        到访预约
      </st-button>
    </div>
    <st-table
      class="mg-t16"
      :columns="columns"
      :scroll="{ x: 1400 }"
      rowKey="id"
      :page="page$"
      :loading="loading$.getList"
      @change="onTableChange"
      :dataSource="list$"
    >
      <span slot="reserve_type" slot-scope="text">{{ text.name }}</span>
      <span slot="member" slot-scope="text">{{ text.name }}</span>
      <span slot="reserve_status" slot-scope="text">{{ text.name }}</span>
      <div slot="action" slot-scope="text, record">
        <st-table-actions v-if="record.reserve_type.id === RESERVE_TYPE.COURSE">
          <a v-if="record.cancel" @click="onClickCancel(record)">
            取消
          </a>
          <a v-if="record.checkin" @click="onClickCourseSign(record)">
            签到
          </a>
          <a
            v-if="record.reserve_status.id === VISIT_STATUS.RESERVED"
            @click="onPrint(record.id)"
          >
            打印小票
          </a>
        </st-table-actions>
        <st-table-actions v-if="record.reserve_type.id === RESERVE_TYPE.VISIT">
          <a v-if="record.cancel" @click="onClickCancelVisitReserve(record)">
            取消
          </a>
          <a v-if="record.checkin" @click="onClickconfirmVisitReserve(record)">
            确认到访
          </a>
        </st-table-actions>
      </div>
    </st-table>
  </st-panel>
</template>
<script>
import { RouteService } from '@/services/route.service'
import tableMixin from '@/mixins/table.mixin'
import { ReserveService } from './reserve.service'
import FrontAddReserve from '@/views/biz-modals/front/add-reserve'
import { columns } from './reserve.config.ts'

import {
  VISIT_STATUS,
  COURSE_STATUS,
  RESERVE_TYPE
} from '@/constants/front/reserve'
export default {
  name: 'ReceptionReserve',
  mixins: [tableMixin],
  modals: {
    FrontAddReserve
  },
  bem: {
    bPage: 'page-shop-reception-reserve',
    bSearch: 'search'
  },
  serviceInject() {
    return {
      routeService: RouteService,
      service: ReserveService
    }
  },
  rxState() {
    const { loading$, page$, list$, reserveType$ } = this.service
    return {
      query: this.routeService.query$,
      loading$,
      page$,
      list$,
      reserveType$
    }
  },
  data() {
    return {
      VISIT_STATUS,
      COURSE_STATUS,
      RESERVE_TYPE,
      selectTime: {
        startTime: {
          showTime: false,
          disabledBegin: null,
          placeholder: '开始日期',
          disabled: false,
          value: moment(),
          format: 'YYYY-MM-DD',
          change: $event => {}
        },
        endTime: {
          showTime: false,
          placeholder: '结束日期',
          disabled: false,
          value: moment(),
          format: 'YYYY-MM-DD',
          change: $event => {}
        }
      }
    }
  },
  computed: {
    columns
  },
  methods: {
    onAddReverse() {
      this.$modalRouter.push({
        name: 'front-add-reserve',
        on: {
          success: () => {
            this.$router.reload()
          }
        }
      })
    },
    onChangeRangeTime(value) {
      console.log(value)
    },
    onClickCancelVisitReserve(record) {
      this.service.cancelVisitReserve(record.id).subscribe(res => {
        this.$router.reload()
      })
    },
    onClickconfirmVisitReserve(record) {
      this.service.confirmVisitReserve(record.id).subscribe(res => {
        this.$router.reload()
      })
    },
    getCourseForm(record) {
      const { id, sub_reserve_type, member } = record
      return {
        id: member.id,
        reserve_type: sub_reserve_type.id,
        reserve_id: id
      }
    },
    onClickCancel(record) {
      this.service
        .cancelCourseReserve(this.getCourseForm(record))
        .subscribe(res => {
          this.$router.reload()
        })
    },
    onClickCourseSign(record) {
      this.service
        .confirmCourseReserve(this.getCourseForm(record))
        .subscribe(res => {
          this.$router.reload()
        })
    },
    onSearchNative() {
      const start_time = this.selectTime.startTime.value
        ? `${this.selectTime.startTime.value.format('YYYY-MM-DD')} 00:00`
        : ''
      const end_time = this.selectTime.endTime.value
        ? `${this.selectTime.endTime.value.format('YYYY-MM-DD')} 23:59`
        : ''
      this.query.start_time = start_time
      this.query.end_time = end_time
      this.onSearch()
    },
    onReset() {
      this.selectTime.startTime.value = moment()
      this.selectTime.endTime.value = moment()
      this.onSearhReset()
    },
    onPrint(id) {
      let record = this.info
      location.href = '/ticket/print?id=' + id
    }
  }
}
</script>
