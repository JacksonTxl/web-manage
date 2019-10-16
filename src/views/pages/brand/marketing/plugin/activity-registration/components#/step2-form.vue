<template>
  <div>
    <st-form-table>
      <thead>
        <tr>
          <th>票种名称</th>
          <th>价格（元）</th>
          <th>票数（张）</th>
          <th>购买用户</th>
          <th v-if="!disabled">操作</th>
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
                name: 'marketing-add-ticket',
                props: {
                  checked: checkedShopIds
                },
                on: {
                  submit: getTableItem
                }
              }"
            >
              添加票种
            </st-button>
          </td>
        </tr>
        <template v-if="dataSource.length">
          <tr v-for="(item, index) in dataSource" :key="index">
            <td>{{ item.ticket_name }}</td>
            <td>{{ item.ticket_price }}</td>
            <td>{{ item.ticket_total_num }}</td>
            <td>{{ item.crowd_name }}</td>
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
    <di-child name="step">
      <st-button @click="onClickAddTicketComplete">
        下一步
      </st-button>
    </di-child>
  </div>
</template>
<script>
// import { SelectShopService } from './select-shop.service'
import MarketingAddTicket from '@/views/biz-modals/marketing/add-ticket'
export default {
  name: 'ComponentsAddTicket',
  modals: {
    MarketingAddTicket
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
      formDataList: [],
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
      this.$emit('change', item)
    },
    getFormItem(form) {
      this.formDataList.push(form)
    },
    onClickAddTicketComplete() {
      this.$emit('step-submit', { formDataList: this.formDataList })
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
