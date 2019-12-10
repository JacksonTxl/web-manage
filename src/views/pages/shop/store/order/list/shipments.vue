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
      <ul
        slot="childrens"
        slot-scope="customRender, record"
        :class="basic('sku')"
      >
        <li v-for="(item, index) in record.childrens" :key="index">
          {{ item.name }}
        </li>
      </ul>
      <div slot="action">
        <st-table-actions>
          <a>
            发货
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
    basic: 'page-order-shipments'
  },
  data() {
    return {
      SHOP_STORE_ORDER_KEYWORDS_SEARCH,
      name: '',
      list: [
        {
          childrens: [
            {
              name: 'aaaa'
            },
            {
              name: 'bbb'
            }
          ],
          ren: '胡歌',
          phone: '15635295211',
          adress: '北京',
          time: '2019'
        },
        {
          childrens: [
            {
              name: 'aaaa'
            },
            {
              name: 'bbb'
            },
            {
              name: 'ccc'
            }
          ],
          ren: '胡歌',
          phone: '15635295211',
          adress: '北京',
          time: '2019'
        },
        {
          childrens: [
            {
              name: 'aaaa'
            }
          ],
          ren: '胡歌',
          phone: '15635295211',
          adress: '北京',
          time: '2019'
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
