<template>
  <div class="page-personal-table schedule-table">
    <div class="page-personal-table__title pd-x24 pd-y16 schedule-table__title" slot="title">
      <a-row :gutter="8">
        <a-col :lg="8">
          <st-button>
            <modal-link tag="a" :to="{ name: 'schedule-personal-add', props: { id: 1 } }">添加预约</modal-link>
          </st-button>
        </a-col>
        <a-col :lg="7" :offset="2">
          <date @today="getList" :start="scheduleTime[0]" @pre="getList" @next="getList"/>
        </a-col>
        <a-col :lg="7" class="schedule-button">
          <st-button  @click="onClickSkipSchedule"><st-icon type="calendar"></st-icon></st-button>
        </a-col>
      </a-row>
    </div>
    <a-row class="mg-t8 mg-r24 mg-l24">
      <st-form-table :page="page" @change="onPageChange" hoverable>
        <thead>
          <tr>
            <th>教练名称</th>
            <template v-for="(item,index) in scheduleTime">
              <th :key="index" :class="item == currentTime ? 'thgl': ''">
                <div class="schedule-table__header">
                  <span class="mg-r8">{{ item | getDate }}</span>
                  <span >{{ index | getWeek }}</span>
                </div>
              </th>
            </template>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="item in scheduleList">
            <tr :key="item.staff_name">
              <td width="120">
                <a href="javascript:;">{{ item.staff_name }}</a>
              </td>
              <template v-for="items in item.schedule_info">
                <template v-if="items.timing.length > 0">
                  <td :key="items.id" :class="items.schedule_date == currentTime ? 'thgl': ''">
                    <a-popover placement="rightTop">
                      <template slot="content">
                          <template v-for="timingItem in items.timing">
                              <p :key="timingItem.start_time">{{ timingItem.start_time }}~{{ timingItem.end_time }}</p>
                          </template>
                      </template>
                      <template slot="title">
                        <span>排期</span>
                      </template>
                      {{ items.timing[0].start_time }}~{{ items.timing[0].end_time }}
                    </a-popover>
                  </td>
                </template>
                <template v-else>
                  <td
                    :key="items.id"
                    :class="items.schedule_date == currentTime ? 'thgl': ''"
                  >--</td>
                </template>
              </template>
              <td>
                <modal-link
                  tag="a"
                  :to="{ name: 'schedule-personal-edit', props: { id: item.staff_id, start: scheduleTime[0] } }"
                >编辑</modal-link>
              </td>
            </tr>
          </template>
        </tbody>
      </st-form-table>
    </a-row>
  </div>
</template>

<script>
import date from './date#/date-component'
import { PersonalTableService } from './personal-table.service'
import { RouteService } from '../../../../../../services/route.service'

export default {
  serviceInject() {
    return {
      tableService: PersonalTableService,
      routeService: RouteService
    }
  },
  rxState() {
    return {
      query: this.routeService.query$,
      scheduleTime: this.tableService.scheduleTime$,
      scheduleList: this.tableService.scheduleList$
    }
  },
  filters: {
    getWeek(index) {
      const weekList = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      return weekList[index]
    },
    getDate(date) {
      return moment(date).format('MM/DD').valueOf()
    }
  },
  components: {
    date
  },
  data() {
    return {
      page: {},
      currentTime: ''
    }
  },
  mounted() {
    this.currentTime = '2019-05-26'
  },
  methods: {
    onClickSkipSchedule() {
      this.$router.push({ name: 'shop-product-course-schedule-personal-calendar' })
    },
    getList(query = {}) {
      this.$router.push({ query: { ...this.query, ...query } })
    },
    onPageChange() {}
  }
}
</script>
