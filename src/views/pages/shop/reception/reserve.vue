<template>
  <st-panel :class="bPage()">
    <div slot="title">
      <st-input-search
        placeholder="输入用户姓名、手机号"
        v-model="query.keyword"
        @search="onKeywordsSearch('keyword', $event)"
        style="width: 290px;"
      />
    </div>
    <div slot="prepend">
      <st-search-panel :class="bSearch()">
        <div :class="bSearch('radio')" class="mg-t24 search-item">
          <span class="label">预约类型:</span>
          <st-search-radio
            class="value"
            v-model="query.reserve_type"
            :list="reserveType$"
          />
        </div>
        <div :class="bSearch('range-picker')" class="mg-t24 search-item">
          <span class="label">预约时间：</span>
          <st-range-picker
            :disabledDays="60"
            @change="onChangeRangeTime"
            :value="selectTime"
            class="value"
          ></st-range-picker>
        </div>

        <div slot="button">
          <st-button
            type="primary"
            @click="onSearchNative"
            :loading="loading$.getList"
          >
            查询
          </st-button>
          <st-button class="mg-l8" @click="onReset">重置</st-button>
        </div>
      </st-search-panel>
    </div>
    <div class="mg-t24 mg-b16">
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
      <!-- TODO: 暂时前端控制 -->
      <div slot="action" slot-scope="text, record">
        <st-table-actions v-if="record.reserve_type.id === RESERVE_TYPE.COURSE">
          <a
            v-if="record.auth['shop:reserve:visit_reserve|del']"
            @click="onClickCancel(record)"
          >
            取消
          </a>
          <a
            v-if="record.auth['shop:reserve:visit_reserve|checkin']"
            @click="onClickCourseSign(record)"
          >
            签到
          </a>
        </st-table-actions>
        <st-table-actions v-if="record.reserve_type.id === RESERVE_TYPE.VISIT">
          <a
            v-if="record.auth['shop:reserve:visit_reserve|del']"
            @click="onClickCancelVisitReserve(record)"
          >
            取消
          </a>
          <a
            v-if="record.auth['shop:reserve:visit_reserve|checkin']"
            @click="onClickconfirmVisitReserve(record)"
          >
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
          value: null,
          format: 'YYYY-MM-DD',
          change: $event => {}
        },
        endTime: {
          showTime: false,
          placeholder: '结束日期',
          disabled: false,
          value: null,
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
      this.$router.push({ query: { ...this.query, start_time, end_time } })
    },
    onReset() {
      this.selectTime.startTime.value = null
      this.selectTime.endTime.value = null
      this.onSearhReset()
    }
  }
}
</script>
