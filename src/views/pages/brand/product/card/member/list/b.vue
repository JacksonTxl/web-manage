<template>
  <div class="pages-brand-product-card-list-b">
    <st-button type="primary">
      <a-icon type="plus"/>新增私教课程
    </st-button>
    <div class="pages-brand-product-card-list-b-box">
      <a-select
        defaultValue="所有类型"
        class="pages-brand-product-card-list-b-box-select"
        @change="handleChange"
      >
        <a-select-option value="所有类型">所有类型</a-select-option>
        <a-select-option value="lucy">Lucy</a-select-option>
        <a-select-option value="tom">Tom</a-select-option>
      </a-select>
      <a-select
        defaultValue="所有渠道"
        class="pages-brand-product-card-list-b-box-select"
        @change="handleChange"
      >
        <a-select-option value="所有渠道">所有渠道</a-select-option>
        <a-select-option value="lucy">Lucy</a-select-option>
        <a-select-option value="tom">Tom</a-select-option>
      </a-select>
      <a-select
        defaultValue="所有售卖状态"
        class="pages-brand-product-card-list-b-box-select"
        @change="handleChange"
      >
        <a-select-option value="所有售卖状态">所有售卖状态</a-select-option>
        <a-select-option value="lucy">Lucy</a-select-option>
        <a-select-option value="tom">Tom</a-select-option>
      </a-select>
    </div>
    <st-table
      rowKey="id"
      :columns="columns"
      :dataSource="data"
      :scroll="{ x: 1300}"
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
      <!-- 支持入场门店start -->
      <a slot="use_num" slot-scope="text,record" href="javascript:;">
        <a-popover
          placement="bottomRight"
          trigger="click"
          :overlayStyle="{width:'520px'}"
          v-if="record.use_num >0"
        >
          <template slot="content">
            <a-table
              bordered
              :dataSource="record.use_shop_list"
              :columns="record.columns1"
              :pagination="false"
              rowKey="shop_id"
            ></a-table>
          </template>
          多店（共{{text}}门店）
        </a-popover>
        <span v-else class="use_num">{{text}}</span>
      </a>

      <!-- 支持入场门店end -->
      <!-- 售卖状态start -->
      <a
        slot="sell_status"
        slot-scope="text,record"
        href="javascript:;"
        @click="sellStatus(text,record)"
      >
        <span v-if="text ==='可售卖'" class="pages-brand-product-card-list-b-marketable"></span>
        <span v-if="text ==='停售'" class="pages-brand-product-card-list-b-stopSell"></span>
        {{text}}
        <a-popover
          title="操作人:AAA   操作时间:2018/10/10 23:59:59"
          trigger="click"
          placement="bottomRight"
          :overlayStyle="{width:'336px'}"
        >
          <template slot="content">
            <p>停售原因是不想停售原因是不想停售原因是不想停售原因是不想停售原因是不想</p>
          </template>
          <a-icon type="exclamation-circle" v-if="text ==='停售'"/>
        </a-popover>
      </a>
      <!-- 售卖状态end -->
      <!-- 操作end -->
      <div slot="action" slot-scope="text, record">
        <a href="javascript:;" @click="infoFunc(text, record)">详情</a>
        <a-divider type="vertical"></a-divider>
        <a href="javascript:;" v-if="record.sell_status === '可售卖'">
          <modal-link tag="a" :to="{ name: 'card-batch-shelves' }">上架</modal-link>
        </a>
        <a href="javascript:;" v-if="record.sell_status === '停售'">
          <modal-link tag="a" :to=" { name: 'card-recovery-sell' }">恢复售卖</modal-link>
        </a>
        <template v-if="record.sell_status === '可售卖'">
          <a-divider type="vertical"></a-divider>
          <st-more-dropdown>
            <a-menu-item>编辑</a-menu-item>
            <a-menu-item>
              <modal-link tag="a" :to=" { name: 'card-halt-the-sales' }">停售</modal-link>
            </a-menu-item>
            <a-menu-item>
              <modal-link tag="a" :to=" { name: 'card-confirm-del' }">删除</modal-link>
            </a-menu-item>
          </st-more-dropdown>
        </template>
      </div>
      <!-- 操作end -->
    </st-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pagination: {
        pageSizeOptions: ['10', '20', '30', '40', '50'],
        current: 1,
        pageSize: 10,
        total: 50
      },
      opreations: [
        {
          clickName: this.onClickSettingSalary,
          tag: 'a',
          name: '会员卡恢复售卖',
          route: { name: 'card-recovery-sell' }
        },
        {
          clickName: this.onClickSettingSalary,
          tag: 'a',
          name: '批量上架会员卡',
          route: { name: 'card-batch-shelves' }
        }
      ],
      data: [
        {
          id: 1,
          card_name: 'John Brown',
          age: 32,
          card_type: '期限卡',
          time_gradient: '720天',
          use_num: 3,
          sell: '古美路店天',
          publish_channel: '门店',
          sell_status: '可售卖',
          action: 'New York No. 1 Lake Park',
          columns1: [
            {
              title: '省',
              dataIndex: 'province_name',
              scopedSlots: { customRender: 'province_name' }
            },
            {
              title: '市',
              dataIndex: 'city_name'
            },
            {
              title: '区',
              dataIndex: 'district'
            },
            {
              title: '门店名称',
              dataIndex: 'shop_name'
            }
          ],
          use_shop_list: [
            {
              shop_id: 1,
              shop_name: 22222,
              province_name: '省份名称',
              city_name: '城市名称',
              district: '地区名称'
            },
            {
              shop_id: 2,
              shop_name: 22222,
              province_name: '省份名称',
              city_name: '城市名称',
              district: '地区名称'
            }
          ]
        },
        {
          id: 2,
          card_name: 'John Brown',
          age: 32,
          card_type: '余额卡',
          time_gradient: '720天',
          use_num: 0,
          sell: '古美路店天',
          publish_channel: '门店',
          sell_status: '停售',
          action: 'New York No. 1 Lake Park'
        }
      ],
      columns: [
        {
          title: '会员卡名称',
          dataIndex: 'card_name',
          scopedSlots: { customRender: 'card_name' }
          // sorter: (a, b) => a.name.length - b.name.length
        },
        {
          title: '类型',
          dataIndex: 'card_type',
          sorter: (a, b) => {
            let A = a.card_type
            let B = b.card_type
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
          dataIndex: 'use_num',
          scopedSlots: { customRender: 'use_num' }
        },
        {
          title: '支持售卖门店',
          dataIndex: 'sell'
        },
        {
          title: '发布渠道',
          dataIndex: 'publish_channel'
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
  methods: {
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
    onChange(pagination, filters, sorter) {
      console.log('params', pagination, filters, sorter)
    },
    handleChange(value) {
      console.log(`selected ${value}`)
    }
  }
}
</script>
