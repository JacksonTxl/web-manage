<template>
  <div :class="shelves()">
    <div :class="shelves('search')">
      <a-select
      style="width: 160px"
      class="mg-r8"
      v-model="query.card_type"
      @change="onCardTypeChange"
      >
        <a-select-option v-for="(item,index) in cardType" :key="index" :value="item.value">{{item.label}}</a-select-option>
      </a-select>
      <a-select
      style="width: 160px"
      v-model="query.publish_channel"
      @change="onPublishChannelChange"
      >
        <a-select-option v-for="(item,index) in publishChannel" :key="index" :value="item.value">{{item.label}}</a-select-option>
      </a-select>
    </div>
    <st-table
    :columns="columns"
    :dataSource="list"
    :pagination="{current:query.current_page,total:page.total_counts,pageSize:query.size}"
    rowKey="id"
    >

    </st-table>
  </div>
</template>
<script>
import { ShelvesService } from './shelves.service'
import { RouteService } from '@/services/route.service'
export default {
  name: 'PageShopProductMemberShelves',
  bem: {
    shelves: 'page-shop-product-member-list-shelves'
  },
  serviceInject() {
    return {
      routeService: RouteService,
      shelvesService: ShelvesService
    }
  },
  rxState() {
    return {
      list: this.shelvesService.list$,
      page: this.shelvesService.page$,
      query: this.routeService.query$
    }
  },
  data() {
    return {
      cardType: [{
        value: -1,
        label: '所有类型'
      }, {
        value: 2,
        label: '期限卡'
      }, {
        value: 1,
        label: '次卡'
      }],
      publishChannel: [{
        value: -1,
        label: '所有渠道'
      }, {
        value: 1,
        label: '品牌'
      }, {
        value: 2,
        label: '门店'
      }],
      columns: [
        {
          title: '会员卡名称',
          dataIndex: 'card_name',
          scopedSlots: { customRender: 'card_name' }
        },
        {
          title: '类型',
          dataIndex: 'card_type',
          scopedSlots: { customRender: 'card_type' }
        },
        {
          title: '有效期/有效次数',
          dataIndex: 'time_gradient',
          scopedSlots: { customRender: 'time_gradient' }
        },
        {
          title: '支持入场范围',
          dataIndex: 'admission_range',
          scopedSlots: { customRender: 'admission_range' }
        },
        {
          title: '售卖时间',
          dataIndex: 'start_time',
          scopedSlots: { customRender: 'start_time' }
        },
        {
          title: '售卖价格',
          dataIndex: 'price_gradient',
          scopedSlots: { customRender: 'price_gradient' }
        },
        {
          title: '发布渠道',
          dataIndex: 'publish_channel',
          scopedSlots: { customRender: 'publish_channel' }
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ]
    }
  },
  methods: {
    onCardTypeChange(data) {
      this.$router.push({ query: { ...this.query, ...{ card_type: data } } })
    },
    onPublishChannelChange(data) {
      this.$router.push({ query: { ...this.query, ...{ publish_channel: data } } })
    }
  }
}
</script>
