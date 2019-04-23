<template>
  <a-drawer
    title="切换门店"
    placement="left"
    width="340"
    wrapClassName="drawer-switch-shop-wrap"
    :visible="true"
    @close="onClose"
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
          <li class="drawer-shops__item cursor-pointer" v-for="(shop, index) in shopList" :key="index"
            @click="onSwitchShop(shop.shop_id)">
            <img class="drawer-shops__img" :src="shop.image_url" alt="店招">
            <div>
              <div class="drawer-shops__name">{{shop.shop_name}}</div>
              <div class="drawer-shops__address">{{shop.address}}</div>
              <div class="drawer-shops__tel">123</div>
            </div>
          </li>
        </ul>
      </section>
      <section>
        <a class="drawer-switch-shop__to-brand st-link-secondary">返回品牌</a>
      </section>
    </div>
  </a-drawer>
</template>

<script>
import { MessageService } from '@/services/message.service'
import { SwitchShopService } from './switch.service'

export default {
  name: 'SwtichShopDrawer',
  serviceInject() {
    return {
      switchShopService: SwitchShopService
    }
  },
  data() {
    return {
      shopList: []
    }
  },
  created() {
    this.switchShopService.getShopList().subscribe(res => {
      this.shopList = res.shop_info
    })
  },
  methods: {
    onClose() {
      this.$emit('onClose')
    },
    onSearchShop() {

    },
    onSwitchShop(shop_id) {
      console.log('switch shop', shop_id)
      const params = {
        shop_id
      }
      this.switchShopService.switchShop(params).subscribe()
    }
  }
}
</script>
