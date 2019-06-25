<template>
  <div :class="shelves()">
    <div :class="shelves('search')">
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
      v-model="query.publish_channel"
      @change="onSelect('publish_channel',$event)"
      >
        <a-select-option v-for="(item,index) in publishChannel" :key="index" :value="item.value">{{item.label}}</a-select-option>
      </a-select>
    </div>
    <st-table
    @change="onPageChange"
    :columns="columns"
    :dataSource="list"
    :pagination="{current:query.current_page,total:page.total_counts,pageSize:query.size}"
    rowKey="id"
    >
      <!-- 会员卡名称 -->
      <template slot="card_name" slot-scope="text">
        {{text}}
      </template>
      <!-- 类型 -->
      <template slot="card_type" slot-scope="text">
        {{text.name}}
      </template>
      <!-- 有效期/有效次数 -->
      <template slot="time_gradient" slot-scope="text">
        {{text}}
      </template>
      <!-- 支持入场范围 -->
      <template slot="admission_range" slot-scope="text,record">
        <modal-link
          v-if="text.id === 2"
          tag="a"
          :to="{ name: 'card-table-stop' , props:{id: record.id}}"
        >{{text.name}}</modal-link>
        <span v-else class="use_num">{{text.name}}</span>
      </template>
      <!-- 售卖时间 -->
      <template slot="sell_time" slot-scope="text, record">
        {{record.start_time}}&nbsp;~&nbsp;{{record.end_time}}
      </template>
      <!-- 售卖价格 -->
      <template slot="price_gradient" slot-scope="text">
        {{`${text[0]}${text[1]?'&nbsp;~&nbsp;'+text[1]:''}`}}
      </template>
      <!-- 发布渠道 -->
      <template slot="publish_channel" slot-scope="text">
        {{text.name}}
      </template>
      <!-- 操作 -->
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
  name: 'PageBrandProductMemberShelves',
  bem: {
    shelves: 'page-brand-product-member-list-shelves'
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
      list: this.shelvesService.list$,
      page: this.shelvesService.page$,
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
      this.$router.push({ query: { ...this.query, current_page: data.current, size: data.pageSize } })
    },
    // 下架
    onShelfDown(record) {
      this.$confirm({
        title: '下架会员卡',
        content: `确定下架${record.card_name}会员卡吗？`,
        onOk: () => {
          return this.shelvesService.setCardShelfDown(record.id).toPromise().then(() => {
            this.$router.push({ force: true, query: this.query })
          })
        }
      })
    },
    // 查看详情
    onDetail(record) {
      this.$router.push({
        path: `/shop/product/card/member/${this.cardTypeRouteList[record.card_type.id]}/info`,
        query: { id: record.id }
      })
    }
  }
}
</script>
