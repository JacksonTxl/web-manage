<template>
  <div>
    <st-panel app>
    <p>
      <modal-link tag="a" :to="{ name: 'brand-switch' }">切换品牌</modal-link>
    </p>
    <p>
      <a href="javascript: void(0);" @click="switchShop">切换门店</a>
    </p>
  </st-panel>
  <a-drawer
    title="切换门店"
    placement="left"
    width="340"
    wrapClassName="drawer-switch-shop-wrap"
    :visible="isShowSwitchShop"
    @close="onCloseSwitchShop"
  >
    <div class="drawer-switch-shop">
      <section class="mg-l24 mg-r24">
        <a-input-search
          placeholder="搜索门店"
          @search="onSearchShop"
        />
      </section>
      <section class="mg-t24">
        <ul class="drawer-shops">
          <li class="drawer-shops__item cursor-pointer">
            <img class="drawer-shops__img" src="https://pic3-s.styd.cn/o_1d78oa7b917021g2v1ien1lsg1uguh.jpg?imageView2/1/w/128/h/128/interlace/1" alt="店招">
            <div>
              <div class="drawer-shops__name">门店名称</div>
              <div class="drawer-shops__address">门店地址</div>
              <div class="drawer-shops__tel">门店电话</div>
            </div>
          </li>
          <li class="drawer-shops__item cursor-pointer">
            <img class="drawer-shops__img" src="https://pic3-s.styd.cn/o_1d78oa7b917021g2v1ien1lsg1uguh.jpg?imageView2/1/w/128/h/128/interlace/1" alt="店招">
            <div>
              <div class="drawer-shops__name">门店名称</div>
              <div class="drawer-shops__address">门店地址</div>
              <div class="drawer-shops__tel">门店电话</div>
            </div>
          </li>
        </ul>
      </section>
      <section>
        <a class="drawer-switch-shop__to-brand st-link-secondary">返回品牌</a>
      </section>
    </div>
  </a-drawer>
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

export default {
  serviceInject() {
    return {
      themeService: ThemeService,
      messageService: MessageService,
      tlService: TlService,
      route: RouteService
    }
  },
  data() {
    return {
      isShowSwitchShop: false
    }
  },
  subscriptions() {
  },
  methods: {
    switchShop() {
      this.isShowSwitchShop = true
    },
    onCloseSwitchShop() {
      this.isShowSwitchShop = false
    },
    onSearchShop() {

    }
  }
}
</script>
