<template>
  <div class="pages-brand-product-card-list-member-list">
    <router-link to="../add" v-if="auth.isAdd">
      <st-button type="primary" icon="add">新增储值卡</st-button>
    </router-link>
    <div class="pages-brand-product-card-list-member-list__box">
      <a-select
        class="pages-brand-product-card-list-member-list__box-select"
        v-model="publish_channel"
        @change="handleChange_publish_channel"
      >
        <a-select-option value>所有渠道</a-select-option>
        <a-select-option value="1">品牌</a-select-option>
        <a-select-option value="2">门店</a-select-option>
      </a-select>
      <a-select
        class="pages-brand-product-card-list-member-list__box-select"
        @change="handleChange_sell_status"
        v-model="sell_status"
      >
        <a-select-option value>所有售卖状态</a-select-option>
        <a-select-option value="1">可售卖</a-select-option>
        <a-select-option value="2">不可售卖</a-select-option>
      </a-select>
    </div>
    <st-table
      rowKey="card_id"
      :columns="columns"
      :dataSource="data"
      :scroll="{ x: 1550}"
      @change="onChange"
      :pagination="pagination"
      @showSizeChange="onShowSizeChange"
    >
      <!-- 储值卡名称start -->
      <a
        slot="card_name"
        slot-scope="text,record"
        href="javascript:;"
        @click="memberFun(text,record)"
      >{{text}}</a>
      <!-- 储值卡名称end -->
      <span
        slot="num"
        slot-scope="text,record"
        href="javascript:;"
      >{{text}}{{record.unit === 1 ? '天':'月'}}</span>
      <span slot="sell_time" slot-scope="text,record">{{record.start_time}}~{{record.end_time}}</span>
      <span
        slot="price_gradient"
        slot-scope="text"
      >{{text.length > 1? `${text[0]}-${text[1]}`:`${text[0]}`}}</span>

      <!-- 支持售卖门店 -->
      <div slot="support_sales" slot-scope="text,record">
        <modal-link
          v-if="text !=='全部场馆'"
          tag="a"
          :to="{ name: 'card-table-stop', props:{a: record.card_id, title: '支持售卖门店'}}"
        >{{text}}</modal-link>
        <span v-else class="use_num">{{text}}</span>
      </div>

      <!-- 支持消费门店 -->
      <div slot="consumption_range" slot-scope="text,record">
        <modal-link
          v-if="text !=='单场馆'"
          tag="a"
          :to="{ name: 'card-sale-stop' , props:{a: record.card_id, title:'支持消费门店'}}"
        >{{text}}</modal-link>
        <span v-else class="use_num">{{text}}</span>
      </div>

      <!-- start 发布渠道-->
      <span slot="publish_channel" slot-scope="text" href="javascript:;">{{text=== 1?'品牌':'门店'}}</span>
      <!-- end 发布渠道-->
      <!-- 售卖状态start -->
      <a
        slot="sell_status"
        slot-scope="text,record"
        href="javascript:;"
        @click="sellStatus(text,record)"
      >
        <span
          v-if="record.shelf_status ==='可售'"
          class="pages-brand-product-card-list-member-list__marketable"
        ></span>
        <span v-else class="pages-brand-product-card-list-member-list__stopSell"></span>
        {{record.shelf_status}}
        <a-popover
          :title="popoverTitle"
          trigger="click"
          @click="popoverStopReason(text,record)"
          placement="bottomRight"
          :overlayStyle="{width:'336px'}"
        >
          <template slot="content">
            <p>{{popoverContent}}</p>
          </template>
          <a-icon type="exclamation-circle" v-if="record.shelf_status !=='可售'"/>
        </a-popover>
      </a>
      <!-- 操作 -->
      <div slot="action" slot-scope="text, record">
        <a href="javascript:;" v-if="record.auth['brand_shop:product:deposit_card|get']" @click="infoFunc(record)">详情</a>

        <a href="javascript:;" @click="infoFunc(text, record)" v-if="record.shelf_status !=='可售'">
          <modal-link
            tag="a"
            :to=" { name: 'card-recovery-sell', props:{a:record,time:{current_time:record.time},flag:true}, on:{done: onModalTest } }"
          >
            <a-divider type="vertical"></a-divider>恢复售卖
          </modal-link>
        </a>
        <a
          href="javascript:;"
          @click="upperShelf(text, record)"
          v-if="record.shelf_status==='可售' && record.upper_status"
        >
          <a-divider type="vertical"></a-divider>上架
        </a>
        <template v-if="record.shelf_status==='可售'">
          <a-divider type="vertical"></a-divider>
          <st-more-dropdown>
            <a-menu-item @click="onEdit(record)">编辑</a-menu-item>
            <a-menu-item>
              <modal-link
                tag="a"
                :to=" { name: 'card-halt-the-sales', props:{a:record.card_id,flag:true,time:[record.upper_shelf_num,record.lower_shelf_num]}, on:{done: onModalTest }}"
              >停售</modal-link>
            </a-menu-item>
            <a-menu-item>
              <modal-link
                v-if="record.upper_status && !record.publish_channel"
                tag="a"
                :to=" { name: 'card-confirm-del', props:{title: {title:record.card_name,id:record.card_id,flag:true}}, on:{del: onModalTest }}"
              >删除</modal-link>
            </a-menu-item>
          </st-more-dropdown>
        </template>
      </div>
      <!-- 操作end -->
    </st-table>
  </div>
