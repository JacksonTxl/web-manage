<template>
  <div :class="shelves()">
    <div :class="shelves('search')">
      <st-button v-if="auth.batchDown" type="primary" :disabled="!selectedRowKeys.length" class="mg-b16" @click="onBatchShelfDown">批量下架</st-button>
      <div>
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
          showSearch
          placeholder="输入门店名称搜索"
          optionFilterProp="children"
          v-model="query.shop_id"
          @change="onSelect('shop_id',$event)"
          :filterOption="filterOption"
        >
          <a-select-option :value="-1">所有门店</a-select-option>
          <a-select-option v-for="(item,index) in shopList" :key="index" :value="item.id">{{item.shop_name}}</a-select-option>
        </a-select>
      </div>
    </div>
    <st-table
    :alertSelection="{onReset: onClear}"
    :rowSelection="{selectedRowKeys: selectedRowKeys,fixed:true, onChange: onSelectChange}"
    @change="onPageChange"
    :columns="columns"
    :dataSource="list"
    :pagination="{current:query.page,total:page.total_counts,pageSize:query.size}"
    rowKey="key"
    >
      <!-- 售卖门店 -->
      <template slot="shop_name" slot-scope="text">
        {{text}}
      </template>
      <!-- 会员卡名称 -->
      <template slot="card_name" slot-scope="text">
        {{text}}
      </template>
      <!-- 有效期 -->
      <template slot="num" slot-scope="text,record">
        {{text}}{{record.unit | enumFilter('deposit_card.unit')}}
      </template>
      <!-- 储值金额 -->
      <template slot="card_price" slot-scope="text">
        {{text}}
      </template>
       <!-- 售卖价格 -->
      <template slot="sell_price" slot-scope="text">
        {{text}}
      </template>
      <!-- 支持消费门店 -->
      <template slot="consumption_range" slot-scope="text,record">
        <modal-link
          v-if="text.id === 2"
          tag="a"
          :to="{ name: 'card-table-stop' , props:{id: record.id}}"
        >{{text.name}}</modal-link>
        <span v-else class="use_num">{{text.name}}</span>
      </template>
      <!-- 支持售卖时间 -->
      <template slot="sell_time" slot-scope="text,record">
        {{record.start_time}}&nbsp;~&nbsp;{{record.end_time}}
      </template>
      <!-- 发布渠道 -->
      <template slot="publish_channel" slot-scope="text">
        {{text.name}}
      </template>
      <div slot="action" slot-scope="text,record">
        <a v-if="record.auth['brand_shop:product:deposit_card|get']" @click="onDetail(record)">详情</a>
        <a-divider type="vertical"></a-divider>
        <a v-if="record.auth['brand_shop:product:deposit_card|down']" @click="onShelfDown(record)">下架</a>
      </div>
    </st-table>
  </div>
</template>
<script>
import { ShelvesService } from './shelves.service'
import { RouteService } from '@/services/route.service'
import { UserService } from '@/services/user.service'
import { columns } from './shelves.config'
export default {
  name: 'PageBrandProductDepositShelves',
  bem: {
    shelves: 'page-brand-product-deposit-list-shelves'
  },
  serviceInject() {
    return {
      userService: UserService,
      routeService: RouteService,
      shelvesService: ShelvesService
    }
  },
  rxState() {
    return {
      shopList: this.shelvesService.shopList$,
      cardList: this.shelvesService.list$,
      page: this.shelvesService.page$,
      depositCard: this.userService.depositCardEnums$,
      query: this.routeService.query$,
      auth: this.shelvesService.auth$
    }
  },
  computed: {
    publishChannel() {
      let arr = [{ value: -1, label: '所有渠道' }]
      Object.keys(this.depositCard.publish_channel.value).forEach(i => {
        arr.push({
          value: +i,
          label: this.depositCard.publish_channel.value[i]
        })
      })
      return arr
    },
    list() {
      let array = []
      this.cardList.forEach(i => {
        let key = parseInt(Math.random() * 999999).toString()
        array.push({ ...i, key: key })
      })
      return array
    }
  },
  data() {
    return {
      columns,
      selectedRowKeys: [],
      selectedRows: []
    }
  },
  methods: {
    onSelect(key, data) {
      this.$router.push({ query: { ...this.query, ...{ [key]: data } } })
    },
    // 门店下拉名称搜索
    filterOption(input, option) {
      return option.componentOptions.children[0].text.toLowerCase().includes(input)
    },
    onPageChange(data) {
      this.$router.push({ query: { ...this.query, page: data.current, size: data.pageSize } })
    },
    // 清空列表选择
    onClear() {
      this.selectedRowKeys = []
      this.selectedRows = []
    },
    // 列表选择
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    // 批量下架
    onBatchShelfDown() {
      let params = []
      this.selectedRows.forEach(i => {
        params.push({
          card_id: i.id,
          shop_id: i.shop_id
        })
      })
      this.$confirm({
        title: '批量下架',
        content: `确定下架所选的${this.selectedRowKeys.length}张会员卡吗？`,
        onOk: () => {
          return this.shelvesService.setCardShelfDown({ card_shop: params }).toPromise().then(() => {
            this.onClear()
            this.$router.push({ force: true, query: this.query })
          })
        }
      })
    },
    // 单个下架
    onShelfDown(record) {
      this.$confirm({
        title: '单个下架',
        content: `确定下架${record.card_name}会员卡吗？`,
        onOk: () => {
          return this.shelvesService.setCardShelfDown({ card_shop: [{ card_id: record.id, shop_id: record.shop_id }] }).toPromise().then(() => {
            this.$router.push({ force: true, query: this.query })
          })
        }
      })
    },
    // 查看详情
    onDetail(record) {
      this.$router.push({
        path: `/brand/product/card/deposit/info`,
        query: { id: record.id }
      })
    }
  }
}
</script>
