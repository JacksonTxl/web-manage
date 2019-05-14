<template>
  <div>
    <st-t4>卡项</st-t4>
    <a-row :gutter="24" class="mg-t16">
      <a-col :lg="24">
        <a-col :lg="9">
          <a-date-picker style="width: 224px;" format="YYYY-MM-DD" placeholder="开卡日期" @change="onChooseDate" />
          <a-select style="width: 160px;margin-left:12px" placeholder="请选择" v-model="cardquery.card_type" @change="onChooseCardType">
            <a-select-option :value="1">期限卡</a-select-option>
            <a-select-option :value="3">次卡</a-select-option>
            <a-select-option :value="2">储值卡</a-select-option>
          </a-select>
        </a-col>
        <a-col :lg="6"></a-col>
        <a-col :lg="9">
          <st-input-search v-model="cardquery.keyword" placeholder="请输入会员卡名称" @search="searchMemberCard"/>
        </a-col>
      </a-col>
      <a-col :lg="24">
        <st-table
          rowKey=""
          :columns="cardItem"
          :dataSource="cardsListInfo.card_list"
          :scroll="{ x: 1750}"
          @change="cardPageChange"
          :pagination="cardPage"
        >
          <span slot="card_status" slot-scope="text,record">
            <span v-if="record.card_status ==='有效'" class="effective"></span>
            <span v-if="record.card_status ==='失效'" class="invalid"></span>
            <span v-if="record.card_status === '已冻结'" class="frozen"></span>
            {{ text }}
          </span>
        </st-table>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="24">
        <st-hr></st-hr>
      </a-col>
    </a-row>

    <st-t4>课程</st-t4>
    <a-row :gutter="24" class="mg-t16">
      <a-col :lg="24">
        <a-col :lg="9">
          <a-date-picker style="width: 224px;" placeholder="购买日期" format="YYYY-MM-DD" @change="onChooseDateCourse"/>
          <a-select style="width: 160px;margin-left:12px" v-model="coursequery.course_type" placeholder="请选择" @change="onChooseCourseType">
            <a-select-option :value="3">团体课</a-select-option>
            <a-select-option :value="1">私教课</a-select-option>
            <a-select-option :value="2">私教小班课</a-select-option>
            <a-select-option :value="4">课程包</a-select-option>
          </a-select>
        </a-col>
        <a-col :lg="6"></a-col>
        <a-col :lg="9">
          <st-input-search placeholder="请输入课程名称" @search="searchCourseName"/>
        </a-col>
      </a-col>
      <a-col :lg="24">
        <st-table
          :columns="course"
          :dataSource="courseListInfo.course_list"
          :pagination="coursePage"
          @change="coursePageChange">
          <span slot="course_status" slot-scope="text,record">
            <span v-if="record.course_status ==='有效'" class="effective"></span>
            <span v-if="record.course_status ==='失效'" class="invalid"></span>
            <span v-if="record.course_status === '已预约'" class="frozen"></span>
            {{ text }}
          </span>
        </st-table>
      </a-col>
    </a-row>
    <!--
    <a-row :gutter="8">
      <a-col :lg="24">
        <st-hr></st-hr>
      </a-col>
    </a-row>
    <st-t4>租赁柜</st-t4>
    <a-row :gutter="24" class="mg-t16">
      <a-col :lg="24">
        <a-table :columns="leaseArk" :dataSource="data"></a-table>
      </a-col>
    </a-row>-->
  </div>
</template>

<script>
import { ReserveService } from './reserve.service'