</template>
<script>
import { MemberListService } from './member-list.service'
export default {
  serviceInject() {
    return {
      aService: MemberListService
    }
  },
  rxState() {
    return {
      cardsListInfo: this.aService.cardsListInfo$,
      auth: this.aService.auth$
    }
  },

  data() {
    return {
      popoverTitle: '',
      popoverContent: '',
      publish_channel: '所有渠道',
      sell_status: '所有售卖状态',
      getHeaders: {
        current_page: '',
        size: '',
        publish_channel: '',
        card_name: '',
        sell_status: ''
      },
      pagination: {
        pageSizeOptions: ['10', '20', '30', '40', '50'],
        current: 1,
        pageSize: 10,
        total: 50
      },
      data: [],
      columns: [
        {
          title: '储值卡名称',
          dataIndex: 'card_name',
          scopedSlots: { customRender: 'card_name' }
        },
        {
          title: '有效期',
          dataIndex: 'num',
          scopedSlots: { customRender: 'num' }
        },
        {
          title: '储值金额',
          dataIndex: 'card_price',
          sorter: (a, b) => a.card_price - b.card_price
        },
        {
          title: '售卖价格',
          dataIndex: 'sell_price',
          sorter: (a, b) => a.sell_price - b.sell_price
        },
        {
          title: '支持售卖门店',
          dataIndex: 'support_sales',
          scopedSlots: { customRender: 'support_sales' }
        },
        {
          title: '支持消费门店',
          dataIndex: 'consumption_range',
          scopedSlots: { customRender: 'consumption_range' }
        },
        {
          title: '支持售卖时间',
          dataIndex: 'sell_time'
        },
        {
          title: '上架门店数',
          dataIndex: 'upper_shelf_num',
          sorter: (a, b) => a.upper_shelf_num - b.upper_shelf_num
        },
        {
          title: '下架门店数',
          dataIndex: 'lower_shelf_num',
          sorter: (a, b) => a.lower_shelf_num - b.lower_shelf_num
        },
        {
          title: '发布渠道',
          dataIndex: 'publish_channel',
          scopedSlots: { customRender: 'publish_channel' }
        },

        {
          title: '售卖状态',
          dataIndex: 'sell_status',
          scopedSlots: { customRender: 'sell_status' }
        },
        {
          title: '操作',
          dataIndex: 'action',
          fixed: 'right',
          width: 140,
          scopedSlots: { customRender: 'action' }
        }
      ]
    }
  },
  mounted() {
    this.getInfoData(this.cardsListInfo)
  },
  created() {
    let self = this
    let query = self.$route.query
    this.sell_status = query.publish_channel
      ? query.publish_channel
      : '所有售卖状态'
    this.publish_channel = query.publish_channel
      ? query.publish_channel
      : '所有渠道'
  },
  methods: {
    onModalTest(data) {
      console.log('onModalTest')
      this.getListInfoFunc(true)
    },
    upperShelf(text, record) {
      let self = this
      this.$confirm({
        title: '确认要上架?',
        content: `确认上架${record.card_name}至${record.support_sales}?`,
        onOk() {
          let obj = {}
          // publish_channel 1 品牌 2 门店
          if (record.publish_channel === 1) {
            obj.card_id = record.card_id
          } else {
            obj.card_id = record.card_id
            obj.shop_id = record.shop_id
          }
          console.log(obj, record)
          self.aService.setCardsDepositBrandOnLine(obj).subscribe(state => {
            self.onModalTest()
          })
        },
        onCancel() {
          console.log('Cancel')
        }
      })
    },
    // 停售原因
    popoverStopReason(text, record) {
      let self = this
      self.popoverTitle = ''
      self.popoverContent = ''
      this.aService
        .getCardsBrandDepositStop({ card_id: record.card_id })
        .subscribe(state => {
          if (state.info.operate_time || state.info.staff_name) {
            self.popoverTitle = `操作人:${state.info.staff_name}   操作时间:${
              state.info.operate_time
            }`
          }
          self.popoverContent = state.info.reason
        })
    },
    getInfoData(data) {
      this.pagination = {
        pageSizeOptions: ['10', '20', '30', '40', '50'],
        current: data.page.current_page,
        pageSize: data.page.size,
        total: data.page.total_counts
      }
      this.getHeaders.page = this.pagination.current
      this.getHeaders.size = this.pagination.pageSize

      this.data = data.list
      this.data = JSON.parse(JSON.stringify(this.data))
    },
    onChange(pagination, filters, sorter) {
      this.getHeaders.page = pagination.current
      this.getHeaders.size = pagination.pageSize
      this.pagination.current = pagination.current
      this.pagination.pageSize = pagination.pageSize
      this.getListInfoFunc()
      console.log('params', pagination, filters, sorter)
    },
    // 点击分页获取数据
    onShowSizeChange(current, pageSize) {
      console.log(current, pageSize)
    },
    // 点击详情获取数据
    infoFunc(record) {
      const id = record.card_id
      this.routerHandler('brand-product-card-deposite-info', id)
    },
    onEdit(record) {
      const id = record.card_id
      this.routerHandler('brand-product-card-deposite-edit', id)
    },
    // 会员卡名称点击事件
    memberFun(text, record) {
      console.log(text, record, '会员卡名称点击事件')
    },
    routerHandler(name, id) {
      this.$router.push({
        name,
        query: {
          id
        }
      })
    },
    // 售卖状态
    sellStatus(text, record) {
      console.log(text, record)
    },

    // 发布渠道
    handleChange_publish_channel(value) {
      this.getHeaders.publish_channel = value
      this.getListInfoFunc()
    },
    // 售卖渠道
    handleChange_sell_status(value) {
      this.getHeaders.sell_status = value
      this.getListInfoFunc()
    },
    getListInfoFunc(falg) {
      let self = this
      let obj = {}
      Object.keys(self.getHeaders).map(item => {
        if (self.getHeaders[item] !== '') {
          obj[item] = self.getHeaders[item]
        }
      })
      this.$router.push({ query: obj })
      if (falg) {
        this.aService.getListInfo(obj).subscribe(state => {
          self.getInfoData(state)
        })
      }
    }
  },
  watch: {
    $route(data) {
      if (data.query.card_name) {
        this.sell_status = '所以渠道'
        this.publish_channel = '所有售卖状态'
      }
      this.getInfoData(this.cardsListInfo)
    }
  }
}
</script>
