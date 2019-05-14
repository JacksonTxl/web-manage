<template>
  <div class="member-info-sold">
    <st-t4>预约上课记录</st-t4>
    {{form}}
    <formDate v-model="form"></formDate>
    <a-row :gutter="24" class="mg-t16">
      <a-col :lg="24">
        <st-table
          rowKey="id"
          :columns="classrecord"
          :dataSource="cardsListInfo.reserve_list"
          @change="onTableChange"
          :pagination="pagination"
        >
          <div slot="is_checkin" slot-scope="text">
            <div>
              <span :class="text|isCheckin" v-if="text === '未签到'"></span>
              {{text}}
            </div>
          </div>
          <div slot="action" slot-scope="text,record" href="javascript:;">
            <div v-if="record.reserve_status === '预约成功' && record.is_checkin === '未签到'">
              <a href="javascript:;" @click="reserveStatus(record)">取消预约</a>
              <a-divider type="vertical"></a-divider>
              <a href="javascript:;" @click="isCheckin(record)">{{record.is_checkin}}</a>
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
    <st-t4>入场记录</st-t4>
    <a-row :gutter="24" class="mg-t16">
      <a-col :lg="24">
        <a-table :columns="admission"></a-table>
      </a-col>
    </a-row>
    {{cardsListInfo}}
  </div>
</template>
<script>
import formDate from './sold#/form-date.vue'
import { SoldService } from './sold.service'
import { clone } from '../../../../../operators/clone'
export default {
  serviceInject() {
    return {
      Service: SoldService
    }
  },
  rxState() {
    return {
      cardsListInfo: this.Service.cardsListInfo$,
      followInfo: this.Service.followInfo$
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
        reserve_type: 1,
        reserve_status: -1,
        checkin_status: -1,
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
            return (
              new Date(a.start_time).getTime() >
              new Date(b.start_time).getTime()
            )
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
            return (
              new Date(a.created_time).getTime() >
              new Date(b.created_time).getTime()
            )
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
      tableData: [
        {
          reserve_type: '1',
          id: 1,
          course_name: '哈哈',
          start_time: '2019-04-29 00:00:00',
          end_time: '2019-05-05 07:41:52',
          coach_name: '测试',
          reserve_num: 1,
          reserve_status: 1,
          is_checkin: 0,
          created_time: '2019-04-29'
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
    this.pagination.pageSize = this.cardsListInfo.page.current_page
    this.pagination.total = this.cardsListInfo.page.total_pages
    this.pagination.pageSize = this.cardsListInfo.page.size
  },
  methods: {
    /* 预约状态 */
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
            course_type:
              record.reserve_type === '团课'
                ? 1
                : record.reserve_type === '私教课'
                  ? 2
                  : 3,
            reserve_id: record.id
          }
          console.log(record, getdata)
          self.Service.getMemberCancel(getdata).subscribe(res => {
            console.log(res)
          })
        },
        onCancel() {}
      })
    },
    /* 签到状态 */
    isCheckin(record) {
      this.$confirm({
        title: '提示',
        content: '确认签到?',
        onOk() {},
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
    cardsListInfo: {
      handler() {
        let self = this
        self.pagination.pageSize = self.cardsListInfo.page.current_page
        self.pagination.total = self.cardsListInfo.page.total_pages
        self.pagination.pageSize = self.cardsListInfo.page.size
      },
      deep: true
    }
  }
}
</script>
