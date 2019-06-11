<template>
  <div class="pages-brand-product-card-liet-stop-sale-list">
    <!-- <st-button type="primary">
      <a-icon type="plus"/>新增私教课程
    </st-button>-->
    <div style="overflow: hidden;">
      <modal-link v-if="auth.isBatchDown"
        tag="a"
        :to=" { name: 'card-all-lower-shelf',props:{a:selectedRows,flag:true}, on:{done: onModalTest } }"
        v-show="selectedRows.length >= 1"
      >
        <st-button style="margin-left:24px" type="danger">批量下架</st-button>
      </modal-link>

      <div class="pages-brand-product-card-liet-stop-sale-list__box">
        <a-select
          class="pages-brand-product-card-liet-stop-sale-list__box-select"
          v-model="card_type"
          @change="handleChange_card_type"
        >
          <a-select-option value>所有类型</a-select-option>

          <a-select-option value="1">次卡</a-select-option>
          <a-select-option value="2">期限卡</a-select-option>
        </a-select>
        <a-select
          class="pages-brand-product-card-liet-stop-sale-list__box-select"
          v-model="publish_channel"
          @change="handleChange_publish_channel"
        >
          <a-select-option value>所有渠道</a-select-option>
          <a-select-option value="1">品牌</a-select-option>
          <a-select-option value="2">门店</a-select-option>
        </a-select>
        <a-select
          class="pages-brand-product-card-liet-stop-sale-list__box-select"
          @change="handleChange_sell_status"
          v-model="sell_status"
        >
          <a-select-option value>所有门店</a-select-option>
          <a-select-option value="lucy">Lucy</a-select-option>
          <a-select-option value="tom">Tom</a-select-option>
        </a-select>
      </div>
    </div>

    <st-table
      rowKey="id"
      :columns="columns"
      :dataSource="data"
      :scroll="{ x: 1300}"
      @change="onChange"
      :pagination="pagination"
      @showSizeChange="onShowSizeChange"
      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
    >
      <!-- 会员卡名称start -->
      <a
        slot="card_name"
        slot-scope="text,record"
        href="javascript:;"
        @click="memberFun(text,record)"
      >{{text}}</a>
      <!-- 会员卡名称end -->
      <!-- 支持入场门店start -->
      <a slot="admission_range.name" slot-scope="text" href="javascript:;">
        <span v-if="text !=='多门店 (共0家)'">
          <modal-link tag="a" :to="{ name: 'card-table-stop' , props:{a: 3}}">{{text}}</modal-link>
        </span>
        <span v-else class="use_num">{{text}}</span>
      </a>
      <!-- 支持入场门店end -->
      <!-- <a slot="shop_name" slot-scope="text,record" href="javascript:;">
        <span v-if="text !=='0个门店'">
          <modal-link tag="a" :to="{ name: 'card-sale-stop' , props:{a: record.id}}">{{text}}</modal-link>
        </span>
        <span v-else class="use_num">{{text}}</span>
      </a>-->
      <!-- 售卖门店 -->
      <!-- 售卖状态start -->
      <span slot="sell_time" slot-scope="text,record">{{record.start_time}}~{{record.end_time}}</span>
      <span
        slot="price_gradient"
        slot-scope="text"
      >{{text.length > 1? `${text[0]}-${text[1]}`:`${text[0]}`}}</span>

      <!-- 售卖状态end -->
      <!-- 操作end -->
      <div slot="action" slot-scope="text, record">
        <a href="javascript:;" v-if="record.auth['brand_shop:product:member_card|get']" @click="infoFunc(record)">详情</a>
        <a-divider type="vertical"></a-divider>
        <modal-link
          v-if="record.auth['brand_shop:product:member_card|down']"
          tag="a"
          :to=" { name: 'card-lower-shelf',props:{a:record}, on:{done: onModalTest } }"
        >下架</modal-link>
      </div>
      <!-- 操作end -->
    </st-table>
  </div>
