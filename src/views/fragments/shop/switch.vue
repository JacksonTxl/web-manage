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
      <!-- <section class="mg-l24 mg-r24">
        <a-input-search
          placeholder="搜索门店"
          @search="onSearchShop"
        />
      </section> -->
      <section class="mg-t24">
        <ul class="drawer-shops">
          <li class="drawer-shops__item cursor-pointer" v-for="(shop, index) in shopList" :key="index"
            @click="onSwitchShop(shop)">
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
  serviceInject() {
    return {
      messageService: MessageService,
      switchService: SwitchService,
      userService: UserService
    }
  },
  data() {
    return {
      shopList: [],
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
    this.switchService.getShopList().subscribe(res => {
      this.shopList = res.shop_info
    })
  },
  methods: {
    onClose() {
      this.visible = false
      this.$emit('input', false)
    },
    onSearchShop() {},
    onSwitchShop(shop) {
      console.log('switch shop', shop.shop_id)
      const params = {
        shop_id: shop.shop_id
      }
      this.switchService.switchShop(params).subscribe(() => {
        this.onSwitchShopSuccess(shop)
      })
    },
    onSwitchShopSuccess(shop) {
      this.onSwitchSuccess(`切换到门店-${shop.shop_name}`)
    },
    switchBackToBrand() {
      this.switchService.switchBackToBrand().subscribe(this.onSwitchBackToBrandSuccess)
    },
    onSwitchBackToBrandSuccess() {
      this.onSwitchSuccess('已切换到品牌')
    },
    onSwitchSuccess(msg = '') {
      this.onClose()
      this.$router.push({
        path: '/'
      })
      this.userService.reload()
      this.messageService.success({
        content: msg
      })
    }
  }
}
</script>
