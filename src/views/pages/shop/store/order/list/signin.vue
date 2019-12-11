<template>
  <div>
    <st-input-search
      v-model="$searchQuery.card_name"
      v-di-view="{ name: SHOP_STORE_ORDER_KEYWORDS_SEARCH }"
      @search="onKeywordsSearch('card_name', $event)"
      placeholder="请输入订单编号、会员姓名或手机号查找"
      maxlength="50"
    />
    <row-table :columns="columns" :listData="list"></row-table>
  </div>
</template>
<script>
import RowTable from '../components#/row-table.vue'
import { columns } from './signin.config'
import { SHOP_STORE_ORDER_KEYWORDS_SEARCH } from '@/constants/events'
export default {
  name: 'signin',
  components: {
    RowTable
  },
  computed: {
    columns
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
  }
}
</script>
