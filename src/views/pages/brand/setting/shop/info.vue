<template>
  <div :class="shopInfo()">
    <div :class="shopInfo('detail')">
      <div :class="shopInfo('picture')" v-viewer="{url: 'data-src'}" class="mg-r16 st-preview-item" >
        <img
            v-for="(item,index) in info.shop_images"
            :src="item.image_url | imgFilter({w:404,h:227})"
            :key="index"
            v-show="index===0"
            :data-src="item.image_url|imgFilter({ w: 1000 })"
            width="404"
            height="227"
            alt="店招"
          >
        <st-tag class="status-tag" :type="flagList[info.shop_status]"/>
        <p>
          <st-icon type="image-count"></st-icon>
          <span>{{info.shop_images.length}}</span>
        </p>
      </div>
      <div :class="shopInfo('info')">
        <st-t2 class="mg-b16">{{info.shop_name}}</st-t2>
        <st-info :isWeakenLabel="true" class="mg-b16">
          <st-info-item label="门店电话">{{info.shop_phones.join(',')}}</st-info-item>
          <st-info-item label="门店邮箱">{{info.email || '无'}}</st-info-item>
          <st-info-item label="门店地址">{{info.shop_position.address_detail}}
            <a class="mg-l12" @click="location">查看定位</a>
          </st-info-item>
        </st-info>
        <st-checkbox-facility-info :serviceList="serviceListComputed" />
      </div>
    </div>
    <div :class="shopInfo('time')" class="mg-t12">
      <st-t3 class="mg-b16">营业时间</st-t3>
      <st-shop-hour-picker :isInfo="true" v-model="info.business_time"></st-shop-hour-picker>
    </div>
  </div>
</template>
<script>
import { InfoService } from './info.service'
import { cloneDeep } from 'lodash-es'
export default {
  name: 'PageBrandSettingShopInfo',
  bem: {
    shopInfo: 'page-brand-setting-shop-info'
  },
  serviceInject() {
    return {
      infoService: InfoService
    }
  },
  rxState() {
    return {
      serviceList: this.infoService.serviceList$,
      info: this.infoService.info$
    }
  },
  computed: {
    serviceListComputed() {
      let array = cloneDeep(this.serviceList)
      array.forEach(i => {
        i.selected = this.info.shop_services.some(o => o.service_id === i.service_id)
      })
      return array
    }
  },
  data() {
    return {
      flagList: ['', 'shop-trial', 'shop-opening', 'shop-stop', 'shop-close', 'shop-holiday']
    }
  },
  methods: {
    // 查看定位
    location() {
      this.$modalRouter.push({
        name: 'shop-map-location',
        props: {
          // lat: '31.230350',
          // lng: '121.473720'
          lat: this.info.lat,
          lng: this.info.lng
        }
      })
    },
    // 编辑
    onEdit() {

    },
    // 设置放假
    onSet() {

    }
  }
}
</script>
