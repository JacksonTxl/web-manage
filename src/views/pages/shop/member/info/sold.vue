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
          :soldPage="soldPage"
        >
          <div slot="reserve_type" slot-scope="text,record">
            {{record.name}}
          </div>
          <div slot="is_checkin" slot-scope="text">
            <div>
              <span :class="text|isCheckin" v-if="text === '未签到'"></span>
              {{text}}
            </div>
          </div>
          <div slot="action" slot-scope="text,record" href="javascript:;">
            <st-table-actions>
              <a href="javascript:;" v-if="record.auth['shop:reserve:personal_course_reserve|del']" @click="reserveStatus(record)">取消预约</a>
              <a href="javascript:;" v-if="record.auth['shop:reserve:personal_course_reserve|checkin']" @click="isCheckin(record)">{{record.is_checkin}}</a>
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
    <!-- TODO: 暂无接口222 -->
    <st-t4>入场记录</st-t4>
    <a-row :gutter="24" class="mg-t16">
      <a-col :lg="24">
        <st-table :columns="admission"></st-table>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import formDate from './sold#/form-date.vue'
import { SoldService } from './sold.service'
import { classrecord, admission } from './sold.config.ts'
import tableMixin from '@/mixins/table.mixin'
export default {
  mixins: [tableMixin],
  serviceInject() {
    return {
      Service: SoldService
    }
  },
  rxState() {
    return {
      soldListInfo: this.Service.soldListInfo$,
      soldPage: this.Service.soldPage$,
      auth: this.Service.auth$
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
    // this.Service.init(self.$route.query.id, self.form).subscribe()
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
          console.log(record, getdata)
          self.Service.getMemberCancel(getdata).subscribe(res => {
            self.Service.init(self.$route.query.id, self.form).subscribe()
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
          self.Service.getMemberSign(getdata).subscribe(res => {
            self.Service.init(self.$route.query.id, self.form).subscribe()
          })
        },
        onCancel() {}
      })
    },
    handleChange(value) {
      console.log(`selected ${value}`)
    },
    onTableChange(page, filters, sorter) {
      console.log(pagination, filters, sorter)
      this.form.page = page.current_page
      this.form.size = page.size
    }
  },
  watch: {
    form: {
      handler() {
        let self = this
        this.Service.init(self.$route.query.id, self.form).subscribe()
      },
      deep: true
    },
    soldListInfo: {
      handler() {
        let self = this
        self.pagination.pageSize = self.soldListInfo.page.current_page
        self.pagination.total = self.soldListInfo.page.total_counts
        self.pagination.pageSize = self.soldListInfo.page.size
      },
      deep: true
    }
  }
}
</script>
