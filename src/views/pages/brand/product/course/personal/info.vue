<template>
  <st-panel app class="page-personal-info">
    <div class="page-personal-header">
        <div class="page-personal-header__left mg-r24">
          <st-t3 class="mg-b16">{{personalCourseInfo.course_name}}（{{personalCourseInfo.course_category.name || '暂无'}}）</st-t3>
          <div class="course-detail-item mg-b16">
            <div class="course-detail-item__left"><span class="label">时长:</span><span class="value">{{personalCourseInfo.duration}}分钟</span></div><div class="course-detail-item__right"><span class="label">参考定价:</span><span class="value">{{personalCourseInfo.price}}元/节</span></div>
          </div>
          <div class="course-detail-item__content mg-b16">
            {{personalCourseInfo.description}}
          </div>
          <div class="course-detail-item__tip mg-b24">
            # <span v-for="(item, index) in personalCourseInfo.train_aim" :key="item.id">{{item.name}} <i v-if="index === personalCourseInfo.train_aim.length-1"></i>/</span>
          </div>
        </div>
        <div class="page-personal-header__right">
          <img :src="personalCourseInfo.image.image_key" alt=""/>
        </div>
    </div>
    <div class="page-personal-content">
      <div class="page-personal-content__item mg-b24" v-if="personalCourseInfo.shops.length">
        <div class="title mg-b8"><span class="label">上课门店:</span><span class="value">共{{personalCourseInfo.shops.length}}家门店</span></div>
        <st-container><st-table :columns="shopColumns" :dataSource="personalCourseInfo.shops"></st-table></st-container>
      </div>
      <div class="page-personal-content__item mg-b24">
        <div class="title mg-b8"><span class="label">上课教练:</span><span class="value">共3名教练</span></div>
        <st-container> <st-table :columns="coachColumns" :dataSource="personalCourseInfo.coaches"></st-table> </st-container>
      </div>
      <div class="page-personal-content__item">
        <div class="title mg-b8"><span class="label">售价设置:</span><span class="value">门店定价</span></div>
        <st-container>
          <st-table :columns="priceConfigColumns" :dataSource="personalCourseInfo.price_gradient">
            <div slot="sale" slot-scope="sale, record">{{record.min_sale}} ~ {{record.max_sale}}</div>
            <div slot="transfer" slot-scope="sale, record">{{record.transfer_num}} {{record.transfer_unit === 1 ? "%":"元"}}</div>
          </st-table>
        </st-container>
      </div>
    </div>

  </st-panel>
</template>
<script>
import { shopColumns, coachColumns, priceConfigColumns } from './info#table.config'
import { InfoService } from './info.service'
export default {
  name: 'PersonalInfo',
  serviceInject() {
    return {
      infoService: InfoService
    }
  },
  rxState() {
    return {
      personalCourseInfo: this.infoService.personalCourseInfo$
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
