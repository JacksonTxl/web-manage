<template>
  <div app class="page-team-info">
    <div class="header mg-b24">
      <div :class="b('left')" class="mg-r24">
        <st-t3 class="mg-b16">
          {{ teamCourseInfo.course_name }}
          <span v-if="teamCourseInfo.course_category.name">
            （{{ teamCourseInfo.course_category.name }}）
          </span>
        </st-t3>

        <div :class="b('tip')">
          <div class="item">
            <st-icon
              type="time"
              color="rgb(0,199,219)"
              class="mg-r8"
              size="16px"
            ></st-icon>
            <span class="label mg-r8">时长:</span>
            <span class="value">{{ teamCourseInfo.duration }}分钟</span>
          </div>
          <div class="item">
            <st-icon
              type="money"
              size="16px"
              class="mg-r8"
              color="rgb(255,169,45)"
            ></st-icon>
            <span class="label  mg-r8">参考定价:</span>
            <span class="value">{{ teamCourseInfo.price }}元/节</span>
          </div>
          <div class="item">
            <st-icon
              type="strength"
              size="16px"
              class="mg-r8"
              color="rgb(255,169,45)"
            ></st-icon>
            <span class="label  mg-r8">课程强度:</span>
            <span class="value">
              <a-rate :defaultValue="teamCourseInfo.strength_level" disabled />
            </span>
          </div>
        </div>

        <div
          v-if="teamCourseInfo.description"
          :class="b('description')"
          class="mg-t16"
        >
          {{ teamCourseInfo.description }}
        </div>

        <div :class="b('train-aim')" class="mg-t16">
          #
          {{ teamCourseInfo.train_aim | filterTrainAim }}
        </div>
      </div>

      <div :class="b('right')">
        <img
          class="image"
          :src="image | imgFilter({ w: 280, h: 158, type: 'course' })"
          alt="课程图片"
        />
      </div>
    </div>
    <div :class="bb()">
      <div class="page-team-content__item mg-b24">
        <div class="title mg-b8">
          <span class="label">上课门店:</span>
          <span class="value">
            共{{ teamCourseInfo.support_shop_list.length }}家门店
          </span>
        </div>
        <st-container>
          <st-table
            rowKey="shop_id"
            :dataSource="teamCourseInfo.support_shop_list"
            :columns="shopColumns"
          ></st-table>
        </st-container>
      </div>
    </div>
  </div>
</template>
<script>
import {
  shopColumns,
  coachColumns,
  priceConfigColumns
} from './info#table.config'
import { InfoService } from './info.service'
import { AppConfig } from '@/constants/config'
export default {
  bem: {
    b: 'header',
    bb: 'body',
    bAdv: 'page-dashboard-adv'
  },
  name: 'TeamCourseInfo',
  serviceInject() {
    return {
      appConfig: AppConfig,
      infoService: InfoService
    }
  },
  rxState() {
    return {
      teamCourseInfo: this.infoService.teamCourseInfo$
    }
  },
  computed: {
    image() {
      return this.teamCourseInfo.image.image_key
    }
  },
  filters: {
    filterTrainAim(val) {
      return val
        .map(item => {
          return item.name
        })
        .join(' / ')
    }
  },
  data() {
    return {
      shopColumns,
      coachColumns,
      priceConfigColumns
    }
  }
}
</script>
