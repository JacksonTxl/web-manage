<template>
  <div class="pages-brand-product-card-list-a">
    <st-button type="primary">
      <a-icon type="plus"/>新增私教课程
    </st-button>
    <div class="pages-brand-product-card-list-a-box">
      <a-select
        class="pages-brand-product-card-list-a-box-select"
        v-model="card_type"
        @change="handleChange_card_type"
      >
        <a-select-option value>所有类型</a-select-option>
        <a-select-option value="lucy">Lucy</a-select-option>
        <a-select-option value="tom">Tom</a-select-option>
      </a-select>
      <a-select
        defaultValue="所有渠道"
        class="pages-brand-product-card-list-a-box-select"
        v-model="publish_channel"
        @change="handleChange_publish_channel"
      >
        <a-select-option value>所有渠道</a-select-option>
        <a-select-option value="lucy">Lucy</a-select-option>
        <a-select-option value="tom">Tom</a-select-option>
      </a-select>
      <a-select
        class="pages-brand-product-card-list-a-box-select"
        @change="handleChange_sell_status"
        v-model="sell_status"
      >
        <a-select-option value>所有售卖状态</a-select-option>
        <a-select-option value="lucy">Lucy</a-select-option>
        <a-select-option value="tom">Tom</a-select-option>
      </a-select>
    </div>
    <st-table
      rowKey="id"
      :columns="columns"
      :dataSource="data"
      :scroll="{ x: 1500}"
      @change="onChange"
      :pagination="pagination"
      @showSizeChange="onShowSizeChange"
    >
      <!-- 会员卡名称start -->
      <a
        slot="card_name"
        slot-scope="text,record"
        href="javascript:;"
        @click="memberFun(text,record)"
      >{{text}}</a>
      <!-- 会员卡名称end -->
      <span slot="sell_time" slot-scope="text,record">{{record.start_time}}~{{record.end_time}}</span>
      <span
        slot="price_gradient"
        slot-scope="text"
      >{{text.length > 1? `${text[0]}-${text[1]}`:`${text[0]}`}}</span>

      <!-- 支持入场门店start -->
      <a slot="admission_range.name" slot-scope="text" href="javascript:;">
        <span v-if="text !=='多门店 (共0家)'">
          <modal-link tag="a" :to="{ name: 'card-table-stop' , props:{a: 3}}">{{text}}</modal-link>
        </span>
        <span v-else class="use_num">{{text}}</span>
      </a>

      <!-- 支持入场门店end -->
      <a slot="support_sales.name" slot-scope="text" href="javascript:;">
        <span v-if="text !=='0个门店'">
          <modal-link tag="a" :to="{ name: 'card-table-stop' , props:{a: 3}}">{{text}}</modal-link>
        </span>
        <span v-else class="use_num">{{text}}</span>
      </a>
      <!-- 售卖状态start -->
      <a
        slot="sell_status"
        slot-scope="text,record"
        href="javascript:;"
        @click="sellStatus(text,record)"
      >
        <span v-if="text.name ==='可售卖'" class="pages-brand-product-card-list-a-marketable"></span>
        <span v-if="text.name ==='停售'" class="pages-brand-product-card-list-a-stopSell"></span>
        {{text.name}}
        <a-popover
          title="操作人:AAA   操作时间:2018/10/10 23:59:59"
          trigger="click"
          placement="bottomRight"
          :overlayStyle="{width:'336px'}"
        >
          <template slot="content">
            <p>停售原因是不想停售原因是不想停售原因是不想停售原因是不想停售原因是不想</p>
          </template>
          <a-icon type="exclamation-circle" v-if="text.name ==='停售'"/>
        </a-popover>
      </a>
      <!-- 售卖状态end -->
      <!-- 操作end -->
      <div slot="action" slot-scope="text, record">
        <a href="javascript:;" @click="infoFunc(text, record)">详情</a>
        <a-divider type="vertical"></a-divider>
        <a href="javascript:;" v-if="record.sell_status.name === '可售卖'">
          <modal-link tag="a" :to="{ name: 'card-batch-shelves' }">上架</modal-link>
        </a>
        <a href="javascript:;" v-if="record.sell_status.name === '停售'">
          <modal-link tag="a" :to=" { name: 'card-recovery-sell' }">恢复售卖</modal-link>
        </a>
        <template v-if="record.sell_status.name === '可售卖'">
          <a-divider type="vertical"></a-divider>
          <st-more-dropdown>
            <a-menu-item>编辑</a-menu-item>
            <a-menu-item>
              <modal-link tag="a" :to=" { name: 'card-halt-the-sales', props:{a: 3} }">停售</modal-link>
            </a-menu-item>
            <a-menu-item>
              <modal-link
                tag="a"
                :to=" { name: 'card-confirm-del' }"
                v-if="record.shelf_upper || record.shelf_lower"
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
import { AService } from './a.service'
export default {
  serviceInject() {
    return {
      aService: AService
    }
  },
  subscriptions() {
    return {
      cardsListInfo: this.aService.cardsListInfo$
    }
  },
  data() {
    return {
      card_type: '所以类型',
      sell_status: '所以渠道',
      publish_channel: '所有售卖状态',
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
          title: '会员卡名称',
          dataIndex: 'card_name',
          scopedSlots: { customRender: 'card_name' }
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
          title: '支持入场门店',
          dataIndex: 'admission_range.name',
          scopedSlots: { customRender: 'admission_range.name' }
        },
        {
          title: '支持售卖时间',
          dataIndex: 'sell_time',
          scopedSlots: { customRender: 'sell_time' }
        },
        {
          title: '定价方式',
          dataIndex: 'price_setting.name'
        },
        {
          title: '售卖价格',
          dataIndex: 'price_gradient',
          scopedSlots: { customRender: 'price_gradient' },
          sorter: (a, b) => {
            let A = parseInt(a.price_gradient)
            let B = parseInt(b.price_gradient)
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
          title: '上架门店数',
          dataIndex: 'shelf_upper',
          sorter: (a, b) => {
            let A = a.shelf_upper
            let B = b.shelf_upper
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
          title: '下架门店数',
          dataIndex: 'shelf_lower',
          sorter: (a, b) => {
            let A = a.shelf_lower
            let B = b.shelf_lower
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
          title: '支持售卖门店',
          dataIndex: 'support_sales.name',
          scopedSlots: { customRender: 'support_sales.name' }
        },
        {
          title: '发布渠道',
          dataIndex: 'publish_channel.name'
        },
        {
          title: '售卖状态',
          dataIndex: 'sell_status',
          scopedSlots: { customRender: 'sell_status' }
        },
        // {
        //   title: 'Age',
        //   dataIndex: 'age',
        //   sorter: (a, b) => a.age - b.age
        // },
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
  methods: {
    getInfoData(data) {
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
      this.getListInfoFunc()
      console.log('params', pagination, filters, sorter)
    },
    // 点击分页获取数据
    onShowSizeChange(current, pageSize) {
      console.log(current, pageSize)
    },
    // 点击详情获取数据
    infoFunc(text, record) {
      console.log(text, record)
    },
    // 会员卡名称点击事件
    memberFun(text, record) {
      console.log(text, record, '会员卡名称点击事件')
    },
    // 售卖状态
    sellStatus(text, record) {
      console.log(text, record)
    },
    // 会员卡类型
    handleChange_card_type(value) {
      this.getHeaders.card_type = value
      this.getListInfoFunc()
    },
    // 发布渠道
    handleChange_publish_channel(value) {
      this.getHeaders.publish_channel = this.pagination.value
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
      Object.keys(self.getHeaders).map(item => {
        if (self.getHeaders[item] !== '') {
          obj[item] = self.getHeaders[item]
        }
      })
      this.aService.getListInfo(obj).subscribe(state => {
        self.cardsListInfo = state
      })
    }
  }
}
</script>
