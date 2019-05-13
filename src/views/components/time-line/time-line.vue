<template>
  <div class="st-time-line">
    <a-timeline pending="1" :reverse="reverse">
      <a-timeline-item v-for="(item,index) in list" :key="index">
        <div class="st-time-line-timeline__item">
          <div class="st-time-line-timeline__item__title">{{item.follow_content}}</div>
          <div class="st-time-line-timeline__item__info">
            <a-col :span="6">跟进人：{{item.follow_content}}</a-col>
            <a-col :span="6">跟进方式：{{item.follow_way}}</a-col>
            <a-col :span="6">下次跟进时间：{{item.follow_next_time}}</a-col>
            <a-col :span="6">{{item.follow_status}}</a-col>
          </div>
        </div>
        <div class="time-position">
          <div>19:32:12</div>
          <div>2019/06/21</div>
        </div>
      </a-timeline-item>
    </a-timeline>
  </div>
</template>

<script>
export default {
  name: 'StTimeLine',
  model: {
    prop: 'value'
  },
  props: {
    value: {
      type: Array
    }
  },
  data() {
    return {
      reverse: false,
      list: [
        {
          member_id: 1, // 用户id
          follow_date: '2018-09-09', // 跟进时间
          follow_way: 1, // 跟进方式1 电话 2 微信 3 客户到访 4 上门拜访
          follow_content: '员工跟进记录', // 跟进记录内容
          follow_status: 3, // 跟进状态: 1 已电话 2 已邀约 3 邀约成功 4 实际到访 5 已签约 6 已购卡
          follow_next_time: '2018-09-09' // 下次跟进时间
        },
        {
          member_id: 2,
          follow_date: 1555579017,
          follow_way: 1,
          follow_content: '员工跟进记录',
          follow_status: 3,
          follow_next_time: '2018-09-09'
        }
      ]
    }
  }
}
</script>
