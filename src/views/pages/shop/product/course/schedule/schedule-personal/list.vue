<template>
  <st-panel>
    <div slot="title">
      <a-row :gutter="8">
        <a-col :lg="9">
          <st-button>私教预约表</st-button>
        </a-col>
        <a-col :lg="7">
          <date/>
        </a-col>
        <a-col :lg="8" style="text-align: right;">
          <st-button class="mg-r8" type="primary">
            <modal-link
              tag="a"
              :to="{ name: 'schedule-personal-inbatch-add', props: { id: 1 } }"
            >批量排期</modal-link>
          </st-button>
          <st-button>
            <modal-link tag="a" :to="{ name: 'schedule-personal-add', props: { id: 1 } }">添加排期</modal-link>
          </st-button>
        </a-col>
      </a-row>
    </div>
    <a-row :gutter="8" class="mg-t8">
      <st-form-table :page="page" @change="onPageChange" hoverable>
        <thead>
          <tr>
            <th>教练名称</th>
            <template v-for="(item,index) in listData.schedule_time">
              <th :key="index" :class="item.date == currentTime ? 'thgl': ''">
                <span style="display: block;">{{ item.date }}</span>
                <span style="display: block;">{{ item.week }}</span>
              </th>
            </template>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="item in listData.list">
            <tr :key="item.staff_name">
              <td>
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
                  >{{ items.timing[0].start_time }}~{{ items.timing[0].end_time }}</td>
                </template>
              </template>
              <td>
                <modal-link
                  tag="a"
                  :to="{ name: 'schedule-personal-edit', props: { id: item.id } }"
                >编辑</modal-link>
              </td>
            </tr>
          </template>
        </tbody>
      </st-form-table>
    </a-row>
  </st-panel>
</template>

<script>
import date from './date#/date-component'
import { ListService } from './list.service'

export default {
  serviceInject() {
    return {
      service: ListService
    }
  },
  rxState() {
    return {
      listData: this.service.listData$
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
    this.currentTime = moment().format('YYYY-MM-DD')
    //   console.log(moment().format("YYYY-MM-DD"))
  },
  methods: {
    onPageChange() {}
  }
}
</script>
