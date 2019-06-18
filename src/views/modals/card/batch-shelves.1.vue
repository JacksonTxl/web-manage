<template>
  <a-modal
    class="modal-card-batch-shelves"
    title="批量上架会员卡"
    v-model="show"
    :footer="null"
    width="668px"
    v-if="getBatchShelvesData.card_name"
  >
    <section class="modal-card-batch-shelves-title">
      <div class="modal-card-batch-shelves-img">
        <!-- <img style="width: 100%;" :src="getBatchShelvesData.card_bg.image_url" alt> -->
      </div>
      <div class="modal-card-batch-shelves-info">
        <div class="modal-card-batch-shelves-info-term-card">
          <span class="term-card">{{getBatchShelvesData.card_type.name}}</span>
          {{getBatchShelvesData.card_name}}
        </div>
        <div class="modal-card-batch-shelves-info-batch">
          本次共上架{{getBatchShelvesData.shelf_shop_num}}家门店，
          <a href="javascript:;">查看明显</a>
        </div>
        <div class="modal-card-batch-shelves-info-channel">
          <span class="channel">{{getBatchShelvesData.sell_type?getBatchShelvesData.sell_type.name :''}}</span>
        </div>
      </div>
    </section>
    <section class="modal-card-batch-shelves-table">
      <groundCardsTablePrice v-model="getBatchShelvesData.price_gradient"></groundCardsTablePrice>
      <!-- <pre>{{groundCardsTablePriceData}}</pre> -->
    </section>
    <section class="selling-mode">
      <a-checkbox-group @change="sellingModeFunc" class="selling-mode-checkbox-group">
        <span style="margin-right:24px">开卡方式</span>
        <span>
          <a-checkbox value="A">指定日期开卡</a-checkbox>
        </span>
        <span>
          <a-checkbox value="B">购买即开卡</a-checkbox>
        </span>
        <span class="shop-card-box">
          <a-checkbox value="C">
            到店开卡
            <a-tooltip placement="right">
              <template slot="title">
                <span>prompt text</span>
              </template>
              <a-icon type="info-circle"/>
            </a-tooltip>
          </a-checkbox>
          <div class="autoplay-card-day" v-if="sellingMode">
            <a-input class="autoplay-card-day-input"/>
            <span class="autoplay-card-day-text">天</span> 内未开卡，则自动开卡
          </div>
        </span>
      </a-checkbox-group>
    </section>
    <section class="selling-mode">
      <a-radio-group @change="onChange" v-model="value" class="legal-righ-radio">
        <div class="legal-righ-title">约课权益</div>
        <div>
          <div>
            <a-radio :style="radioStyle" :value="1">无约课权益</a-radio>
          </div>
          <div>
            <a-radio :style="radioStyle" :value="2">范围内课程</a-radio>
            <a-checkbox-group @change="onChange" v-if="checkedValues===2">
              <a-checkbox value="A">指定日期开卡</a-checkbox>
              <a-checkbox value="B">指定日期开卡</a-checkbox>
              <a-checkbox value="C">指定日期开卡</a-checkbox>
            </a-checkbox-group>
          </div>
          <div>
            <a-radio :style="radioStyle" :value="3">指定课程</a-radio>
          </div>
        </div>
      </a-radio-group>
      <div class="designated-courses" v-if="checkedValues===3">
        <span class="triangle"></span>
        <!-- 指定课程 -->
        <a-table
          :dataSource="data"
          :rowSelection="rowSelection"
          :columns="columns"
          rowKey="id"
          :pagination="false"
        ></a-table>
        <a-button class="editable-add-btn" @click="handleAdd" type="dashed">
          <a-icon type="plus"/>添加
        </a-button>
      </div>
    </section>
    <section>
      <footer class="footer">
        <a-button class="cancel">取消</a-button>
        <a-button @click="submit">确认上架</a-button>
      </footer>
    </section>
  </a-modal>
</template>
<script>
import groundCardsTablePrice from './batch-seelves#/ground-cards-table-price.vue'
import { BatchShelvesService } from './batch-shelves.service'
export default {
  serviceInject() {
    return {
      aService: BatchShelvesService
    }
  },
  name: 'batchShelves',
  props: {
    a: {
      type: Object
    }
  },
  components: {
    groundCardsTablePrice
  },
  data() {
    return {
      sellingMode: false,
      checkedValues: -1,
      value: 1,
      radioStyle: {
        height: '30px',
        lineHeight: '30px',
        position: 'relative',
        zIndex: 99
      },
      show: false,
      columns: [
        {
          title: '有效期',
          dataIndex: 'member'
        },
        {
          title: '售卖价格',
          dataIndex: 'type',
          scopedSlots: { customRender: 'type' }
        },
        {
          title: '允许冻结',
          dataIndex: 'effective'
        },
        {
          title: '赠送上限',
          dataIndex: 'admission'
        }
      ],
      data: [
        {
          id: 1,
          member: '徐汇1店',
          type: '',
          effective: '徐汇1店',
          admission: '徐汇1店'
        },
        {
          id: 2,
          member: '徐汇1店',
          type: '',
          effective: '22',
          admission: '22'
        }
      ],
      groundCardsTablePriceData: [],
      getBatchShelvesData: {}
    }
  },
  created() {
    let self = this
    this.getListInfo(self.a.id)
  },
  computed: {
    rowSelection() {
      const { selectedRowKeys } = this
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(
            `selectedRowKeys: ${selectedRowKeys}`,
            'selectedRows: ',
            selectedRows
          )
        },
        getCheckboxProps: record => ({
          props: {
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name
          }
        })
      }
    }
  },
  methods: {
    // 上架
    submit(e) {

    },

    getListInfo(data) {
      let self = this
      this.aService.getListInfo(data).subscribe(state => {
        self.getBatchShelvesData = state.info
        console.log(self.getBatchShelvesData)
      })
    },
    handleAdd() {},
    moment,
    memberFun() {},
    onChange(checkedValues) {
      this.checkedValues = checkedValues.target.value
      console.log('checked = ', checkedValues)
    },
    sellingModeFunc(checkedValues) {
      console.log(checkedValues.indexOf('C'))
      if (checkedValues.indexOf('C') >= 0) {
        this.sellingMode = true
      } else {
        this.sellingMode = false
      }
      // this.checkedValues = checkedValues.target.value
      console.log('checked = ', checkedValues)
    }
  }
}
</script>
