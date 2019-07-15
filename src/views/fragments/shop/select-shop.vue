<template>
  <div>
    <st-form-table>
      <thead>
        <tr>
          <th>省</th>
          <th>市</th>
          <th>区</th>
          <th>门店名称</th>
          <th v-if="!disabled">操作</th>
        </tr>
      </thead>
      <tbody v-if="list.length">
        <tr v-if="!disabled">
          <td :colspan="colspanNum" class="st-form-table__add">
            <st-button
              type="dashed"
              icon="add"
              block
              :v-modal-link="modalLink"
            >
              添加门店
            </st-button>
          </td>
        </tr>
        <tr
          v-for="(item, index) in list"
          :key="index"
        >
          <td>{{item.province}}</td>
          <td>{{item.city}}</td>
          <td>{{item.district}}</td>
          <td>{{item.shop_name}}</td>
          <td v-if="!disabled">
            <a
              @click="delShopTableRecord(item.shop_id)"
            >
              删除
            </a>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr v-if="!disabled">
          <td :colspan="colspanNum" class="st-form-table__add">
            <st-button
              type="dashed"
              icon="add"
              block
              :v-modal-link="modalLink"
            >
              添加门店
            </st-button>
          </td>
        </tr>
        <tr>
          <td :colspan="colspanNum">
            <st-no-data/>
          </td>
        </tr>
      </tbody>
    </st-form-table>
  </div>
</template>
<script>
import { SelectShopService } from './select-shop.service'

export default {
  name: 'SelectShop',
  serviceInject() {
    return {
      selectService: SelectShopService
    }
  },
  rxState() {
    return {
      loading: this.selectService.loading$
    }
  },
  props: {
    shopIds: {
      type: Array,
      default() {
        return []
      }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      checkedShopIds: [],
      list: []
    }
  },
  created() {
    this.checkedShopIds = this.shopIds
    this.getShops(this.shopIds)
  },
  computed: {
    colspanNum() {
      return this.disabled ? 4 : 5
    },
    modalLink() {
      return {
        name: 'shop-select',
        props: {
          checked: this.checkedShopIds
        },
        on: {
          change: this.onSelectShopComplete
        }
      }
    }
  },
  methods: {
    onSelectShopComplete(shopIds) {
      this.getShops(shopIds)
      this.checkedShopIds = shopIds
      this.$emit('change', shopIds)
    },
    getShops(shopIds = []) {
      if (!shopIds.length) {
        return
      }
      this.selectService.getShopBasic({
        shop_ids: shopIds
      }).subscribe(res => {
        this.list = res.shops
      })
    },
    delShopTableRecord(shopId) {
      const { list, checkedShopIds } = this
      list.forEach((item, index) => {
        if (item.shop_id === shopId) {
          list.splice(index, 1)
        }
      })
      checkedShopIds.forEach((item, index) => {
        if (item === +shopId) {
          checkedShopIds.splice(index, 1)
        }
      })
      this.list = list
      this.checkedShopIds = checkedShopIds
      this.$emit('change', checkedShopIds)
    }
  }
}
</script>
