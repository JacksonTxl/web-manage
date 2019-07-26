<template>
  <div>
    <st-t4>卡项</st-t4>
    <a-row :gutter="24" class="mg-t16">
      <a-col :lg="24" class="mg-b16">
        <a-col :lg="9">
          <a-date-picker style="width: 224px;" format="YYYY-MM-DD" placeholder="开卡日期" @change="onChooseDate" />
          <a-select style="width: 160px;margin-left:12px" placeholder="请选择" v-model="cardquery.card_type" @change="onChooseCardType">
            <a-select-option v-for="(item, index) in cardConsumeList" :value="item.value" :key="index">{{item.label}}</a-select-option>
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
          :dataSource="cardsListInfo"
          :scroll="{ x: 1750}"
          @change="cardPageChange"
          :page="cardPage"
        >
          <span slot="card_status" slot-scope="text,record">
            <span v-if="record.card_status.id === 1" class="effective"></span>
            <span v-if="record.card_status.id === 2" class="invalid"></span>
            <span v-if="record.card_status.id === 3" class="frozen"></span>
            {{ record.card_status.name }}
          </span>
          <!-- <span slot="use_shop_name" slot-scope="text,record">
            {{ record.use_shop_name.join(',') }}
          </span> -->
          <span slot="init_amount" slot-scope="text,record">
            {{ record.init_amount.number }}{{ record.init_amount.type }}
          </span>
          <span slot="remain_amount" slot-scope="text,record">
            {{ record.remain_amount.number }}{{ record.remain_amount.type }}
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
      <a-col :lg="24" class="mg-b16">
        <a-col :lg="9">
          <a-date-picker style="width: 224px;" placeholder="购买日期" format="YYYY-MM-DD" @change="onChooseDateCourse"/>
          <a-select style="width: 160px;margin-left:12px" v-model="coursequery.course_type" placeholder="请选择" @change="onChooseCourseType">
            <a-select-option v-for="(item, index) in courseConsumeList" :value="item.value" :key="index">{{item.label}}</a-select-option>
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
          :dataSource="courseListInfo"
          :page="coursePage"
          @change="coursePageChange">
          <span slot="course_status" slot-scope="text,record">
            <span v-if="record.course_status.id === 1" class="effective"></span>
            <span v-if="record.course_status.id === 3" class="invalid"></span>
            <span v-if="record.course_status.id === 2" class="frozen"></span>
            {{ record.course_status.name }}
          </span>
        </st-table>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { ReserveService } from './reserve.service'
import { cardItem, course, leaseArk } from './reserve.config'
import { UserService } from '@/services/user.service'

export default {
  serviceInject() {
    return {
      reserveService: ReserveService,
      userService: UserService
    }
  },
  rxState() {
    return {
      cardsListInfo: this.reserveService.cardsListInfo$,
      cardPage: this.reserveService.cardPage$,
      courseListInfo: this.reserveService.courseListInfo$,
      coursePage: this.reserveService.coursePage$,
      memberEnums: this.userService.memberEnums$
    }
  },
  data() {
    return {
      cardquery: {
        start_time: '',
        card_type: 1,
        keyword: ''
      },
      coursequery: {
        buy_time: '',
        course_type: 1,
        keyword: ''
      },
      id: ''
    }
  },
  computed: {
    cardItem,
    course,
    leaseArk,
    cardConsumeList() {
      let list = []
      if (!this.memberEnums.card_consume_type) return list
      Object.entries(this.memberEnums.card_consume_type.value).forEach(o => {
        list.push({ value: +o[0], label: o[1] })
      })
      return list
    },
    courseConsumeList() {
      let list = []
      if (!this.memberEnums.course_consume_type) return list
      Object.entries(this.memberEnums.course_consume_type.value).forEach(o => {
        list.push({ value: +o[0], label: o[1] })
      })
      return list
    }
  },
  methods: {
    /**
     * 设置页码
     * cardOrCourse 卡或课
     * current 当前页
     * pageSize 每页条数
     */
    initPage(cardOrCourse, current_page, size) {
      if (cardOrCourse === 1) {
        this.cardPage.size = size
        this.cardPage.current_page = current_page
      } else if (cardOrCourse === 2) {
        this.coursePage.current_page = current_page
        this.coursePage.size = size
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
