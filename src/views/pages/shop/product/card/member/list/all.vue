<template>
  <div :class="all()">
    <div :class="all('search')">
      <router-link to="../add-select">
        <st-button type="primary" icon="add">新增会员卡</st-button>
      </router-link>
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
    @change="onPageChange"
    :pagination="{current:query.current_page,total:page.total_counts,pageSize:query.size}"
    rowKey="id"
    >
      <template slot="admission_range" slot-scope="text">
        <a>{{text.name}}</a>
      </template>
      <template slot="support_sales" slot-scope="text">
        <a>{{text.name}}</a>
      </template>
      <template slot="start_time" slot-scope="text, record">
        {{record.start_time}}&nbsp;~&nbsp;{{record.end_time}}
      </template>
      <template slot="price_setting" slot-scope="text">
        {{text.name}}
      </template>
      <template slot="price_gradient" slot-scope="text">
        {{`${text[0]}${text[1]?'-'+text[1]:''}`}}
      </template>
      <template slot="publish_channel" slot-scope="text">
        {{text.name}}
      </template>
      <template slot="sell_status" slot-scope="text">
        {{text.name}}
      </template>
      <div slot="action" slot-scope="text,record">
        <a @click="onDetail(record)">详情</a>
        <a-divider type="vertical"></a-divider>
        <st-more-dropdown class="mgl-16">
          <a-menu-item @click="onShelf(record)">上架</a-menu-item>
          <a-menu-item @click="onEdit(record)">编辑</a-menu-item>
          <a-menu-item @click="onStopSale(record)">停售</a-menu-item>
          <a-menu-item @click="onShelfDown(record)">下架</a-menu-item>
          <a-menu-item @click="onRecoverSale(record)">恢复售卖</a-menu-item>
          <a-menu-item @click="onDelete(record)">删除</a-menu-item>
        </st-more-dropdown>
      </div>
    </st-table>
  </div>
</template>
<script>
import { AllService } from './all.service'
import { RouteService } from '@/services/route.service'
import { UserService } from '@/services/user.service'
export default {
  name: 'PageShopProductMemberAll',
  bem: {
    all: 'page-shop-product-member-list-all'
  },
  serviceInject() {
    return {
      userService: UserService,
      routeService: RouteService,
      allService: AllService
    }
  },
  rxState() {
    return {
      list: this.allService.list$,
      page: this.allService.page$,
      memberCard: this.userService.memberCardEnums$,
      query: this.routeService.query$
    }
  },
  computed: {
    cardType() {
      let arr = [{ value: -1, label: '所有类型' }]
      Object.keys(this.memberCard.card_type.value).forEach(i => {
        arr.push({
          value: +i,
          label: this.memberCard.card_type.value[i]
        })
      })
      return arr
    },
    publishChannel() {
      let arr = [{ value: -1, label: '所有渠道' }]
      Object.keys(this.memberCard.publish_channel.value).forEach(i => {
        arr.push({
          value: +i,
          label: this.memberCard.publish_channel.value[i]
        })
      })
      return arr
    },
    shelfStatus() {
      let arr = [{ value: -1, label: '所有上架状态' }]
      Object.keys(this.memberCard.shelf_status.value).forEach(i => {
        arr.push({
          value: +i,
          label: this.memberCard.shelf_status.value[i]
        })
      })
      return arr
    },
    sellStatus() {
      let arr = [{ value: -1, label: '所有售卖状态' }]
      Object.keys(this.memberCard.sell_status.value).forEach(i => {
        arr.push({
          value: +i,
          label: this.memberCard.sell_status.value[i]
        })
      })
      return arr
    }
  },
  data() {
    return {
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
          dataIndex: 'price_setting',
          scopedSlots: { customRender: 'price_setting' }
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
          title: '上架状态',
          dataIndex: 'publish_channel1',
          scopedSlots: { customRender: 'publish_channel1' }
        },
        {
          title: '售卖状态',
          dataIndex: 'sell_status',
          scopedSlots: { customRender: 'sell_status' }
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
    onPageChange(data) {
      this.$router.push({ query: { ...this.query, page: data.current, size: data.pageSize }, force: true })
    },
    // 查看详情
    onDetail(record) {
      console.log(record)
    },
    // 上架
    onShelf(record) {
      console.log(record)
    },
    // 编辑
    onEdit(record) {
      console.log(record)
    },
    // 停售
    onStopSale(record) {
      console.log(record)
    },
    // 下架
    onShelfDown(record) {
      console.log(record)
    },
    // 恢复售卖
    onRecoverSale(record) {
      console.log(record)
    },
    // 删除
    onDelete(record) {
      console.log(record)
    }
  }
}
</script>
