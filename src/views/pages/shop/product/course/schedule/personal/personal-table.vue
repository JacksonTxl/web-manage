<template>
  <div class="page-personal-table schedule-table">
    <div
      class="page-personal-table__title pd-x24 pd-y16 schedule-table__title"
      slot="title"
    >
      <a-row :gutter="8">
        <a-col :lg="8">
          <st-button class="mg-r8" type="primary">
            <a
              v-modal-link="{
                name: 'schedule-personal-inbatch-add',
                props: { id: 1 }
              }"
            >
              批量排期
            </a>
          </st-button>
          <!-- <st-button>
            <a v-modal-link="{ name: 'schedule-personal-add', props: { id: 1 } }">添加排期</a>
          </st-button>-->
          <st-button>
            <a herf="javascript:;" @click="onClickDeleteInBatchSchedule">
              批量删除
            </a>
          </st-button>
        </a-col>
        <a-col :lg="7" :offset="2">
          <date
            @today="getList"
            :start="query.start_date"
            @pre="getList"
            @next="getList"
          />
        </a-col>
        <a-col :lg="7" class="schedule-button">
          <st-button @click="onClickSkipSchedule">
            <st-icon type="calendar"></st-icon>
          </st-button>
        </a-col>
      </a-row>
    </div>
    <a-row class="mg-t8 mg-r24 mg-l24">
      <st-table
        :columns="scheduleColumns"
        rowKey="staff_id"
        :alertSelection="{ onReset: onSelectionReset }"
        :rowSelection="{
          selectedRowKeys: selectedRowKeys,
          fixed: true,
          onChange: onSelectChange
        }"
        :page="false"
        @change="onTableChange"
        :dataSource="scheduleList"
        :scroll="{ x: 1440 }"
      >
        <a href="javascript:;" slot="staff_name" slot-scope="text">
          {{ text }}
        </a>
        <template v-for="item in scheduleTime" :slot="item" slot-scope="text">
          <a-popover :key="item" v-if="text.timing.length" placement="rightTop">
            <template slot="content">
              <template v-for="timingItem in text.timing">
                <p :key="timingItem.start_time">
                  {{ timingItem.start_time }}~{{ timingItem.end_time }}
                </p>
              </template>
            </template>
            <template slot="title">
              <span>排期</span>
            </template>
            {{ text.timing | timingFilter }}
          </a-popover>
          <span :key="item" v-else>{{ text.timing | timingFilter }}</span>
        </template>
        <div slot="action" slot-scope="text, record">
          <a
            class="mg-r8"
            v-modal-link="{
              name: 'schedule-personal-edit',
              props: { id: record.staff_id, start: scheduleTime[0] }
            }"
          >
            编辑
          </a>
          <a
            href="javascript:;"
            @click="onClickDeleteSchedule(record.schedule_info)"
          >
            删除
          </a>
        </div>
      </st-table>
    </a-row>
  </div>
</template>

<script>
import date from '../date#/date-component'
import tableMixin from '@/mixins/table.mixin'
import { PersonalTableService } from './personal-table.service'
import { RouteService } from '@/services/route.service'
import { PersonalScheduleScheduleService } from '../personal.service#/schedule.service'
import SchedulePersonalAdd from '@/views/biz-modals/schedule/personal/add'
import SchedulePersonalEdit from '@/views/biz-modals/schedule/personal/edit'
import SchedulePersonalInbatchAdd from '@/views/biz-modals/schedule/personal/inbatch-add'
export default {
  name: 'PersonalTable',
  mixins: [tableMixin],
  modals: {
    SchedulePersonalAdd,
    SchedulePersonalEdit,
    SchedulePersonalInbatchAdd
  },
  serviceInject() {
    return {
      tableService: PersonalTableService,
      scheduleService: PersonalScheduleScheduleService,
      routeService: RouteService
    }
  },
  rxState() {
    return {
      query: this.routeService.query$,
      scheduleTime: this.tableService.scheduleTime$,
      scheduleColumns: this.tableService.scheduleColumns$,
      scheduleList: this.tableService.scheduleList$
    }
  },
  filters: {
    getWeek(index) {
      const weekList = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      return weekList[index]
    },
    timingFilter(val) {
      if (val.length) {
        return `${val[0].start_time} ~ ${val[0].end_time}`
      } else {
        return '--'
      }
    },
    getDate(date) {
      return moment(date)
        .format('MM/DD')
        .valueOf()
    }
  },
  components: {
    date
  },
  data() {
    return {
      page: {},
      currentTime: '',
      selectedRowKeys: [],
      selectedRows: [],
      diffSelectedRows: []
    }
  },
  methods: {
    onClickSkipSchedule() {
      this.$router.push({
        name: 'shop-product-course-schedule-personal',
        query: this.query
      })
    },
    onClickDeleteSchedule(scheduleInfo) {
      this.$confirm({
        title: '提示',
        content: '确认删除？',
        onOk: () => {
          const ids = scheduleInfo
            .filter(item => {
              return item.id
            })
            .map(item => {
              return item.id
            })
          this.scheduleService.delInBatch(ids).subscribe(res => {
            this.$router.push({ query: this.query, force: true })
          })
        },
        onCancel() {}
      })
    },
    onClickDeleteInBatchSchedule() {
      let ids = []
      this.$confirm({
        title: '提示',
        content: '确认删除？',
        onOk: () => {
          this.selectedRows.forEach(item => {
            ids = [
              ...ids,
              ...item.schedule_info
                .filter(ele => {
                  return ele.id
                })
                .map(ele => {
                  return ele.id
                })
            ]
          })
          this.onSelectionReset()
          this.scheduleService.delInBatch(ids).subscribe(res => {
            this.$router.push({ query: this.query, force: true })
          })
        },
        onCancel() {}
      })
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      if (selectedRows && selectedRows.length > 0) {
        const firstItem = selectedRows[0]
        this.diffSelectedRows = selectedRows.filter(
          item => item.card_type !== firstItem.card_type
        )
      }
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    getList(val = {}) {
      const query = {
        ...this.query,
        start_date: val.start_time,
        end_date: val.end_time
      }
      this.$router.push({ query })
    },
    onTableChange() {}
  }
}
</script>
