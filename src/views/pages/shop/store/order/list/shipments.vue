<template>
  <div :class="basic()">
    <portal to="SHOP_STORE_ORDER_KEYWORDS_SEARCH">
      <st-input-search
        v-model="$searchQuery.search_where"
        @search="onKeywordsSearch('search_where', $event)"
        placeholder="请输入订单编号、会员姓名或手机号查找"
        maxlength="50"
      />
    </portal>
    <row-table
      :columns="columns"
      :listData="list"
      actionText="发货"
      @clicks="sendGoods"
    ></row-table>
  </div>
</template>
<script>
import RowTable from '../components#/row-table.vue'
import { columns } from './shipments.config'
import { SHOP_STORE_ORDER_KEYWORDS_SEARCH } from '@/constants/events'
import { ShipmentsService } from './shipments.service'
import tableMixin from '@/mixins/table.mixin'
import StoreDeliverGood from '@/views/biz-modals/store/deliver-good'
export default {
  name: 'shipments',
  components: {
    RowTable
  },
  bem: {
    basic: 'page-order-shipments'
  },
  modals: {
    StoreDeliverGood
  },
  mixins: [tableMixin],
  serviceInject() {
    return { ShipmentsService: ShipmentsService }
  },
  rxState() {
    return {
      tableData: this.ShipmentsService.list$,
      page: this.ShipmentsService.page$,
      loading: this.ShipmentsService.loading$
    }
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
  methods: {
    sendGoods(val) {
      console.log(val)
      this.$modalRouter.push({
        name: 'store-deliver-good',
        props: {
          id: 1
        },
        on: {
          success: res => {
            this.$router.reload()
          }
        }
      })
    }
  },
  computed: {
    columns
  }
}
</script>
