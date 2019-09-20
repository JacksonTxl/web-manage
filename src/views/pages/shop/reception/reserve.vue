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
            :disabledDays="180"
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
          <st-button class="mg-l8" @click="onSearhReset">重置</st-button>
        </div>
      </st-search-panel>
    </div>
    <div class="mg-t24 mg-b16">
      <st-button
        @click="onAddReverse"
        type="primary"
        class="shop-member-list-button"
        v-show="query.reserve_type === 2"
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
      <span slot="reserve_status" slot-scope="text">{{ text.name }}</span>
      <div slot="action" slot-scope="text, record">
        <st-table-actions v-if="record.reserve_type.id === 1">
          <a>取消</a>
          <a>签到</a>
        </st-table-actions>
        <st-table-actions v-if="record.reserve_type.id === 2">
          <a>取消</a>
          <a>预约到访</a>
        </st-table-actions>
      </div>
    </st-table>
  </st-panel>
</template>
<script>
// import moment from 'moment'
// import { cloneDeep, filter } from 'lodash-es'
// import { UserService } from '@/services/user.service'
// import { ListService } from './list.service'
import { RouteService } from '@/services/route.service'
import tableMixin from '@/mixins/table.mixin'
import { ReserveService } from './reserve.service'
import FrontAddReverve from '@/views/biz-modals/front/add-reverve'
import { columns } from './reserve.config.ts'
export default {
  name: 'ReceptionReserve',
  mixins: [tableMixin],
  modals: {
    FrontAddReverve
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
        name: 'front-add-reverve',
        on: {
          done: () => {
            console.log('ok')
          }
        }
      })
    },
    onChangeRangeTime(value) {
      console.log(value)
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
    onSearhReset() {}
  }
}
</script>
