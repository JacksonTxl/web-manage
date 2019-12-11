<template>
  <div :class="basic()">
    <st-input-search
      v-model="$searchQuery.card_name"
      v-di-view="{ name: SHOP_STORE_ORDER_KEYWORDS_SEARCH }"
      @search="onKeywordsSearch('card_name', $event)"
      placeholder="请输入订单编号、会员姓名或手机号查找"
      maxlength="50"
    />
    <row-table
      :columns="columns"
      :listData="list"
      actionText="发货"
    ></row-table>
  </div>
</template>
<script>
import RowTable from '../components#/row-table.vue'
import { columns } from './shipments.config'
import { SHOP_STORE_ORDER_KEYWORDS_SEARCH } from '@/constants/events'
export default {
  name: 'shipments',
  components: {
    RowTable
  },
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
              name: 'aaaadsad的撒大建设靠大家阿里斯顿拉萨机了',
              num: 2,
              price: 12.04
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
