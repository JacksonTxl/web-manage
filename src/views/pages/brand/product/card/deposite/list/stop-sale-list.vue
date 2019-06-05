<template>
  <div class="pages-brand-product-card-liet-stop-sale-list">
    <!-- <st-button type="primary">
      <a-icon type="plus"/>新增私教课程
    </st-button>-->
    <div style="overflow: hidden;">
      <modal-link
        tag="a"
        :to=" { name: 'card-all-lower-shelf',props:{a:selectedRows,flag:true}, on:{done: onModalTest } }"
        v-show="selectedRows.length >1"
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
      <!--  :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" 添加批量下架 -->
      <!-- 会员卡名称start -->
      <a
        slot="card_name"
        slot-scope="text,record"
        href="javascript:;"
        @click="memberFun(text,record)"
      >{{text}}</a>
      <!-- 会员卡名称end -->
      <span
        slot="num"
        slot-scope="text,record"
        href="javascript:;"
      >{{text}}{{record.unit === 1 ? '天':'月'}}</span>
      <span slot="sell_time" slot-scope="text,record">{{record.start_time}}~{{record.end_time}}</span>
      <!-- 支持入场门店start -->
      <a slot="consumption_range" slot-scope="text,record" href="javascript:;">
        <span v-if="text !=='0个场馆'">
          <modal-link
            tag="a"
            :to="{ name: 'card-sale-stop' , props:{a: record.id,title:'支持消费门店'}}"
          >{{text}}</modal-link>
        </span>
        <span v-else class="use_num">{{text}}</span>
      </a>
      <!-- 支持入场门店end -->
      <!-- start 发布渠道-->
      <span slot="publish_channel" slot-scope="text" href="javascript:;">{{text?'品牌':'门店'}}</span>
      <!-- end 发布渠道-->

      <!-- 操作end -->
      <div slot="action" slot-scope="text, record">
        <a href="javascript:;" @click="infoFunc(text, record)">详情</a>
        <a-divider type="vertical"></a-divider>
        <modal-link
          tag="a"
          :to=" { name: 'card-lower-shelf',props:{a:record,flag:true}, on:{done: onModalTest } }"
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
      cardsListInfo: this.bService.cardsListInfo$
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
        page: '',
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

      data: [
        {
          id: 1,
          brand_id: 1,
          shop_id: 1,
          card_name: '次卡',
          price_gradient: [20000, 40000],
          time_gradient: '100次~200次',
          card_type: {
            id: 1,
            name: '次卡'
          },
          publish_channel: {
            id: 1,
            name: '品牌'
          },
          admission_range: {
            id: 2,
            name: '多门店 (共3家)'
          },
          price_setting: {
            id: 1,
            name: '统一定价'
          },
          support_sales: {
            id: 2,
            name: '3个门店'
          },
          sell_status: {
            id: 1,
            name: '可售卖'
          },
          start_time: '1970-01-01',
          end_time: '1970-01-01',
          shelf_upper: 0,
          shelf_lower: 2
        }
      ],
      columns: [
        {
          title: '储值卡名称',
          dataIndex: 'card_name',
          scopedSlots: { customRender: 'shop_name' }
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
          title: '支持消费门店',
          dataIndex: 'consumption_range',
          scopedSlots: { customRender: 'consumption_range' }
        },
        {
          title: '发布渠道',
          dataIndex: 'publish_channel',
          scopedSlots: { customRender: 'publish_channel' }
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
      this.getHeaders.page = this.pagination.current
      this.getHeaders.size = this.pagination.pageSize

      this.data = data.list
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
      console.log(current, pageSize, '点击分页获取数据')
    },
    // 点击详情获取数据
    infoFunc(text, record) {
      console.log(text, record, '点击详情获取数据')
    },
    // 会员卡名称点击事件
    memberFun(text, record) {
      console.log(text, record, '会员卡名称点击事件')
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
      this.$router.push({ query: obj })

      this.bService.getListInfo(obj).subscribe(state => {
        self.getInfoData(state)
      })
    }
  },
  watch: {
    $route(data) {
      if (data.query.card_name) {
        this.card_type = '所以类型'
        this.publish_channel = '所有售卖状态'
      }
      this.getInfoData(this.cardsListInfo)
    }
  }
}
</script>
