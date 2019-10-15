<template>
  <div :class="pComponents()">
    <div :class="pComponents('switch')">
      <span class="mg-r24">您是否需要收集参与者的必要信息</span>
      <st-switch v-model="isStep3"></st-switch>
    </div>
    <st-form-table class="mg-t24" v-if="isStep3">
      <thead>
        <tr>
          <th>报名项标题</th>
          <th>是否必填</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="!disabled">
          <td :colspan="colspanNum" class="st-form-table__add">
            <st-button
              type="dashed"
              icon="add"
              block
              v-modal-link="{
                name: 'marketing-add-signup',
                props: {
                  checked: checkedShopIds
                },
                on: {
                  submit: getTableItem
                }
              }"
            >
              添加
            </st-button>
          </td>
        </tr>
        <template v-if="dataSource.length">
          <tr v-for="(item, index) in dataSource" :key="index">
            <td>{{ item.extra_name }}</td>
            <td>{{ item.extra_require === 1 ? '必填' : '选填' }}</td>
            <td v-if="!disabled">
              <a @click="delShopTableRecord(item.shop_id)">
                删除
              </a>
            </td>
          </tr>
        </template>
        <template v-else>
          <tr>
            <td :colspan="colspanNum">
              <st-no-data />
            </td>
          </tr>
        </template>
      </tbody>
    </st-form-table>
    <div :class="pComponents('button-group')">
      <st-button class="mg-r8">
        存草稿
      </st-button>
      <st-button type="primary">
        发布
      </st-button>
    </div>
  </div>
</template>
<script>
// import { SelectShopService } from './select-shop.service'
import MarketingAddSignup from '@/views/biz-modals/marketing/add-signup'
export default {
  name: 'Step3Form',
  bem: {
    pComponents: 'step-form-signup'
  },
  modals: {
    MarketingAddSignup
  },
  // serviceInject() {
  //   return {
  //     selectService: SelectShopService
  //   }
  // },
  // rxState() {
  //   return {
  //     loading: this.selectService.loading$
  //   }
  // },
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
      dataSource: [],
      isStep3: false,
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
    }
  },
  methods: {
    getTableItem(item) {
      this.dataSource.push(item)
    },
    onSelectShopComplete(shopIds) {
      this.getShops(shopIds)
      this.checkedShopIds = shopIds
      this.$emit('change', shopIds)
    },
    getShops(shopIds = []) {
      if (!shopIds.length) {
        return
      }
      this.selectService
        .getShopBasic({
          shop_ids: shopIds
        })
        .subscribe(res => {
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
