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
        <a @click="onDetail(record)">详情</a>
        <a-divider type="vertical"></a-divider>
        <a @click="onShelfDown(record)">下架</a>
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
  name: 'PageShopProductDepositeShelves',
  bem: {
    shelves: 'page-shop-product-deposite-list-shelves'
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
      depositeCard: this.userService.depositeCardEnums$,
      list: this.shelvesService.list$,
      page: this.shelvesService.page$,
      query: this.routeService.query$
    }
  },
  computed: {
    publishChannel() {
      let arr = [{ value: -1, label: '所有渠道' }]
      Object.keys(this.depositeCard.publish_channel.value).forEach(i => {
        arr.push({
          value: +i,
          label: this.depositeCard.publish_channel.value[i]
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
    // 查看详情
    onDetail(record) {
      this.$router.push({
        path: `/shop/product/card/deposite/info`,
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
