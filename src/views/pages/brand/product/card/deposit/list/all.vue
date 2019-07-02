<template>
  <div :class="all()">
    <div :class="all('search')">
      <router-link v-if="auth.add" to="../add">
        <st-button type="primary" icon="add">新增储值卡</st-button>
      </router-link>
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
      <!-- 支持售卖门店 -->
      <template slot="support_sales" slot-scope="text,record">
        <modal-link
          v-if="text.id === 2"
          tag="a"
          :to="{ name: 'card-brand-deposit-shop-table' , props:{id: record.id,type:'Sale',title:'支持售卖门店'}}"
        >{{text.name}}</modal-link>
        <span v-else class="use_num">{{text.name}}</span>
      </template>
      <!-- 支持消费门店 -->
      <template slot="consumption_range" slot-scope="text,record">
        <modal-link
          v-if="text.id === 2"
          tag="a"
          :to="{ name: 'card-brand-deposit-shop-table' , props:{id: record.id,type:'Consume',title: '支持消费门店'}}"
        >{{text.name}}</modal-link>
        <span v-else class="use_num">{{text.name}}</span>
      </template>
      <!-- 支持售卖时间 -->
      <template slot="sell_time" slot-scope="text,record">
        {{record.start_time}}&nbsp;~&nbsp;{{record.end_time}}
      </template>
      <!-- 上架门店数 -->
      <template slot="upper_shelf_num" slot-scope="text">
        {{text}}
      </template>
      <!-- 下架门店数 -->
      <template slot="lower_shelf_num" slot-scope="text">
        {{text}}
      </template>
      <!-- 发布渠道 -->
      <template slot="publish_channel" slot-scope="text">
        {{text.name}}
      </template>
      <!-- 售卖状态 -->
      <template slot="sell_status" slot-scope="text,record">
        <a-badge :status="text.id === 1?'success':'error'" />{{text.name}}
        <a-popover
          v-if="record.stop_sale"
          :title="`操作人:${record.stop_sale.operator_name}  操作时间:${record.stop_sale.stop_time}`"
          trigger="click"
          placement="bottomRight"
          :overlayStyle="{width:'336px'}"
        >
          <template slot="content">
            <p>{{record.stop_sale.stop_reason}}</p>
          </template>
          <a-icon type="exclamation-circle" v-if="text.id === 2"/>
        </a-popover>
      </template>
      <!-- 操作 -->
      <div slot="action" slot-scope="text,record">
        <a v-if="record.auth['brand_shop:product:deposit_card|get']" @click="onDetail(record)">详情</a>
        <a-divider type="vertical"></a-divider>
        <st-more-dropdown class="mgl-16">
          <a-menu-item v-if="record.auth['brand_shop:product:deposit_card|edit']" @click="onEdit(record)">编辑</a-menu-item>
          <a-menu-item v-if="record.auth['brand_shop:product:deposit_card|up']" @click="onShelf(record)">上架</a-menu-item>
          <a-menu-item v-if="record.auth['brand_shop:product:deposit_card|pause']" @click="onStopSale(record)">停售</a-menu-item>
          <a-menu-item v-if="record.auth['brand_shop:product:deposit_card|restore']" @click="onRecoverSale(record)">恢复售卖</a-menu-item>
          <a-menu-item v-if="record.auth['brand_shop:product:deposit_card|del']" @click="onDelete(record)">删除</a-menu-item>
        </st-more-dropdown>
      </div>
    </st-table>
  </div>
</template>
<script>
import { AllService } from './all.service'
import { RouteService } from '@/services/route.service'
import { UserService } from '@/services/user.service'
import { columns } from './all.config'
export default {
  name: 'PageBrandProductDepositAll',
  bem: {
    all: 'page-brand-product-deposit-list-all'
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
      depositCard: this.userService.depositCardEnums$,
      query: this.routeService.query$,
      auth: this.allService.auth$
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
    sellStatus() {
      let arr = [{ value: -1, label: '所有售卖状态' }]
      Object.keys(this.depositCard.sell_status.value).forEach(i => {
        arr.push({
          value: +i,
          label: this.depositCard.sell_status.value[i]
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
        path: `/brand/product/card/deposit/info`,
        query: { id: record.id }
      })
    },
    // 编辑
    onEdit(record) {
      this.$router.push({
        path: `/brand/product/card/deposit/edit`,
        query: { id: record.id }
      })
    },
    // 上架
    onShelf(record) {
      this.$confirm({
        title: '上架',
        content: `确认上架${record.card_name}储值卡？`,
        onOk: () => {
          return this.allService.setShelf(record.id).toPromise().then(() => {
            this.$router.push({ force: true, query: this.query })
          })
        }
      })
    },
    // 停售
    onStopSale(record) {
      this.$modalRouter.push({
        name: 'card-brand-deposit-stop-sale',
        props: {
          id: +record.id,
          cardName: record.card_name
        },
        on: {
          success: () => {
            this.$router.push({ query: this.query, force: true })
          }
        }
      })
    },
    // 恢复售卖
    onRecoverSale(record) {
      this.$modalRouter.push({
        name: 'card-brand-deposit-recover-sale',
        props: {
          id: record.id,
          time: { startTime: record.start_time, endTime: record.end_time },
          cardName: record.card_name
        },
        on: {
          success: () => {
            this.$router.push({ query: this.query, force: true })
          }
        }
      })
    },
    // 删除
    onDelete(record) {
      this.$confirm({
        title: '确认要删除',
        content: `确认删除${record.card_name}会员卡？`,
        onOk: () => {
          return this.allService.deleteCard(record.id).toPromise().then(() => {
            this.$router.push({ force: true, query: this.query })
          })
        }
      })
    }
  }
}
</script>
