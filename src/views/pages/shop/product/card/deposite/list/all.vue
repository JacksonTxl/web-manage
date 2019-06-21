<template>
  <div :class="all()">
    <div :class="all('search')">
      <st-button type="primary" @click="onAddCard" icon="add">新增储值卡</st-button>
      <div>
        <a-select
        style="width: 160px"
        class="mg-r8"
        v-model="query.card_type"
        @change="onSelect('card_type',$event)"
        >
          <a-select-option v-for="(item,index) in cardType" :key="index" :value="item.value">{{item.label}}</a-select-option>
        </a-select>
        <a-select
        style="width: 160px"
        class="mg-r8"
        v-model="query.publish_channel"
        @change="onSelect('publish_channel',$event)"
        >
          <a-select-option v-for="(item,index) in publishChannel" :key="index" :value="item.value">{{item.label}}</a-select-option>
        </a-select>
        <a-select
        style="width: 160px"
        class="mg-r8"
        v-model="query.shelf_status"
        @change="onSelect('shelf_status',$event)"
        >
          <a-select-option v-for="(item,index) in shelfStatus" :key="index" :value="item.value">{{item.label}}</a-select-option>
        </a-select>
        <a-select
        style="width: 160px"
        v-model="query.sell_status"
        @change="onSelect('sell_status',$event)"
        >
          <a-select-option v-for="(item,index) in sellStatus" :key="index" :value="item.value">{{item.label}}</a-select-option>
        </a-select>
      </div>
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
import { AllService } from './all.service'
import { RouteService } from '@/services/route.service'
export default {
  name: 'PageShopProductMemberAll',
  bem: {
    all: 'page-shop-product-member-list-all'
  },
  serviceInject() {
    return {
      routeService: RouteService,
      allService: AllService
    }
  },
  rxState() {
    return {
      list: this.allService.list$,
      page: this.allService.page$,
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
      shelfStatus: [{
        value: -1,
        label: '所有上架状态'
      }, {
        value: 2,
        label: '已上架'
      }, {
        value: 1,
        label: '已下架'
      }, {
        value: 3,
        label: '未上架'
      }],
      sellStatus: [{
        value: -1,
        label: '所有售卖状态'
      }, {
        value: 1,
        label: '可售卖'
      }, {
        value: 2,
        label: '不可售卖'
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
          title: '支持入场门店',
          dataIndex: 'admission_range',
          scopedSlots: { customRender: 'admission_range' }
        },
        {
          title: '支持售卖门店',
          dataIndex: 'support_sales',
          scopedSlots: { customRender: 'support_sales' }
        },
        {
          title: '支持售卖时间',
          dataIndex: 'start_time',
          scopedSlots: { customRender: 'start_time' }
        },
        {
          title: '定价方式',
          dataIndex: 'price_gradient',
          scopedSlots: { customRender: 'price_gradient' }
        },
        {
          title: '售卖价格',
          dataIndex: 'bbb',
          scopedSlots: { customRender: 'bbb' }
        },
        {
          title: '发布渠道',
          dataIndex: 'aaa',
          scopedSlots: { customRender: 'aaa' }
        },
        {
          title: '上架状态',
          dataIndex: 'publish_channel',
          scopedSlots: { customRender: 'publish_channel' }
        },
        {
          title: '售卖状态',
          dataIndex: 'ccc',
          scopedSlots: { customRender: 'ccc' }
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
    onSelect(key, data) {
      this.$router.push({ query: { ...this.query, ...{ [key]: data } } })
    },
    // 新增储值卡
    onAddCard() {
      this.$router.push({
        path: '/shop/product/card/deposite/add'
      })
    }
  }
}
</script>