</template>
<script>
import { StopSaleListService } from './stop-sale-list.service'
export default {
  serviceInject() {
    return {
      bService: StopSaleListService
    }
  },
  rxState() {
    return {
      cardsListInfo: this.bService.cardsListInfo$,
      auth: this.bService.auth$
    }
  },
  computed: {},
  data() {
    return {
      selectedRowKeys: [],
      selectedRows: [],
      card_type: '所以类型',
      publish_channel: '所以渠道',
      sell_status: '所有门店',
      getHeaders: {
        current_page: '',
        size: '',
        card_type: '',
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
          title: '售卖门店',
          dataIndex: 'shop_name',
          scopedSlots: { customRender: 'shop_name' }
        },
        {
          title: '会员卡名称',
          dataIndex: 'card_name'
          // scopedSlots: { customRender: 'card_name' }
        },
        {
          title: '类型',
          dataIndex: 'card_type.name',
          sorter: (a, b) => {
            let A = a.card_type.name
            let B = b.card_type.name
            if (A < B) {
              return -1
            }
            if (A > B) {
              return 1
            }
            return 0
          }
        },
        {
          title: '有效期/有效次数',
          dataIndex: 'time_gradient'
        },
        {
          title: '支持入场范围',
          dataIndex: 'admission_range.name',
          scopedSlots: { customRender: 'admission_range.name' }
        },
        {
          title: '售卖时间',
          dataIndex: 'sell_time',
          scopedSlots: { customRender: 'sell_time' }
        },
        {
          title: '售卖价格',
          dataIndex: 'price_gradient',
          scopedSlots: { customRender: 'price_gradient' }
        },
        {
          title: '发布渠道',
          dataIndex: 'publish_channel.name'
        },

        {
          title: '操作',
          dataIndex: 'action',
          fixed: 'right',
          width: 110,
          scopedSlots: { customRender: 'action' }
        }
      ]
    }
  },
  created() {
    this.getInfoData(this.cardsListInfo)
  },
  methods: {
    onSelectChange(selectedRowKeys, selectedRows) {
      console.log('selectedRowKeys changed: ', selectedRowKeys, selectedRows)
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    onModalTest(data) {
      console.log('onModalTest')
      this.getListInfoFunc()
    },
    getInfoData(data) {
      this.selectedRowKeys = []
      this.selectedRows = []
      this.pagination = {
        pageSizeOptions: ['10', '20', '30', '40', '50'],
        current: data.page.current_page,
        pageSize: data.page.size,
        total: data.page.total_counts
      }
      this.getHeaders.current_page = this.pagination.current
      this.getHeaders.size = this.pagination.pageSize

      this.data = data.list
    },
    onChange(pagination, filters, sorter) {
      this.getHeaders.current_page = pagination.current
      this.getHeaders.size = pagination.pageSize
      this.pagination.current = pagination.current
      this.pagination.pageSize = pagination.pageSize
      this.getListInfoFunc()
      console.log('params', pagination, filters, sorter)
    },
    // 点击分页获取数据
    onShowSizeChange(current, pageSize) {
      console.log(current, pageSize, '点击分页获取数据')
    },
    // 点击详情获取数据
    infoFunc(record) {
      const { id } = record
      const cardType = record.card_type.id
      const name = cardType.id === 1 ? 'brand-product-card-member-number-info'
        : 'brand-product-card-member-period-info'
      this.routerHandler(name, id)
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
      console.log(text, record, '售卖状态')
    },
    // 会员卡类型
    handleChange_card_type(value) {
      this.getHeaders.card_type = value
      this.getListInfoFunc()
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
    getListInfoFunc() {
      let self = this
      let obj = {}
      console.log(self.getHeaders)
      Object.keys(self.getHeaders).map(item => {
        if (self.getHeaders[item] !== '') {
          obj[item] = self.getHeaders[item]
        }
      })
      this.bService.getListInfo(obj).subscribe(state => {
        self.getInfoData(state)
      })
    }
  },
  watch: {
    $route() {
      this.card_type = '所以类型'
      this.publish_channel = '所以渠道'
      this.sell_status = '所有门店'
    }
  }
}
</script>
