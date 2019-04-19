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
    </st-panel>
    <switch-shop-drawer v-if="isShowSwitchShop" @onClose="onCloseSwitchShop"></switch-shop-drawer >
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
import SwitchShopDrawer from '@/views/fragments/switch-shop-drawer'

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
    SwitchShopDrawer,
    SelectShop
  },
  data() {
    return {
      isShowSwitchShop: false,
      shopIds: [1]
    }
  },
  rxState() {
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
