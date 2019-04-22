<template>
  <st-panel app class="page-personal-info">
    <div class="page-personal-header">
      {{teamCourseInfo}}
        <div class="page-personal-header__left mg-r24">
          <st-t3 class="mg-b16">{{teamCourseInfo.course_name}}（{{teamCourseInfo.course_category_name}}）</st-t3>
          <div class="course-detail-item mg-b16">
            <div class="course-detail-item__left"><span class="label">时长:</span><span class="value">{{teamCourseInfo.duration}}分钟</span></div><div class="course-detail-item__right"><span class="label">参考定价:</span><span class="value">{{teamCourseInfo.price}}元/节</span></div>
          </div>
          <div class="course-detail-item__content mg-b16">
            {{teamCourseInfo.description}}
          </div>
          <div class="course-detail-item__tip mg-b24">
            # {{teamCourseInfo.description}} / {{teamCourseInfo.description}}
          </div>
        </div>
        <div class="page-personal-header__right">
          <img src="" alt="">
        </div>
    </div>
    <div class="page-personal-content">
      <div class="page-personal-content__item mg-b24">
        <div class="title mg-b8"><span class="label">上课门店:</span><span class="value">共3家门店</span></div>
        <st-container><st-table :columns="shopColumns"></st-table></st-container>
      </div>
      <div class="page-personal-content__item mg-b24">
        <div class="title mg-b8"><span class="label">上课教练:</span><span class="value">共3名教练</span></div>
        <st-container> <st-table :columns="coachColumns"></st-table> </st-container>
      </div>
      <div class="page-personal-content__item">
        <div class="title mg-b8"><span class="label">售价设置:</span><span class="value">门店定价</span></div>
        <st-container>  <st-table :columns="priceConfigColumns"></st-table></st-container>
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
  methods: {
  }
}
</script>
