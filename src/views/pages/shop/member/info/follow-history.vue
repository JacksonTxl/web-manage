
<template>
  <div class="member-follow-history">
    <st-t4>跟进信息</st-t4>
    <a-row :gutter="24" class="mg-t16">
      <a-col :lg="8">
        <st-info>
          <st-info-item label="来源类别">{{followInfo.info.register_type}}</st-info-item>
          <st-info-item label="更进教练">{{followInfo.info.follow_coach_name}}</st-info-item>
        </st-info>
      </a-col>
      <a-col :lg="8">
        <st-info>
          <st-info-item label="来源方式">{{followInfo.info.register_way}}</st-info-item>
        </st-info>
      </a-col>
      <a-col :lg="8">
        <st-info>
          <st-info-item label="跟进销售">{{followInfo.info.follow_salesman_name}}</st-info-item>
        </st-info>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :lg="24">
        <st-hr></st-hr>
      </a-col>
    </a-row>
    <st-t4>跟进记录</st-t4>
    <a-row :gutter="8">
      <a-col :lg="24" v-if="auth.add">
        <a v-modal-link="{ name: 'shop-add-follow-records', on:{done: onModalTest }}">
          <st-button block type="dashed" class="mg-t16 mg-b24">添加跟进记录</st-button>
        </a>
      </a-col>
      <a-col :lg="24">
        <!-- <st-time-line v-model="timeLine">

        </st-time-line>-->
        <a-timeline pending="1" :reverse="reverse">
          <a-timeline-item v-for="(item,index) in followHistoryInfo.record_list" :key="index">
            <div class="member-follow-history-timeline__item">
              <div class="member-follow-history-timeline__item__title">{{item.follow_content}}</div>
              <div class="member-follow-history-timeline__item__info">
                <a-col :span="6">跟进人：{{item.follow_staff}}</a-col>
                <a-col :span="6">跟进方式：{{item.follow_way | followWay}}</a-col>
                <a-col :span="6">下次跟进时间：{{item.follow_next_time}}</a-col>
                <a-col :span="6">{{item.follow_status | followStatus}}</a-col>
              </div>
            </div>
            <div class="time-position">
              <div>{{item.follow_date.split(' ')[1]}}</div>
              <div>{{item.follow_date.split(' ')[0]}}</div>
            </div>
          </a-timeline-item>
        </a-timeline>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { FollowHistoryService } from './follow-history.service'
export default {
  serviceInject() {
    return {
      aService: FollowHistoryService
    }
  },
  rxState() {
    return {
      followHistoryInfo: this.aService.followHistoryInfo$,
      followInfo: this.aService.followInfo$,
      auth: this.aService.auth$
    }
  },
  data() {
    return {
      reverse: false
    }
  },
  filters: {
    // 跟进方式
    followWay: function(value) {
      let arr = ['', '电话', '微信', '客户到访', '上门拜访']
      return arr[value]
    },
    // 跟进状态
    followStatus: function(value) {
      let arr = [
        '',
        '已电话',
        '已邀约',
        '邀约成功',
        '实际到访',
        '已签约',
        '已购卡'
      ]
      return arr[value]
    }
  },
  created() {},
  methods: {
    onModalTest() {
      console.log(1111)
      this.aService.getListInfo('1').subscribe()
    }
  }
}
</script>