const cardItem = [
  {
    title: '合同编号',
    dataIndex: 'contract_number',
    key: 'contract_number'
  },
  {
    title: '卡类型',
    dataIndex: 'card_type',
    key: 'card_type'
  },
  {
    title: '卡名称',
    dataIndex: 'card_name',
    key: 'card_name'
  },
  {
    title: '购卡场馆',
    dataIndex: 'buy_shop_name',
    key: 'buy_shop_name'
  },
  {
    title: '支持入场场馆',
    dataIndex: 'use_shop_name',
    key: 'use_shop_name'
  },
  {
    title: '购买额度',
    dataIndex: 'init_amount',
    key: 'init_amount'
  },
  {
    title: '剩余额度',
    dataIndex: 'remain_amount',
    key: 'remain_amount'
  },
  {
    title: '卡状态',
    dataIndex: 'card_status',
    key: 'card_status',
    scopedSlots: { customRender: 'card_status' }
  },
  {
    title: '开卡日期',
    dataIndex: 'start_time',
    key: 'start_time'
  },
  {
    title: '到期日期',
    dataIndex: 'end_time',
    key: 'end_time'
  }
]
const course = [
  {
    title: '合同编号',
    dataIndex: 'contract_number',
    key: 'contract_number'
  },
  {
    title: '课程类型',
    dataIndex: 'course_type',
    key: 'course_type'
  },
  {
    title: '课程名',
    dataIndex: 'course_name',
    key: 'course_name'
  },
  {
    title: '上课教练',
    dataIndex: 'coach_name',
    key: 'coach_name'
  },
  {
    title: '购买额度',
    dataIndex: 'init_course_num',
    key: 'init_course_num'
  },
  {
    title: '剩余额度',
    dataIndex: 'remain_course_num',
    key: 'remain_course_num'
  },
  {
    title: '状态',
    dataIndex: 'course_status',
    key: 'course_status',
    scopedSlots: { customRender: 'course_status' }
  }
]
const leaseArk = [
  {
    title: '合同编号',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: '类型',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: '租赁柜号',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: '租赁天数',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: '剩余天数',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: '状态',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: '起租日期',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: '到期日期',
    dataIndex: 'age',
    key: 'age'
  }
]
export default {
  serviceInject() {
    return {
      reserveService: ReserveService
    }
  },
  rxState() {
    return {
      cardsListInfo: this.reserveService.cardsListInfo$,
      courseListInfo: this.reserveService.courseListInfo$
    }
  },
  data() {
    return {
      cardItem,
      course,
      leaseArk,
      cardquery: {
        start_time: '',
        card_type: 1,
        keyword: ''
      },
      cardPage: {
        current: 1,
        pageSize: 10
      },
      coursequery: {
        buy_time: '',
        course_type: 1,
        keyword: ''
      },
      coursePage: {
        current: 1,
        pageSize: 10
      },
      id: ''
    }
  },
  methods: {
    /**
     * 设置页码
     * cardOrCourse 卡或课
     * current 当前页
     * pageSize 每页条数
     */
    initPage(cardOrCourse, current, pageSize) {
      if (cardOrCourse === 1) {
        this.cardPage.current = current
        this.cardPage.pageSize = pageSize
      } else if (cardOrCourse === 2) {
        this.coursePage.current = current
        this.coursePage.pageSize = pageSize
      }
    },
    // 拼接入参
    assignObj(cardOrCourse) {
      if (cardOrCourse === 1) {
        return Object.assign(this.cardPage, this.cardquery)
      } else if (cardOrCourse === 2) {
        return Object.assign(this.coursePage, this.coursequery)
      }
    },
    // 选择日期
    onChooseDate(date, str) {
      console.log('======', date, str)
      this.initPage(1, 1, 10)
      this.cardquery.start_time = str
      this.reserveService.getCardInfo(this.id, this.assignObj(1)).subscribe((res) => {

      })
    },
    // 选择卡类型
    onChooseCardType(e) {
      console.log('选择卡', e)
      this.initPage(1, 1, 10)
      this.reserveService.getCardInfo(this.id, this.assignObj(1)).subscribe((res) => {})
    },
    // 卡分页
    cardPageChange(e) {
      this.initPage(1, e.current, e.pageSize)
      this.reserveService.getCardInfo(this.id, this.assignObj(1)).subscribe((res) => {})
    },
    // 卡查询
    searchMemberCard(e) {
      this.initPage(1, 1, 10)
      this.cardquery.keyword = e
      this.reserveService.getCardInfo(this.id, this.assignObj(1)).subscribe((res) => {})
    },
    // 课项选择时间
    onChooseDateCourse(date, str) {
      this.initPage(2, 1, 10)
      this.coursequery.buy_time = str
      this.reserveService.getCourseInfo(this.id, this.assignObj(2)).subscribe((res) => {})
    },
    // 课项选择类型
    onChooseCourseType(e) {
      console.log('选择课', e)
      this.initPage(2, 1, 10)
      this.reserveService.getCourseInfo(this.id, this.assignObj(2)).subscribe((res) => {})
    },
    // 课查询
    searchCourseName(e) {
      this.initPage(2, 1, 10)
      this.coursequery.keyword = e
      this.reserveService.getCardInfo(this.id, this.assignObj(2)).subscribe((res) => {})
    },
    // 课分页
    coursePageChange(e) {
      this.initPage(2, e.current, e.pageSize)
      this.reserveService.getCardInfo(this.id, this.assignObj(2)).subscribe((res) => {})
    }
  },
  mounted() {
    this.id = this.$route.meta.query.id
  }
}
</script>
