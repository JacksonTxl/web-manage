<template>
  <div class="member-info-sold">
    <st-t4>预约上课记录</st-t4>
    <formDate v-model="form"></formDate>
    <a-row :gutter="24" class="mg-t16">
      <a-col :lg="24">
        <st-table
          rowKey="id"
          :columns="classrecord"
          :dataSource="soldListInfo.reserve_list"
          @change="onTableChange"
          :pagination="pagination"
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
            <div v-if="record.reserve_type.id === 1">
              <a href="javascript:;" v-if="record.auth['shop:reserve:personal_course_reserve|del']" @click="reserveStatus(record)">取消预约</a>
              <a-divider type="vertical"></a-divider>
              <a href="javascript:;" v-if="record.auth['shop:reserve:personal_course_reserve|checkin']" @click="isCheckin(record)">{{record.is_checkin}}</a>
            </div>
            <div v-else-if="record.reserve_type.id === 2">
              <a href="javascript:;" v-if="record.auth['shop:reserve:personal_team_course_reserve|checkin']" @click="reserveStatus(record)">取消预约</a>
              <a-divider type="vertical"></a-divider>
              <a href="javascript:;" v-if="record.auth['shop:reserve:personal_team_course_reserve|checkin']" @click="isCheckin(record)">{{record.is_checkin}}</a>
            </div>
            <div v-else-if="record.reserve_type.id === 3">
              <a href="javascript:;" v-if="record.auth['shop:reserve:team_course_reserve|del']" @click="reserveStatus(record)">取消预约</a>
              <a-divider type="vertical"></a-divider>
              <a href="javascript:;" v-if="record.auth['shop:reserve:team_course_reserve|checkin']" @click="isCheckin(record)">{{record.is_checkin}}</a>
            </div>

            <!-- <div v-else>—</div> -->
          </div>
        </st-table>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="24">
        <st-hr></st-hr>
      </a-col>
    </a-row>
    <!-- TODO: 暂无接口 -->
    <st-t4>入场记录</st-t4>
    <a-row :gutter="24" class="mg-t16">
      <a-col :lg="24">
        <a-table :columns="admission"></a-table>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import formDate from './sold#/form-date.vue'
import { SoldService } from './sold.service'
export default {
  serviceInject() {
    return {
      Service: SoldService
    }
  },
  rxState() {
    return {
      soldListInfo: this.Service.soldListInfo$,
      followInfo: this.Service.followInfo$,
      auth: this.Service.auth$
    }
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
      },
      pagination: {
        pageSizeOptions: ['10', '20', '30', '40', '50'],
        current: 1,
        pageSize: 20,
        total: 50
      },
      classrecord: [
        {
          title: '课程类型',
          dataIndex: 'reserve_type'
        },
        {
          title: '课程名称',
          dataIndex: 'course_name'
        },
        {
          title: '上课时间',
          dataIndex: 'start_time',
          sorter: (a, b) => {
            let A = new Date(a.start_time).getTime()
            let B = new Date(b.start_time).getTime()
            if (A < B) {
              return -1
            }
            if (A > B) {
              return 1
            }
            return 0
          }
        },
        {
          title: '上课教练',
          dataIndex: 'coach_name'
        },
        {
          title: '预约人数',
          dataIndex: 'reserve_num'
        },
        {
          title: '预约状态',
          dataIndex: 'reserve_status'
        },
        {
          title: '签到状态',
          dataIndex: 'is_checkin',
          scopedSlots: { customRender: 'is_checkin' }
        },
        {
          title: '预约时间',
          dataIndex: 'created_time',
          sorter: (a, b) => {
            let A = new Date(a.created_time).getTime()
            let B = new Date(b.created_time).getTime()
            if (A < B) {
              return -1
            }
            if (A > B) {
              return 1
            }
            return 0
          }
        },
        {
          title: '操作',
          dataIndex: 'action',
          fixed: 'right',
          width: 150,
          scopedSlots: { customRender: 'action' }
        }
      ],
      admission: [
        {
          title: '入场门店',
          dataIndex: 'age',
          key: 'age'
        },
        {
          title: '会员卡',
          dataIndex: 'age1',
          key: 'age1'
        },
        {
          title: '入场时间',
          dataIndex: 'age2',
          key: 'age2'
        },
        {
          title: '扣除次数',
          dataIndex: 'age3',
          key: 'age3'
        },
        {
          title: '离场时间',
          dataIndex: 'age4',
          key: 'age4'
        },
        {
          title: '临时储物柜',
          dataIndex: 'age5',
          key: 'age5'
        }
      ]
    }
  },
  created() {
    let self = this
    // this.Service.init(self.$route.query.id, self.form).subscribe()
    this.pagination.pageSize = this.soldListInfo.page.current_page
    this.pagination.total = this.soldListInfo.page.total_counts
    this.pagination.pageSize = this.soldListInfo.page.size
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
    onTableChange(pagination, filters, sorter) {
      console.log(pagination, filters, sorter)
      this.pagination = pagination
      this.form.page = pagination.current
      this.form.size = pagination.pageSize
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
