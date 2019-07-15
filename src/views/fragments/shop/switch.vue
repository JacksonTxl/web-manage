<template>
  <a-drawer
    title="切换门店"
    placement="left"
    width="340"
    wrapClassName="drawer-switch-shop-wrap"
    :visible="visible"
    @close="onClose"
  >
    <div class="drawer-switch-shop">
      <!-- <section class="mg-l24 mg-r24 drawer-switch-shop__header">
        <st-input-search
          placeholder="搜索门店"
          @search="onSearchShop"
        />
      </section> -->
      <section class="mg-t24 drawer-switch-shop__body">
        <a-spin :spinning="!!loading.switchShop">
          <ul class="drawer-shops">
            <li
              class="drawer-shops__item cursor-pointer"
              :class="{ current: currentShopId === shop.shop_id }"
              v-for="(shop, index) in shopList"
              :key="index"
              @click="onSwitchShop(shop)"
            >
              <img class="drawer-shops__img" :src="shop.image_url | imgFilter({ w: 128, h: 128 })" alt="店招" />
              <div>
                <div class="drawer-shops__name">{{shop.shop_name}}</div>
                <div class="drawer-shops__address">{{shop.address}}</div>
                <div class="drawer-shops__tel">123</div>
              </div>
            </li>
          </ul>
        </a-spin>
      </section>
      <section>
        <a class="drawer-switch-shop__to-brand st-link-secondary" @click="switchBackToBrand">返回品牌</a>
      </section>
    </div>
  </a-drawer>
</template>

<script>
import { MessageService } from '@/services/message.service'
import { SwitchService } from './switch.service'
import { UserService } from '@/services/user.service'

export default {
  name: 'SwtichShopDrawer',
  serviceProvider() {
    return [SwitchService]
  },
  serviceInject() {
    return {
      messageService: MessageService,
      switchService: SwitchService,
      userService: UserService
    }
  },
  rxState() {
    const { shopList$, loading$ } = this.switchService
    return {
      shopList: shopList$,
      loading: loading$,
      shop: this.userService.shop$
    }
  },
  data() {
    return {
      visible: false
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    value(val) {
      this.visible = val
    }
  },
  created() {
    this.switchService.getShopList().subscribe()
  },
  computed: {
    currentShopId() {
      return this.shop.id
    }
  },
  methods: {
    onClose() {
      this.visible = false
      this.$emit('input', false)
    },
    onSwitchShop(shop) {
      console.log('switch shop', shop.shop_id)
      const params = {
        shop_id: shop.shop_id
      }
      this.switchService
        .switchShop(params)
        .subscribe(this.onClose)
    },
    switchBackToBrand() {
      this.switchService
        .switchBackToBrand()
        .subscribe(this.onClose)
    }
  }
}
</script>
