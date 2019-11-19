<template>
  <div :class="bPage()">
    <a-timeline :reverse="false">
      <a-timeline-item v-for="(item, index) in list" :key="index">
        <div :class="bPage('timeline-item')">
          <div v-if="item.follow_axis_type === FOLLOW_STATUS.REGISTER">
            客户注册
          </div>
          <div v-if="item.follow_axis_type === FOLLOW_STATUS.BIND_SALE">
            <span>{{ item.operator_name }}</span>
            分配了跟进销售【{{ item.follow_salesman_name }}】
          </div>
          <div v-if="item.follow_axis_type === FOLLOW_STATUS.BIND_COACH">
            <span>{{ item.operator_name }}</span>
            分配了跟进教练【{{ item.follow_coach_name }}】
          </div>
          <div v-if="item.follow_axis_type === FOLLOW_STATUS.UNBIND_SALE">
            <span>{{ item.operator_name }}</span>
            解绑了跟进销售【{{ item.follow_salesman_name }}】
          </div>
          <div v-if="item.follow_axis_type === FOLLOW_STATUS.UNBIND_COACH">
            <span>{{ item.operator_name }}</span>
            解绑了跟进教练【{{ item.follow_coach_name }}】
          </div>
          <div v-if="item.follow_axis_type === FOLLOW_STATUS.AUTO_UNBIND_SALE">
            客户到期解绑了跟进销售【{{ item.follow_salesman_name }}】
          </div>
          <div v-if="item.follow_axis_type === FOLLOW_STATUS.AUTO_UNBIND_COACH">
            客户到期解绑了跟进教练【{{ item.follow_coach_name }}】
          </div>
          <div v-if="item.follow_axis_type === FOLLOW_STATUS.NORMAL">
            【{{ item.operator_name }}】添加了跟进记录当前第{{
              item.current_follow_count
            }}次跟进
          </div>
          <div :class="bPage('timeline-position')">
            <div>{{ item.created_time }}</div>
          </div>
        </div>
      </a-timeline-item>
    </a-timeline>
  </div>
</template>
<script>
import { FollowRecordService } from './follow-record.service'
import { FOLLOW_STATUS } from '@/constants/member/info'
export default {
  bem: {
    bPage: 'member-follow-record'
  },
  serviceInject() {
    return {
      followRecordService: FollowRecordService
    }
  },
  rxState() {
    return {
      list: this.followRecordService.list$
    }
  },
  data() {
    return {
      FOLLOW_STATUS
    }
  },
  methods: {}
}
</script>
