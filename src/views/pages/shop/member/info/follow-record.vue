<template>
  <div :class="bPage()">
    <a-timeline :reverse="false">
      <a-timeline-item v-for="(item, index) in list" :key="index">
        <div :class="bPage('timeline-item')">
          <div>
            {{ item.follow_content }}
          </div>
          <div :class="bPage('timeline-position')" class="font-number">
            <span>{{ item.time }}</span>
            <span class="date">{{ item.date }}</span>
          </div>
        </div>
      </a-timeline-item>
    </a-timeline>
  </div>
</template>
<script>
import { FollowRecordService } from './follow-record.service'
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
    return {}
  },
  methods: {}
}
</script>
