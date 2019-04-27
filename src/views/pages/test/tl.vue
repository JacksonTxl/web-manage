<template>
  <div>
    <st-panel app>
      <p>
        <modal-link tag="a" :to="{ name: 'brand-switch' }">切换品牌</modal-link>
      </p>
      <p>
        <a href="javascript: void(0);" @click="switchShop">切换门店</a>
      </p>
      <select-shop :shopIds="shopIds" @change="onSelectShop"></select-shop>
      <p class="mg-t32">
        <router-link to="/brand/product/course/personal/add">添加品牌私教课</router-link>
        <router-link class="mg-l8" to="/shop/product/course/manage/personal/add">添加门店私教课</router-link>
      </p>
      <p class="mg-t8">
        <router-link to="/brand/product/course/team/add">添加品牌团体课</router-link>
        <router-link class="mg-l8" to="/shop/product/course/manage/team/add">添加门店团体课</router-link>
      </p>
      <p class="mg-t8">
        <router-link to="/brand/setting/app/course-category/list">课程类型设置</router-link>
        <router-link class="mg-l8" to="/brand/setting/app/coach-level/list">教练等级</router-link>
        <router-link class="mg-l8" to="/brand/setting/app/skillful/list">擅长项目</router-link>
        <router-link class="mg-l8" to="/brand/setting/app/training/list">训练目的</router-link>
      </p>
    </st-panel>
    <switch-shop v-if="isShowSwitchShop" @onClose="onCloseSwitchShop"></switch-shop>
  </div>
</template>

<script>
import { ThemeService } from '@/services/theme.service'
import { TlService } from '@/views/pages/test/tl.service'
import { RouteService } from '@/services/route.service'
import { MessageService } from '@/services/message.service'
import { Action } from 'rx-state'
import { switchMap, catchError, filter } from 'rxjs/operators'
import { EMPTY } from 'rxjs'
import SwitchShop from '@/views/fragments/shop/switch'

import SelectShop from '@/views/fragments/shop/select-shop'

export default {
  serviceInject() {
    return {
      themeService: ThemeService,
      messageService: MessageService,
      tlService: TlService,
      route: RouteService
    }
  },
  components: {
    SwitchShop,
    SelectShop
  },
  data() {
    return {
      isShowSwitchShop: false,
      shopIds: [1]
    }
  },
  methods: {
    switchShop() {
      this.isShowSwitchShop = true
    },
    onCloseSwitchShop() {
      this.isShowSwitchShop = false
    },
    onSearchShop() {

    },
    onSelectShop(shopIds) {
      console.log('your selected', shopIds)
    }
  }
}
</script>
