<template>
  <div class="member-info-sold">
    <st-t4>预约上课记录</st-t4>
    <formDate v-model="form"></formDate>
    <a-row :gutter="24" class="mg-t16">
      <a-col :lg="24">
        <st-table
          rowKey="id"
          :columns="classrecord"
          :dataSource="soldListInfo"
          @change="onTableChange"
          :page="soldPage"
        >
          <div slot="reserve_type" slot-scope="text,record">
            {{record.reserve_type.name}}
          </div>
          <div slot="is_checkin" slot-scope="text">
            <div>
              <span :class="text|isCheckin" v-if="text === '未签到'"></span>
              {{text}}
            </div>
          </div>
          <div slot="action" slot-scope="text,record">
            <st-table-actions>
              <a v-if="record.auth['shop:reserve:personal_course_reserve|del'] && record.reserve_type.id === 1" @click="reserveStatus(record)">取消预约</a>
              <a v-if="record.auth['shop:reserve:personal_course_reserve|checkin'] && record.reserve_type.id === 1" @click="isCheckin(record)">{{record.is_checkin}}</a>
              <a v-if="record.auth['shop:reserve:personal_team_course_reserve|del'] && record.reserve_type.id === 2" @click="reserveStatus(record)">取消预约</a>
              <a v-if="record.auth['shop:reserve:personal_team_course_reserve|checkin'] && record.reserve_type.id === 2" @click="isCheckin(record)">{{record.is_checkin}}</a>
              <a v-if="record.auth['shop:reserve:team_course_reserve|del'] && record.reserve_type.id === 3" @click="reserveStatus(record)">取消预约</a>
              <a v-if="record.auth['shop:reserve:team_course_reserve|checkin'] && record.reserve_type.id === 3" @click="isCheckin(record)">{{record.is_checkin}}</a>
            </st-table-actions>
          </div>
        </st-table>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="24">
        <st-hr></st-hr>
      </a-col>
    </a-row>

    <st-t4>入场记录</st-t4>
    <a-row :gutter="24" class="mg-t16">
      <a-col :lg="24">
        <st-table
          :columns="admission"
          rowKey="id"
          :dataSource="entranceList"
          @change="onTableChange"
          :page="entrancePage"
        ></st-table>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import formDate from './sold#/form-date.vue'
import { SoldService } from './sold.service'
import { classrecord, admission } from './sold.config.ts'
import { RouteService } from '@/services/route.service'
import tableMixin from '@/mixins/table.mixin'
export default {
  mixins: [tableMixin],
  serviceInject() {
    return {
      soldService: SoldService,
      routeService: RouteService
    }
  },
  rxState() {
    return {
      soldListInfo: this.soldService.soldListInfo$,
      soldPage: this.soldService.soldPage$,
      entranceList: this.soldService.entranceList$,
      entrancePage: this.soldService.entrancePage$,
      auth: this.soldService.auth$,
      query: this.routeService.query$
    }
  },
  computed: {
    classrecord,
    admission
  },
  components: {
    formDate
  },
  filters: {
    isCheckin(value) {
      if (value === '未签到') {
        return 'member-info-sold__is_checkin_no'
      } else if (value === '已签到') {
        return 'member-info-sold__is_checkin_yes'
      } else {
        return ''
      }
    }
  },
  data() {
    return {
      form: {
        start_date: '', // 上课日期
        reserve_type: '1',
        reserve_status: '-1',
        checkin_status: '-1',
        course_name: undefined,
        size: 20,
        page: 1
      }
    }
  },
  created() {
    let self = this
    // this.soldService.init(self.$route.query.id, self.form).subscribe()
  },
  methods: {
    /* 取消预约 */
    reserveStatus(record) {
      let self = this
      this.$confirm({
        title: '提示',
        content: '确认取消预约并退还相应费用？',
        okText: '确认取消',
        cancelText: '再看看',
        onOk() {
          let getdata = {
            id: self.$route.query.id,
            reserve_type: record.reserve_type.id,
            reserve_id: record.id
          }
          self.soldService.getMemberCancel(getdata).subscribe(res => {
            self.soldService.init(self.$route.query.id, self.form).subscribe()
          })
        },
        onCancel() {}
      })
    },
    /* 课程签到 */
    isCheckin(record) {
      let self = this
      this.$confirm({
        title: '提示',
        content: '确认签到?',
        onOk() {
          let getdata = {
            id: self.$route.query.id,
            reserve_type: record.reserve_type.id,
            reserve_id: record.id
          }
          console.log(record, getdata)
          self.soldService.getMemberSign(getdata).subscribe(res => {
            self.soldService.init(self.$route.query.id, self.form).subscribe()
          })
        },
        onCancel() {}
      })
    },
    handleChange(value) {
      console.log(`selected ${value}`)
    }
  },
  watch: {
    form: {
      handler() {
        let self = this
        this.soldService.init(self.$route.query.id, self.form).subscribe()
      },
      deep: true
    }

  }
}
</script>
