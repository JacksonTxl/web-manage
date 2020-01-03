<template>
  <div :class="b()">
    <div :class="banner()">
      <img
        :src="bannerInfo[0].image_url"
        alt=""
        @click="toLink(bannerInfo[0].redirect_url)"
      />
    </div>
    <div :class="list()">
      <div
        :class="[list('item'), { 'cursor-pointer': item.redirect_url !== '' }]"
        v-for="(item, index) in appList"
        :key="index"
        @click="toLink(item.redirect_url)"
      >
        <div :class="top()">
          <img :src="item.icon" :alt="item.app_name" />
        </div>
        <div :class="bottom()">
          <div :class="bottom('name')">
            {{ item.app_name }}
            <span v-if="item.title" :class="bottom('name-sub')">
              {{ `(${item.title})` }}
            </span>
          </div>
          <div :class="bottom('title')">{{ item.description }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { CenterService } from './center.service'
export default {
  name: 'BrandAppIndex',
  bem: {
    b: 'brand-app-index',
    banner: 'brand-app-index__banner',
    list: 'brand-app-index__list',
    top: 'brand-app-index__list__top',
    bottom: 'brand-app-index__list__bottom'
  },
  serviceInject() {
    return {
      centerService: CenterService
    }
  },
  rxState() {
    return {
      bannerInfo: this.centerService.banner$,
      appList: this.centerService.list$
    }
  },
  methods: {
    toLink(url) {
      if (url) {
        this.$router.push({
          name: url
        })
      }
    }
  }
}
</script>
