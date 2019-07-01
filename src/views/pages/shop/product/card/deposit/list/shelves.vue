<template>
  <div :class="shelves()">
    <div :class="shelves('search')">
      <a-select
      style="width: 160px"
      v-model="query.publish_channel"
      @change="onSelect('publish_channel',$event)"
      >
        <a-select-option v-for="(item,index) in publishChannel" :key="index" :value="item.value">{{item.label}}</a-select-option>
      </a-select>
    </div>
    <st-table
    :columns="columns"
    :dataSource="list"
    @change="onPageChange"
    :pagination="{current:query.page,total:page.total_counts,pageSize:query.size}"
    rowKey="id"
    >
      <!-- 卡名称 -->
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
          :to="{ name: 'card-shop-deposit-shop-table' , props:{id: record.id,type:'Consume',title: '支持消费门店'}}"
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
  name: 'PageShopProductDepositShelves',
  bem: {
    shelves: 'page-shop-product-deposit-list-shelves'
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
      depositCard: this.userService.depositCardEnums$,
      list: this.shelvesService.list$,
      page: this.shelvesService.page$,
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
    }
  },
  data() {
    return {
      columns
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
      this.$router.push({
        path: `/shop/product/card/deposit/info`,
        query: { id: record.id }
      })
    },
    // 下架
    onShelfDown(record) {
      this.$confirm({
        title: '下架会员卡',
        content: `确定下架${record.card_name}储值卡吗？`,
        onOk: () => {
          return this.shelvesService.setCardShelfDown(record.id).toPromise().then(() => {
            this.$router.push({ force: true, query: this.query })
          })
        }
      })
    }

  }
}
</script>
