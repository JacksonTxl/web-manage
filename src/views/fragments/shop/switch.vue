<template>
  <a-drawer
    placement="left"
    width="340"
    wrapClassName="drawer-switch-shop-wrap"
    :visible="visible"
    :closable="closable"
    @close="onClose"
  >
    <div class="drawer-switch-shop">
      <section class="header" :class="{ 'header--show': isShowShadow }">
        <div class="header__title">
          <st-t3>切换门店</st-t3>
          <st-button
            v-if="isShop"
            pill
            type="primary"
            icon="entry"
            @click="switchBackToBrand"
          >
            进入品牌
          </st-button>
        </div>
        <st-input-search
          placeholder="搜索门店"
          width="100%"
          v-model="keyword"
          @search="onSearch"
          @change="onChange"
        />
      </section>
      <section class="body">
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
    </div>
  </a-drawer>
</template>

<script>
import { fromEvent } from 'rxjs'
import { tap, debounceTime } from 'rxjs/operators'
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
      shop: this.userService.shop$,
      isShop: this.userService.isShop$
    }
  },
  data() {
    return {
      /**
       * Drawer 是否可见
       */
      visible: false,
      /**
       * 是否显示右上角的关闭按钮
       */
      closable: false,
      keyword: '',
      list: [],
      isShowShadow: false
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
        if (item.shop_name.toLowerCase().includes(this.keyword.toLowerCase())) {
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
