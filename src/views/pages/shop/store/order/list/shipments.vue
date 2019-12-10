<template>
  <div :class="basic()">
    <st-input-search
      v-model="$searchQuery.card_name"
      v-di-view="{ name: SHOP_STORE_ORDER_KEYWORDS_SEARCH }"
      @search="onKeywordsSearch('card_name', $event)"
      placeholder="请输入订单编号、会员姓名或手机号查找"
      maxlength="50"
    />
    <st-table
      :page="1"
      :class="basic('table')"
      rowKey="id"
      :columns="columns"
      :dataSource="list"
    >
      <div slot="action">
        <st-table-actions>
          <a>
            签单
          </a>
        </st-table-actions>
      </div>
    </st-table>
  </div>
</template>
<script>
import tableMixin from '@/mixins/table.mixin'
import { columns } from './shipments.config'
import { SHOP_STORE_ORDER_KEYWORDS_SEARCH } from '@/constants/events'
export default {
  name: 'shipments',
  mixins: [tableMixin],
  bem: {
    basic: 'page-shop-store-order-shipments'
  },
  data() {
    return {
      SHOP_STORE_ORDER_KEYWORDS_SEARCH,
      name: '',
      list: [
        {
          key: '1',
          name: 'John Brown',
          age: 32,
          tel: '0571-22098909',
          phone: 18889898989,
          address: 'New York No. 1 Lake Park'
        },
        {
          key: '2',
          name: 'Jim Green',
          tel: '0571-22098333',
          phone: 18889898888,
          age: 42,
          address: 'London No. 1 Lake Park'
        },
        {
          key: '3',
          name: 'Joe Black',
          age: 32,
          tel: '0575-22098909',
          phone: 18900010002,
          address: 'Sidney No. 1 Lake Park'
        },
        {
          key: '4',
          name: 'Jim Red',
          age: 18,
          tel: '0575-22098909',
          phone: 18900010002,
          address: 'London No. 2 Lake Park'
        },
        {
          key: '5',
          name: 'Jake White',
          age: 18,
          tel: '0575-22098909',
          phone: 18900010002,
          address: 'Dublin No. 2 Lake Park'
        }
      ]
    }
  },
  mounted() {
    // console.log(this.list)
  },
  computed: {
    columns
  }
}
</script>
