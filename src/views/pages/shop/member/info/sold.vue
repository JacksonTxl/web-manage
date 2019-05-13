<template>
  <div>
    <st-t4>预约上课记录</st-t4>
    {{form}}
    <formDate v-model="form"></formDate>
    <!-- <a-row :gutter="24" class="mg-t16">
      <a-col :lg="24">
        <a-date-picker v-model="form.start_date" style="width: 160px"/>
        <a-select
          defaultValue="lucy"
          style="width: 160px;margin-left:12px"
          v-model="form.reserve_type"
        >
          <a-select-option value="jack">Jack</a-select-option>
          <a-select-option value="lucy">Lucy</a-select-option>

          <a-select-option value="Yiminghe">yiminghe</a-select-option>
        </a-select>
        <a-select
          defaultValue="lucy"
          style="width: 160px;margin-left:12px"
          v-model="form.reserve_status"
        >
          <a-select-option value="jack">Jack</a-select-option>
          <a-select-option value="lucy">Lucy</a-select-option>

          <a-select-option value="Yiminghe">yiminghe</a-select-option>
        </a-select>
        <a-select
          defaultValue="lucy"
          style="width: 160px;margin-left:12px"
          v-model="form.checkin_status"
        >
          <a-select-option value="jack">Jack</a-select-option>
          <a-select-option value="lucy">Lucy</a-select-option>

          <a-select-option value="Yiminghe">yiminghe</a-select-option>
        </a-select>
        <st-input-search
          placeholder="可输入姓名、手机号、卡号"
          style="width: 290px;float: right;"
          v-model="form.course_name"
        />
      </a-col>
    </a-row>-->
    <a-row :gutter="24" class="mg-t16">
      <a-col :lg="24">
        <a-table
          rowKey="id"
          :columns="classrecord"
          :dataSource="tableData"
          @change="onTableChange"
          :pagination="pagination"
        ></a-table>
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
        <!-- <a-table :columns="admission"></a-table> -->
      </a-col>
    </a-row>
  </div>
</template>
<script>
import formDate from './sold#/form-date.vue'
export default {
  components: {
    formDate
  },
  data() {
    return {
      form: {
        start_date: '', // 上课日期
        reserve_type: '预约课类型',
        reserve_status: '预约状态',
        checkin_status: '签到状态',
        course_name: '课程名称',
        size: '每页数量',
        page: '当前页'
      },
      pagination: {
        pageSizeOptions: ['10', '20', '30', '40', '50'],
        current: 1,
        pageSize: 10,
        total: 50
      },
      classrecord: [
        {
          title: '课程类型',
          dataIndex: 'reserve_type',
          key: 'reserve_type'
        },
        {
          title: '课程名称',
          dataIndex: 'course_name',
          key: 'course_name'
        },
        {
          title: '上课时间',
          dataIndex: 'start_time',
          key: 'start_time'
        },
        {
          title: '上课教练',
          dataIndex: 'coach_name',
          key: 'coach_name'
        },
        {
          title: '预约人数',
          dataIndex: 'reserve_num',
          key: 'reserve_num'
        },
        {
          title: '预约状态',
          dataIndex: 'reserve_status',
          key: 'reserve_status'
        },
        {
          title: '预约时间',
          dataIndex: 'created_time',
          key: 'created_time'
        },
        {
          title: '操作',
          dataIndex: 'age',
          key: 'age'
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
          dataIndex: 'age',
          key: 'age'
        },
        {
          title: '入场时间',
          dataIndex: 'age',
          key: 'age'
        },
        {
          title: '扣除次数',
          dataIndex: 'age',
          key: 'age'
        },
        {
          title: '离场时间',
          dataIndex: 'age',
          key: 'age'
        },
        {
          title: '临时储物柜',
          dataIndex: 'age',
          key: 'age'
        }
      ]
    }
  },
  methods: {
    handleChange(value) {
      console.log(`selected ${value}`)
    },
    onTableChange(pagination, filters, sorter) {
      console.log(pagination, filters, sorter)
    }
  }
}
</script>
