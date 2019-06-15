<template>
  <div class="pages-brand-product-card-list">
    <div class="pages-brand-product-card-list__operation">
      <router-link to="../add-select" v-if="auth.add">
        <st-button type="primary" icon="add">新增会员卡</st-button>
      </router-link>
      <div>
        <a-select
          class="mg-r8" style="width: 160px"
          v-model="card_type"
          @change="handleChange_card_type"
        >
          <a-select-option value>所有类型</a-select-option>
          <a-select-option value="1">次卡</a-select-option>
          <a-select-option value="2">期限卡</a-select-option>
        </a-select>
        <a-select
          class="mg-r8" style="width: 160px"
          v-model="publish_channel"
          @change="handleChange_publish_channel"
        >
          <a-select-option value>所有渠道</a-select-option>
          <a-select-option value="1">品牌</a-select-option>
          <a-select-option value="2">门店</a-select-option>
        </a-select>
        <a-select
          class="mg-r8" style="width: 160px"
          @change="handleChange_sell_status"
          v-model="sell_status"
        >
          <a-select-option value>所有售卖状态</a-select-option>
          <a-select-option value="1">可售卖</a-select-option>
          <a-select-option value="2">不可售卖</a-select-option>
        </a-select>
      </div>
    </div>
    <st-table
      rowKey="id"
      :columns="columns"
      :dataSource="data"
      :scroll="{ x: 1440}"
      @change="onChange"
      :pagination="pagination"
      @showSizeChange="onShowSizeChange"
    >
      <!-- 会员卡名称 -->
      <div slot="card_name" slot-scope="text,record">
        <a
          v-if="record.auth['brand_shop:product:member_card|get']"
          href="javascript:;"
          @click="infoFunc(record)"
        >{{text}}</a>
        <span v-else>{{text}}</span>
      </div>
      <span slot="sell_time" slot-scope="text,record">{{record.start_time}}~{{record.end_time}}</span>
      <span
        slot="price_gradient"
        slot-scope="text"
      >{{text.length > 1? `${text[0]}-${text[1]}`:`${text[0]}`}}</span>

      <!-- 支持入场门店 -->
      <div slot="admission_range.name" slot-scope="text,record">
        <modal-link
          v-if="record.admission_range.id === 2"
          tag="a"
          :to="{ name: 'card-table-stop' , props:{id: record.id}}"
        >{{text}}</modal-link>
        <span v-else class="use_num">{{text}}</span>
      </div>

      <!-- 支持售卖门店 -->
      <div slot="support_sales.name" slot-scope="text,record">
        <modal-link
          v-if="record.support_sales.id === 2"
          tag="a"
          :to="{ name: 'card-sale-stop' , props:{a: record.id}}"
        >{{text}}</modal-link>
        <span v-else>{{text}}</span>
      </div>
      <!-- 售卖状态 -->
      <div
        slot="sell_status"
        slot-scope="text,record"
        href="javascript:;"
        @click="sellStatus(text,record)"
      >
        <a-badge :status="text.id === 1?'success':'error'" />{{text.name}}
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
          <a-icon type="exclamation-circle" v-if="text.id === 2"/>
        </a-popover>
      </div>
      <!-- 操作 -->
      <div slot="action" slot-scope="text, record">
        <template v-if="record.auth['brand_shop:product:member_card|get']">
          <a href="javascript:;"  @click="infoFunc(record)">详情</a>
          <a-divider type="vertical"></a-divider>
        </template>
        <template v-if="record.auth['brand_shop:product:member_card|up']">
          <a href="javascript:;" >
          <modal-link
            tag="a"
            :to="{ name: 'card-batch-shelves' ,props:{id:record.id}, on:{success: onOnline }  }"
          >上架</modal-link>
          </a>
          <a-divider type="vertical"></a-divider>
        </template>
        <template>
          <st-more-dropdown>
            <a-menu-item v-if="record.auth['brand_shop:product:member_card|edit']" @click="onEdit(record)">编辑</a-menu-item>
            <a-menu-item v-if="record.auth['brand_shop:product:member_card|restore']">
              <modal-link
                tag="a"
                :to=" { name: 'card-recovery-sell', props:{a:record,time:memberCardsList.time}, on:{done: onModalTest } }"
              >恢复售卖</modal-link>
            </a-menu-item>
            <a-menu-item v-if="record.auth['brand_shop:product:member_card|pause']">
              <modal-link
                tag="a"
                :to=" { name: 'card-halt-the-sales', props:{a:record.id}, on:{done: onModalTest }}"
              >停售</modal-link>
            </a-menu-item>
            <a-menu-item v-if="record.auth['brand_shop:product:member_card|del']">
              <modal-link
                tag="a"
                :to=" { name: 'card-confirm-del', props:{title: {title:record.card_name,id:record.id}}, on:{del: onModalTest }}"
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
import { columns } from './member-list.config'
export default {
  serviceInject() {
    return {
      aService: MemberListService
    }
  },
  rxState() {
    return {
      memberCardsList: this.aService.memberCardsList$,
      auth: this.aService.auth$
    }
  },

  data() {
    return {
      columns,
      popoverTitle: '',
      popoverContent: '',
      card_type: '所以类型',
      publish_channel: '所有渠道',
      sell_status: '所有售卖状态',
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
      data: []
    }
  },
  mounted() {
    this.getInfoData(this.memberCardsList)
  },
  created() {
    let self = this
    let query = self.$route.query
    self.card_type = query.card_type ? query.card_type : '所以类型'
    self.publish_channel = query.publish_channel
      ? query.publish_channel
      : '所有渠道'
    self.sell_status = query.sell_status ? query.sell_status : '所有售卖状态'
    self.pagination.current = parseInt(query.current_page)
    self.pagination.pageSize = parseInt(query.size)
  },
  methods: {
    // 上架
    onOnline(data) {

    },

    onModalTest(data) {
      this.getListInfoFunc()
    },
    // 停售原因
    popoverStopReason(text, record) {
      let self = this
      self.popoverTitle = ''
      self.popoverContent = ''
      this.aService
        .getCardsSaleStopReason({ card_id: record.id })
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
      this.getHeaders.current_page = this.pagination.current
      this.getHeaders.size = this.pagination.pageSize

      this.data = data.list
      this.data = JSON.parse(JSON.stringify(this.data))
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
      console.log(current, pageSize)
    },
    // 点击详情获取数据
    infoFunc(record) {
      const { id } = record
      const cardType = record.card_type.id
      const name = cardType.id === 1 ? 'brand-product-card-member-number-info'
        : 'brand-product-card-member-period-info'
      this.routerHandler(name, id)
    },
    onEdit(record) {
      const { id } = record
      const cardType = record.card_type.id
      const name = cardType.id === 1 ? 'brand-product-card-member-number-edit'
        : 'brand-product-card-member-period-edit'
      this.routerHandler(name, id)
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
      Object.keys(self.getHeaders).map(item => {
        if (self.getHeaders[item] !== '') {
          obj[item] = self.getHeaders[item]
        }
      })
      self.$router.push({ query: obj, force: true })
    }
  },
  watch: {
    $route() {
      if (this.$route.query.card_name) {
        this.card_type = '所以类型'
        this.sell_status = '所以渠道'
        this.publish_channel = '所有售卖状态'
      }

      this.getInfoData(this.memberCardsList)
    }
  }
}
</script>
