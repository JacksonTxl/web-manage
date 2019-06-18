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
          <a-select-option :value="-1">所有类型</a-select-option>
          <a-select-option v-for="(item,index) in cardType" :key="index" :value="item.value">{{item.label}}</a-select-option>
        </a-select>
        <a-select
        style="width: 160px"
        class="mg-r8"
        v-model="query.publish_channel"
        @change="onSelect('publish_channel',$event)"
        >
          <a-select-option :value="-1">所有渠道</a-select-option>
          <a-select-option v-for="(item,index) in publishChannel" :key="index" :value="item.value">{{item.label}}</a-select-option>
        </a-select>
        <a-select
        style="width: 160px"
        v-model="query.sell_status"
        @change="onSelect('sell_status',$event)"
        >
          <a-select-option :value="-1">所有售卖状态</a-select-option>
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
import { UserService } from '@/services/user.service'
import { cloneDeep } from 'lodash-es'
export default {
  name: 'PageBrandProductMemberAll',
  bem: {
    all: 'page-brand-product-member-list-all'
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
      query: this.routeService.query$,
      member_card: this.userService.memberCardEnums$
    }
  },
  computed: {
    // 卡类型
    cardType() {
      let sell_type = cloneDeep(Object.entries(this.member_card.card_type.value))
      let arr = []
      sell_type.forEach(i => {
        arr.push({
          value: +i[0],
          label: i[1]
        })
      })
      return arr
    },
    // 渠道
    publishChannel() {
      let sell_type = cloneDeep(Object.entries(this.member_card.publish_channel.value))
      let arr = []
      sell_type.forEach(i => {
        arr.push({
          value: +i[0],
          label: i[1]
        })
      })
      return arr
    },
    // 售卖状态
    sellStatus() {
      let sell_type = cloneDeep(Object.entries(this.member_card.sell_status.value))
      let arr = []
      sell_type.forEach(i => {
        arr.push({
          value: +i[0],
          label: i[1]
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
          dataIndex: 'price_gradient',
          scopedSlots: { customRender: 'price_gradient' }
        },
        {
          title: '售卖价格',
          dataIndex: 'bbb',
          scopedSlots: { customRender: 'bbb' }
        },
        {
          title: '上架门店数',
          dataIndex: '111a',
          scopedSlots: { customRender: '111a' }
        },
        {
          title: '下架门店数',
          dataIndex: 'aaa',
          scopedSlots: { customRender: 'aaa' }
        },
        {
          title: '发布渠道',
          dataIndex: '11b',
          scopedSlots: { customRender: '11b' }
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
    }
  }
}
</script>
