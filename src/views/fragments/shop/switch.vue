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
      <section class="mg-l24 mg-r24 drawer-switch-shop__header">
        <st-input-search
          placeholder="搜索门店"
          v-model="keyword"
          @search="onSearch"
          @change="onChange"
        />
      </section>
      <section class="mg-t24 drawer-switch-shop__body">
        <a-spin :spinning="!!loading.switchShop">
          <ul class="drawer-shops" v-if="list.length">
            <li
              class="drawer-shops__item"
              :class="{ current: currentShopId === shop.shop_id }"
              v-for="(shop, index) in list"
              :key="index"
              @click="onSwitchShop(shop)"
            >
              <img
                class="drawer-shops__img"
                :src="shop.image_url | imgFilter({ w: 128, h: 128 })"
                alt="店招"
              />
              <div>
                <div class="drawer-shops__name">{{ shop.shop_name }}</div>
                <div class="drawer-shops__address">{{ shop.address }}</div>
                <div class="drawer-shops__tel">{{ shop.link_phone }}</div>
              </div>
            </li>
          </ul>
          <st-no-data text="空空如也~" v-else />
        </a-spin>
      </section>
      <section>
        <a
          class="drawer-switch-shop__to-brand st-link-secondary"
          @click="switchBackToBrand"
        >
          返回品牌
        </a>
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
      visible: false,
      keyword: '',
      list: []
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
      this.onSearch()
    }
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
      const params = {
        shop_id: shop.shop_id
      }
      this.switchService.switchShop(params).subscribe(this.onClose)
    },
    switchBackToBrand() {
      this.switchService.switchBackToBrand().subscribe(this.onClose)
    },
    onSearch() {
      let { shopList } = this
      const list = []
      shopList.forEach(item => {
        if (item.shop_name.includes(this.keyword)) {
          list.push(item)
        }
      })
      this.list = list
    },
    onChange() {
      this.onSearch(this.keyword)
    }
  }
}
</script>
