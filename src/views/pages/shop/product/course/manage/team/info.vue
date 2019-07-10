<template>
  <st-panel app class="page-personal-info">
    <div class="page-personal-header">
        <div class="page-personal-header__left mg-r24">
          <st-t3 class="mg-b16">{{teamCourseInfo.course_name}}（{{teamCourseInfo.course_category.name}}）</st-t3>
          <div class="course-detail-item mg-b16">
            <div class="course-detail-item__left"><st-icon type="time" color="rgb(0,199,219)" class="mg-r8" size="16px"></st-icon><span class="label">时长:</span><span class="value">{{teamCourseInfo.duration}}分钟</span></div>
            <div class="course-detail-item__right"><st-icon type="price" size="16px" class="mg-r8" color="rgb(255,169,45)"></st-icon><span class="label">参考定价:</span><span class="value">{{teamCourseInfo.price}}元/节</span></div>
          </div>
          <div class="course-detail-item__content mg-b16">
            {{teamCourseInfo.description}}
          </div>
          <div class="course-detail-item__tip mg-b24">
            # {{teamCourseInfo.train_aim | trainAimFilter}}
          </div>
        </div>
        <div class="page-personal-header__right">
          <img :src="teamCourseInfo.image.image_key" alt="">
        </div>
    </div>
    <div class="page-personal-content" v-if="teamCourseInfo.support_shop_list.length">
      <div class="page-personal-content__item mg-b24">
        <div class="title mg-b8"><span class="label">上课门店:</span><span class="value">共{{teamCourseInfo.support_shop_list.length}}家门店</span></div>
        <st-container><st-table :columns="shopColumns"></st-table></st-container>
      </div>
    </div>

  </st-panel>
</template>
<script>
import { shopColumns, coachColumns, priceConfigColumns } from './info#table.config'
import { InfoService } from './info.service'
export default {
  name: 'TeamCourseInfo',
  serviceInject() {
    return {
      infoService: InfoService
    }
  },
  rxState() {
    console.log('this.infoService', this.infoService)
    return {
      teamCourseInfo: this.infoService.teamCourseInfo$
    }
  },
  data() {
    return {
      shopColumns,
      coachColumns,
      priceConfigColumns
    }
  },
  filters: {
    trainAimFilter(val) {
      return val.join('/')
    }
  },
  methods: {
  }
}
</script>
