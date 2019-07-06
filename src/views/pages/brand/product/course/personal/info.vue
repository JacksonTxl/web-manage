<template>
<div class="page-personal-course-info">
  <st-panel class=" mg-b16">
    <div class="page-personal-header">
        <div class="page-personal-header__left mg-r24">
          <st-t3 class="mg-b16">{{personalCourseInfo.course_name}}（{{personalCourseInfo.category_id.name || '暂无'}}）</st-t3>
          <div class="course-detail-item mg-b16">
            <div class="course-detail-item__left">
              <span class="label">
                <st-icon type="time" color="rgb(0,199,219)" class="mg-r8" size="16px"></st-icon>
                时长:
              </span>
              <span class="value">{{personalCourseInfo.duration}}分钟</span>
            </div>
            <div class="course-detail-item__right">
              <span class="label">
                <st-icon type="price" size="16px" class="mg-r8" color="rgb(255,169,45)"></st-icon>参考定价:</span>
                <span class="value">{{personalCourseInfo.price}}元/节</span>
            </div>
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
  </st-panel>
  <st-panel >
    <div class="page-personal-content">
      <div class="page-personal-content__item mg-b24">
        <div class="title mg-b8"><span class="label">上课门店:</span><span class="value">共{{personalCourseInfo.shops.length}}家门店</span></div>
        <st-container><st-table :columns="shopColumns" :dataSource="personalCourseInfo.shops"></st-table></st-container>
      </div>
      <div class="page-personal-content__item mg-b24">
        <div class="title mg-b8"><span class="label">上课教练:</span><span class="value">共3名教练</span></div>
        <st-container> <st-table :columns="coachColumns" :dataSource="personalCourseInfo.coaches"></st-table> </st-container>
      </div>
      <div class="page-personal-content__item">
        <div class="title mg-b8"><span class="label">售价设置:</span><span class="value">{{personalCourseInfo.price_setting | enumFilter('personal_course.price_setting')}}</span></div>
        <st-container v-if="personalCourseInfo.price_gradient.prices">
          <st-table :columns="priceConfigColumns" :dataSource="personalCourseInfo.price_gradient">
            <div slot="sale" slot-scope="sale, record">{{record.min_sale}} ~ {{record.max_sale}}</div>
            <div slot="transfer" slot-scope="sale, record">{{record.transfer_num}} {{record.transfer_unit === 1 ? "%":"元"}}</div>
          </st-table>

        </st-container>
        <div class="title mg-b8"><span class="label">售卖渠道:</span><span class="value">{{personalCourseInfo.sell_type | enumFilter('personal_course.sell_type')}}</span></div>
        <div class="title mg-b8"><span class="label">单节有效期:</span><span class="value">{{personalCourseInfo.effective_unit}}</span></div>
        <div class="title mg-b8"><span class="label">定价权限:</span><span class="value">{{personalCourseInfo.price_setting | enumFilter('personal_course.price_setting')}}</span></div>
        <div class="title mg-b8"><span class="label">单节售卖:</span><span class="value">{{personalCourseInfo.price_gradient[0].single_price}}</span></div>
      </div>
    </div>
  </st-panel>
</div>
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
