<template>
  <st-panel-layout class="page-team-info">
    <div class="header mg-b24">
      <div :class="b('left')" class="mg-r24">
        <st-t3 class="mg-b16">
          {{ groupCourseInfo.course_name }}
          <!-- <span v-if="groupCourseInfo.course_category.name">
            （{{ groupCourseInfo.course_category.name }}）
          </span> -->
        </st-t3>
        <div :class="b('tip')">
          <div class="item">
            <span class="label">开班时间:</span>
            <span class="value">{{ groupCourseInfo.course_time }}</span>
          </div>
          <div class="item">
            <span class="label ">报名人数:</span>
            <span class="value">{{ groupCourseInfo.apply_num }}人</span>
          </div>
        </div>
        <div :class="b('tip')">
          <div class="item">
            <span class="label">人数限制:</span>
            <span class="value">{{ groupCourseInfo.num_limit }}</span>
          </div>
          <div class="item">
            <span class="label ">适用范围:</span>
            <span
              class="value"
              :key="item.id"
              v-for="item in groupCourseInfo.scope_application"
            >
              {{ item.name }}
            </span>
          </div>
        </div>
        <div :class="b('tip')">
          <div class="item">
            <span class="label">负责人:</span>
            <span class="value">{{ groupCourseInfo.charge_person }}</span>
          </div>
          <div class="item">
            <span class="label ">总课时:</span>
            <span class="value">{{ groupCourseInfo.num_limit }}</span>
          </div>
        </div>
      </div>
      <div class="page-team-header__right" v-viewer="{ url: 'data-src' }">
        <img
          :src="image | imgFilter({ w: 560, h: 320, type: 'course' })"
          :data-src="image | imgFilter({ w: 1000, type: 'course' })"
          :alt="groupCourseInfo.course_name"
        />
      </div>
    </div>
    <st-panel app :class="bb()" :tabs="tabs"></st-panel>
  </st-panel-layout>
</template>
<script>
import {
  shopColumns,
  coachColumns,
  priceConfigColumns
} from './info#table.config'
import { InfoService } from './info.service'
export default {
  bem: {
    b: 'header',
    bb: 'body',
    bAdv: 'page-dashboard-adv'
  },
  name: 'TeamCourseInfo',
  serviceInject() {
    return {
      infoService: InfoService
    }
  },
  rxState() {
    return {
      groupCourseInfo: this.infoService.groupCourseInfo$
    }
  },
  computed: {
    coachColumns,
    image() {
      return this.groupCourseInfo.image.image_key
    }
  },
  data() {
    return {
      shopColumns,
      priceConfigColumns,
      tabs: [
        {
          label: '用户资料',
          route: {
            name: 'shop-member-info-basic'
          }
        },
        {
          label: '员工跟进',
          route: {
            name: 'shop-member-info-follow-history'
          }
        }
      ]
    }
  }
}
</script>
