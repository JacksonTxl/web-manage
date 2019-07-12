<template>
<div class="page-personal-course-info">
  <st-panel class="mg-b16">
    <div class="page-personal-header">
        <div class="page-personal-header__left mg-r24">
          <st-t3 class="mg-b16">{{info.course_name}}（{{info.category_id.name || '暂无'}}）</st-t3>
          <div class="course-detail-item mg-b16">
            <div class="course-detail-item__left"><span class="label">
              <st-icon type="time" color="rgb(0,199,219)" class="mg-r8" size="16px"></st-icon>
              时长:</span><span class="value">{{info.duration}}分钟</span>
            </div>
          </div>
          <div class="course-detail-item__content mg-b16">
            {{info.description}}
          </div>
          <div class="course-detail-item__tip mg-b24">
            # <span v-for="(item, index) in info.train_aim" :key="item.id">{{item.name}}
              <i v-if="index === info.train_aim.length-1"></i>/</span>
          </div>
        </div>
        <div class="page-personal-header__right" v-viewer="{ url: 'data-src' }">
          <img
            :src="image | imgFilter({ w: 560, h: 320 })"
            :data-src="image | imgFilter({ w: 1000 })"
            :alt="info.course_name"
          />
        </div>
    </div>
  </st-panel>
  <st-panel >
    <div class="page-personal-content">
      <div class="page-personal-content__item mg-b24">
        <div class="title mg-b8"><span class="label">上课门店:</span>
        <span class="value">共{{info.shops.length}}家门店</span></div>
        <st-container>
          <st-table :columns="shopColumns" :dataSource="info.shops"></st-table>
        </st-container>
      </div>
      <div class="page-personal-content__item mg-b24">
        <div class="title mg-b8"><span class="label">上课教练:</span><span class="value">共{{info.coaches.length}}名教练</span></div>
        <st-container>
          <st-table :columns="coachColumns" :dataSource="info.coaches"></st-table>
        </st-container>
      </div>
      <div class="page-personal-content__item">
        <!-- <div class="title mg-b8"><span class="label">售价渠道:</span><span class="value">{{price_gradient}}</span></div>
        <div class="title mg-b8"><span class="label">单节有效期:</span><span class="value">{{price_gradient}}</span></div>
        <div class="title mg-b8"><span class="label">定价权限:</span><span class="value">{{price_gradient}}</span></div>
        <div class="title mg-b8"><span class="label">单节售卖:</span><span class="value">{{price_gradient.single_price}}</span></div>-->
        <div class="title mg-b8"><span class="label">售卖定价:</span><span class="value">{{info.price_setting | enumFilter('personal_course.price_setting')}}</span></div>
        <st-container>
          <st-table :columns="priceConfigColumns"  :dataSource="price_gradient">
            <div slot="min_sell_price" slot-scope="min_sell_price, record">{{record.min_sell_price}} ~ {{record.max_sell_price}}</div>
            <div slot="min_sell" slot-scope="min_sell, record">{{record.min_sale}} ~ {{record.max_sale}}</div>
            <div slot="transfer_num" slot-scope="transfer_num, record">{{record.transfer_num}} {{record.transfer_unit === 1 ? "%":"元"}}</div>
          </st-table>

        </st-container>
      </div>
    </div>
  </st-panel>
</div>
</template>
<script>
import { shopColumns, coachColumns, priceConfigColumns } from './info#table.config'
import { InfoService } from './info.service'
import { imgFilter } from '@/filters/resource.filters'
import { AppConfig } from '@/constants/config'
export default {
  name: 'PersonalInfo',
  serviceInject() {
    return {
      infoService: InfoService,
      appConfig: AppConfig
    }
  },
  rxState() {
    return {
      info: this.infoService.info$
    }
  },
  computed: {
    price_gradient() {
      const arr = []
      this.info.price_gradient.forEach(item => {
        item.prices.forEach(ele => {
          arr.push(ele)
        })
      })
      return arr
    },
    image() {
      return this.info.image.image_key || this.appConfig.PLACEHOLDER_IMG.NODATA
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
